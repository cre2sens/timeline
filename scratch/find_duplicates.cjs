const fs = require('fs');
const path = require('path');

const addedEventsPath = path.join(__dirname, 'added_events.json');
const mainEventsPath = path.join(__dirname, '../src/data/events.json');

const addedEvents = JSON.parse(fs.readFileSync(addedEventsPath, 'utf8'));
const mainEvents = JSON.parse(fs.readFileSync(mainEventsPath, 'utf8'));

console.log(`Checking duplicates for ${addedEvents.length} new items against ${mainEvents.length} existing items.`);

const allDuplicates = [];
const internalDuplicates = [];

// 1. Internal duplicates in mainEvents
const mainTitles = new Map();
const mainDuplicates = [];
mainEvents.forEach((event, index) => {
    // Check by title and start date
    const key = `${event.title.ko}_${event.date.start}`;
    if (mainTitles.has(key)) {
        mainDuplicates.push({
            event,
            duplicateOf: mainTitles.get(key),
            index
        });
    } else {
        mainTitles.set(key, event);
    }
});

console.log('\n--- Internal Duplicates in main events.json ---');
mainDuplicates.forEach(d => {
    console.log(`[DUPE] ${d.event.title.ko} (${d.event.date.start}) - ID: ${d.event.id} vs ${d.duplicateOf.id}`);
});

// 2. Cross Duplicates (if added_events.json items were meant to be added)
const crossDuplicates = [];
addedEvents.forEach((event, index) => {
    const key = `${event.title.ko}_${event.date.start}`;
    if (mainTitles.has(key)) {
        crossDuplicates.push({
            event,
            duplicateOf: mainTitles.get(key),
            index
        });
    }
});

console.log('\n--- Cross Duplicates (added_events vs main) ---');
crossDuplicates.forEach(d => {
    console.log(`[EXISTING] ${d.event.title.ko} (${d.event.date.start}) - Existing ID: ${d.duplicateOf.id}`);
});

// Remove duplicates from main database
const mainDupeIndices = new Set(mainDuplicates.map(d => d.index));
const cleanedMainEvents = mainEvents.filter((_, index) => !mainDupeIndices.has(index));

console.log(`\nMain Database - Original: ${mainEvents.length}, Cleaned: ${cleanedMainEvents.length}`);

if (cleanedMainEvents.length !== mainEvents.length) {
    fs.writeFileSync(mainEventsPath, JSON.stringify(cleanedMainEvents, null, 2));
    console.log('Updated src/data/events.json with cleaned data.');
}

