const fs = require('fs');
const path = require('path');

const eventsFile = path.join(__dirname, '../src/data/events.json');
const mediaFile = path.join(__dirname, '../src/data/media.json');
const peopleFile = path.join(__dirname, '../src/data/people.json');
const userEventsFile = path.join(__dirname, 'user_events.txt');

const events = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
const media = JSON.parse(fs.readFileSync(mediaFile, 'utf8'));
const people = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));
const userEventsText = fs.readFileSync(userEventsFile, 'utf8');

const eventTitlesKo = new Set(events.map(e => e.title.ko));
const mediaTitlesKo = new Set(media.map(m => m.title.ko));
const peopleTitlesKo = new Set(people.map(p => p.title.ko));

function parseUserEvents(text) {
    const blocks = text.split(/\n\s*\n/).filter(b => b.trim());
    return blocks.map(block => {
        const lines = block.trim().split('\n').map(l => l.trim());
        if (lines.length < 5) return null;

        const num = lines[0];
        const title = lines[1];
        const peopleStr = lines[2];
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
            people: peopleStr === '-' ? [] : peopleStr.split(',').map(p => p.trim()),
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
            year = (year - 1) * 100 + 50; 
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

const newPeople = [];
const newMedia = [];
const addedEventsCount = 0;
const updatedEventsCount = 0;

userEvents.forEach(ue => {
    // 1. Handle People
    const personIds = ue.people.map(pName => {
        const cleanName = pName.split('(')[0].trim();
        let existing = people.find(p => p.title.ko.includes(cleanName));
        if (!existing) {
            const id = 'person_' + cleanName.replace(/\s+/g, '_').toLowerCase();
            if (!newPeople.find(np => np.id === id)) {
                const newP = {
                    id,
                    type: 'person',
                    date: { start: formatDate(ue.startYear), end: formatDate(ue.endYear) },
                    era: getEra(ue.startYear),
                    title: { ko: pName, en: '' },
                    description: { ko: `${ue.title}의 주요 인물`, en: `Key figure of ${ue.title}` },
                    category: 'ruler',
                    relatedEvents: [],
                    relatedMedia: [],
                    wikipedia: { ko: cleanName, en: '' },
                    icon: '👑',
                    importance: 3
                };
                newPeople.push(newP);
                people.push(newP);
                return id;
            }
            return id;
        }
        return existing.id;
    });

    // 2. Handle Media
    const mediaIds = [];
    if (ue.mediaStr && ue.mediaStr !== '-') {
        const mediaTitles = ue.mediaStr.split(/,| 《|《|》 /).map(m => m.replace(/《|》/g, '').trim()).filter(m => m && m !== '영화' && m !== '도서' && m !== '드라마' && m !== '소설' && m !== '다큐멘터리');
        mediaTitles.forEach(mTitle => {
            let existing = media.find(m => m.title.ko.includes(mTitle));
            if (!existing) {
                const id = 'media_' + mTitle.replace(/\s+/g, '_').toLowerCase();
                if (!newMedia.find(nm => nm.id === id)) {
                    let type = 'movie';
                    if (ue.mediaStr.includes('도서') || ue.mediaStr.includes('소설') || ue.mediaStr.includes('서적')) type = 'novel';
                    const newM = {
                        id,
                        type,
                        title: { ko: mTitle, en: '' },
                        year: ue.startYear > 0 ? ue.startYear : 0,
                        creator: { ko: '', en: '' },
                        description: { ko: `${ue.title} 관련 미디어`, en: `Media related to ${ue.title}` },
                        relatedEvents: [],
                        relatedPeople: personIds,
                        wikipedia: { ko: mTitle, en: '' },
                        icon: type === 'movie' ? '🎬' : '📚'
                    };
                    newMedia.push(newM);
                    media.push(newM);
                    mediaIds.push(id);
                } else {
                    mediaIds.push(id);
                }
            } else {
                mediaIds.push(existing.id);
            }
        });
    }

    // 3. Handle Events
    let existingEvent = events.find(e => e.title.ko === ue.title || ue.title.includes(e.title.ko) || e.title.ko.includes(ue.title));
    if (existingEvent) {
        // Update existing
        existingEvent.relatedPeople = [...new Set([...(existingEvent.relatedPeople || []), ...personIds])];
        existingEvent.relatedMedia = [...new Set([...(existingEvent.relatedMedia || []), ...mediaIds])];
        if (ue.lat && ue.lng && (!existingEvent.location.coordinates.lat || existingEvent.location.coordinates.lat === 0)) {
            existingEvent.location.coordinates = { lat: ue.lat, lng: ue.lng };
        }
        // updatedEventsCount++;
    } else {
        // Add new
        const id = 'event_' + ue.title.replace(/\s+/g, '_').toLowerCase();
        const newE = {
            id,
            type: 'event',
            date: { start: formatDate(ue.startYear), end: formatDate(ue.endYear) },
            era: getEra(ue.startYear),
            location: {
                name: { ko: ue.locationName, en: '' },
                coordinates: { lat: ue.lat, lng: ue.lng },
                region: getRegion(ue.locationName)
            },
            title: { ko: ue.title, en: '' },
            description: { ko: '', en: '' },
            category: ue.title.includes('전쟁') || ue.title.includes('난') || ue.title.includes('항쟁') ? 'battle' : 'politics',
            relatedPeople: personIds,
            relatedEvents: [],
            relatedMedia: mediaIds,
            wikipedia: { ko: ue.title, en: '' },
            icon: ue.title.includes('전쟁') ? '⚔️' : '🏛️',
            importance: 3
        };
        events.push(newE);
        // addedEventsCount++;
    }
});

function getEra(year) {
    if (year <= 476) return 'ancient';
    if (year <= 1453) return 'medieval';
    if (year <= 1789) return 'earlyModern';
    if (year <= 1945) return 'modern';
    return 'contemporary';
}

function getRegion(loc) {
    if (loc.includes('중국') || loc.includes('난징') || loc.includes('베이징') || loc.includes('셴양') || loc.includes('카이펑') || loc.includes('창안')) return 'eastAsia';
    if (loc.includes('한국') || loc.includes('고조선') || loc.includes('한반도')) return 'korea';
    if (loc.includes('인도')) return 'southAsia';
    if (loc.includes('이라크') || loc.includes('시리아') || loc.includes('사우디') || loc.includes('이란') || loc.includes('바빌론') || loc.includes('메디나') || loc.includes('다마스쿠스') || loc.includes('바그다드')) return 'middleEast';
    if (loc.includes('미국')) return 'americas';
    if (loc.includes('이탈리아') || loc.includes('그리스') || loc.includes('독일') || loc.includes('영국') || loc.includes('프랑스') || loc.includes('스페인') || loc.includes('스위스') || loc.includes('유럽') || loc.includes('러시아')) return 'europe';
    if (loc.includes('튀니지') || loc.includes('아프리카')) return 'africa';
    return 'europe'; // default
}

fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
fs.writeFileSync(mediaFile, JSON.stringify(media, null, 2));
fs.writeFileSync(peopleFile, JSON.stringify(people, null, 2));

console.log(`Updated! Added ${newPeople.length} people, ${newMedia.length} media.`);
