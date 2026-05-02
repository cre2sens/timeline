const fs = require('fs');
const path = require('path');

const eventsFile = path.join(__dirname, '../src/data/events.json');
const mediaFile = path.join(__dirname, '../src/data/media.json');
const userEventsFile = path.join(__dirname, 'user_events.txt');

const existingEvents = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
const existingMedia = JSON.parse(fs.readFileSync(mediaFile, 'utf8'));
const userEventsText = fs.readFileSync(userEventsFile, 'utf8');

const existingEventTitles = new Set(existingEvents.map(e => e.title.ko));
const existingMediaTitles = new Set(existingMedia.map(m => m.title.ko));

function parseUserEvents(text) {
    const blocks = text.split(/\n\s*\n/).filter(b => b.trim());
    return blocks.map(block => {
        const lines = block.trim().split('\n').map(l => l.trim());
        if (lines.length < 5) return null;

        const num = lines[0];
        const title = lines[1];
        const people = lines[2];
        const yearStr = lines[3];
        const locStr = lines[4];
        const wiki = lines[5];
        const mediaStr = lines.slice(6).join(' ');

        // Parse year
        let startYear, endYear;
        if (yearStr.includes('~')) {
            const parts = yearStr.split('~').map(p => p.trim());
            startYear = parseYear(parts[0]);
            endYear = parseYear(parts[1]);
        } else {
            startYear = parseYear(yearStr);
            endYear = startYear;
        }

        // Parse location
        const locMatch = locStr.match(/(.*)\((.*),(.*)\)/);
        let locationName = locStr;
        let lat = 0, lng = 0;
        if (locMatch) {
            locationName = locMatch[1].trim();
            lat = parseFloat(locMatch[2]);
            lng = parseFloat(locMatch[3]);
        }

        return {
            num,
            title,
            people: people === '-' ? [] : people.split(',').map(p => p.trim()),
            yearStr,
            startYear,
            endYear,
            locationName,
            lat,
            lng,
            wiki,
            mediaStr
        };
    }).filter(Boolean);
}

function parseYear(str) {
    let year = 0;
    const bc = str.includes('기원전');
    const century = str.includes('세기');
    const match = str.match(/\d+/);
    if (match) {
        year = parseInt(match[0]);
        if (century) {
            year = (year - 1) * 100 + 50; // Use middle of century
        }
    }
    return bc ? -year : year;
}

function formatDate(year) {
    const absYear = Math.abs(year);
    const yearStr = String(absYear).padStart(4, '0');
    return (year < 0 ? '-' : '') + yearStr + '-01-01';
}

const userEvents = parseUserEvents(userEventsText);

const newEvents = [];
const updates = [];

userEvents.forEach(ue => {
    // Check if title already exists
    const existing = existingEvents.find(e => e.title.ko === ue.title || ue.title.includes(e.title.ko) || e.title.ko.includes(ue.title));
    
    if (existing) {
        updates.push({
            original: existing,
            supplement: ue
        });
    } else {
        newEvents.push(ue);
    }
});

console.log('--- DUPLICATES / UPDATES ---');
updates.forEach(u => console.log(`[EXISTING] ${u.original.title.ko} (User: ${u.supplement.title})`));

console.log('\n--- NEW EVENTS ---');
newEvents.forEach(ne => console.log(`[NEW] ${ne.title}`));

// Generate IDs and map to schema
const addedEvents = newEvents.map(ne => {
    const id = 'event_' + ne.title.replace(/\s+/g, '_').toLowerCase();
    
    // Simple heuristic for era
    let era = 'ancient';
    if (ne.startYear > 476) era = 'medieval';
    if (ne.startYear > 1453) era = 'earlyModern';
    if (ne.startYear > 1789) era = 'modern';
    if (ne.startYear > 1945) era = 'contemporary';

    // Simple heuristic for region
    let region = 'europe';
    if (ne.locationName.includes('중국') || ne.locationName.includes('난징') || ne.locationName.includes('베이징')) region = 'eastAsia';
    if (ne.locationName.includes('한국') || ne.locationName.includes('고조선')) region = 'korea';
    if (ne.locationName.includes('인도')) region = 'southAsia';
    if (ne.locationName.includes('이라크') || ne.locationName.includes('시리아') || ne.locationName.includes('사우디') || ne.locationName.includes('이란')) region = 'middleEast';
    if (ne.locationName.includes('미국')) region = 'americas';

    return {
        id,
        type: 'event',
        date: {
            start: formatDate(ne.startYear),
            end: formatDate(ne.endYear)
        },
        era,
        location: {
            name: { ko: ne.locationName, en: '' }, // To be filled or translated
            coordinates: { lat: ne.lat, lng: ne.lng },
            region
        },
        title: { ko: ne.title, en: '' },
        description: { ko: '', en: '' },
        category: 'politics', // default
        relatedPeople: [],
        relatedEvents: [],
        relatedMedia: [],
        wikipedia: { ko: ne.title, en: '' },
        icon: '📌',
        importance: 3
    };
});

fs.writeFileSync('scratch/added_events.json', JSON.stringify(addedEvents, null, 2));
fs.writeFileSync('scratch/updates.json', JSON.stringify(updates, null, 2));
