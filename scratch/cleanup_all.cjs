const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const files = {
    events: path.join(dataDir, 'events.json'),
    people: path.join(dataDir, 'people.json'),
    media: path.join(dataDir, 'media.json')
};

function normalize(str) {
    if (!str) return '';
    return str.replace(/\s+/g, '').replace(/[·\(\)\[\]]/g, '').trim();
}

function cleanup(type) {
    console.log(`\n--- Cleaning up ${type} ---`);
    const filePath = files[type];
    const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const seen = new Map();
    const toKeep = [];
    const idMap = new Map(); // oldId -> newId

    items.forEach(item => {
        const key = normalize(item.title.ko);
        if (seen.has(key)) {
            const existing = seen.get(key);
            console.log(`[DUPE] Found duplicate for "${item.title.ko}" (ID: ${item.id}, Duplicate of: ${existing.id})`);
            
            // Merge metadata if needed
            if (item.relatedPeople) existing.relatedPeople = [...new Set([...(existing.relatedPeople || []), ...item.relatedPeople])];
            if (item.relatedMedia) existing.relatedMedia = [...new Set([...(existing.relatedMedia || []), ...item.relatedMedia])];
            if (item.relatedEvents) existing.relatedEvents = [...new Set([...(existing.relatedEvents || []), ...item.relatedEvents])];
            
            // Prefer the one with more content
            if (!existing.title.en && item.title.en) existing.title.en = item.title.en;
            if (!existing.description.ko && item.description.ko) existing.description.ko = item.description.ko;
            if (!existing.description.en && item.description.en) existing.description.en = item.description.en;

            idMap.set(item.id, existing.id);
        } else {
            seen.set(key, item);
            toKeep.push(item);
            idMap.set(item.id, item.id);
        }
    });

    console.log(`Original: ${items.length}, Cleaned: ${toKeep.length}`);
    return { cleaned: toKeep, idMap };
}

const eventResult = cleanup('events');
const peopleResult = cleanup('people');
const mediaResult = cleanup('media');

// Update references
function updateRefs(items, type) {
    items.forEach(item => {
        if (item.relatedPeople) {
            item.relatedPeople = [...new Set(item.relatedPeople.map(id => peopleResult.idMap.get(id) || id))];
        }
        if (item.relatedMedia) {
            item.relatedMedia = [...new Set(item.relatedMedia.map(id => mediaResult.idMap.get(id) || id))];
        }
        if (item.relatedEvents) {
            item.relatedEvents = [...new Set(item.relatedEvents.map(id => eventResult.idMap.get(id) || id))];
        }
    });
}

updateRefs(eventResult.cleaned, 'events');
updateRefs(peopleResult.cleaned, 'people');
updateRefs(mediaResult.cleaned, 'media');

fs.writeFileSync(files.events, JSON.stringify(eventResult.cleaned, null, 2));
fs.writeFileSync(files.people, JSON.stringify(peopleResult.cleaned, null, 2));
fs.writeFileSync(files.media, JSON.stringify(mediaResult.cleaned, null, 2));

console.log('\nFinal cleanup completed and files updated.');
