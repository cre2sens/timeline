const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const files = {
    events: path.join(dataDir, 'events.json'),
    people: path.join(dataDir, 'people.json'),
    media: path.join(dataDir, 'media.json')
};

const mergeMap = {
    events: {
        'event_진시황의_중국_통일': 'event_qin_unification',
        'event_prc_established': 'event_prc_founding',
        'event_무굴_제국_성립': 'event_mughal_empire',
        'event_smallpox_vaccine': 'event_vaccine',
        'event_서로마_제국_멸망': 'event_fall_of_rome',
        'event_콜럼버스의_아메리카_대륙_도달': 'event_columbus',
        'event_reform_opening': 'event_economic_reform',
        'event_프랑스_대혁명_발발': 'event_french_revolution',
        'event_three_kingdoms_kr': 'event_three_kingdoms',
        'event_opium_war': 'event_opium_wars'
    },
    people: {
        'person_레오나르도_다빈치': 'person_da_vinci'
    },
    media: {}
};

function performMerge(type) {
    console.log(`\nMerging ${type}...`);
    const filePath = files[type];
    let items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const map = mergeMap[type];
    
    const toRemove = new Set(Object.keys(map));
    const itemsMap = new Map(items.map(item => [item.id, item]));

    for (const [oldId, newId] of Object.entries(map)) {
        const oldItem = itemsMap.get(oldId);
        const newItem = itemsMap.get(newId);

        if (oldItem && newItem) {
            console.log(`Merging ${oldId} into ${newId}`);
            // Merge related items
            if (oldItem.relatedPeople) newItem.relatedPeople = [...new Set([...(newItem.relatedPeople || []), ...oldItem.relatedPeople])];
            if (oldItem.relatedMedia) newItem.relatedMedia = [...new Set([...(newItem.relatedMedia || []), ...oldItem.relatedMedia])];
            if (oldItem.relatedEvents) newItem.relatedEvents = [...new Set([...(newItem.relatedEvents || []), ...oldItem.relatedEvents])];
            
            // Prefer original description if target is empty
            if (!newItem.description.ko && oldItem.description.ko) newItem.description.ko = oldItem.description.ko;
            if (!newItem.title.en && oldItem.title.en) newItem.title.en = oldItem.title.en;
        }
    }

    const cleanedItems = items.filter(item => !toRemove.has(item.id));
    console.log(`${type}: Original ${items.length}, Final ${cleanedItems.length}`);
    return cleanedItems;
}

const cleanedEvents = performMerge('events');
const cleanedPeople = performMerge('people');
const cleanedMedia = performMerge('media');

// Update all references in the entire dataset
const allIdMap = { ...mergeMap.events, ...mergeMap.people, ...mergeMap.media };

function updateAllRefs(items) {
    items.forEach(item => {
        if (item.relatedPeople) item.relatedPeople = [...new Set(item.relatedPeople.map(id => allIdMap[id] || id))];
        if (item.relatedMedia) item.relatedMedia = [...new Set(item.relatedMedia.map(id => allIdMap[id] || id))];
        if (item.relatedEvents) item.relatedEvents = [...new Set(item.relatedEvents.map(id => allIdMap[id] || id))];
    });
}

updateAllRefs(cleanedEvents);
updateAllRefs(cleanedPeople);
updateAllRefs(cleanedMedia);

fs.writeFileSync(files.events, JSON.stringify(cleanedEvents, null, 2));
fs.writeFileSync(files.people, JSON.stringify(cleanedPeople, null, 2));
fs.writeFileSync(files.media, JSON.stringify(cleanedMedia, null, 2));

console.log('\nMerge and reference update completed.');
