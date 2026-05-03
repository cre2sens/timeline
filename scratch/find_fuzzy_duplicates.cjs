const fs = require('fs');
const path = require('path');

const mainEventsPath = path.join(__dirname, '../src/data/events.json');
const mainEvents = JSON.parse(fs.readFileSync(mainEventsPath, 'utf8'));

console.log(`Analyzing ${mainEvents.length} events for duplicates...`);

const duplicates = [];
const seenTitles = new Map();

mainEvents.forEach((event, index) => {
    const title = event.title.ko.replace(/\s+/g, '').replace(/[·\(\)]/g, '').trim();
    if (seenTitles.has(title)) {
        duplicates.push({
            event,
            duplicateOf: seenTitles.get(title),
            index
        });
    } else {
        seenTitles.set(title, event);
    }
});


console.log(`\n--- Found ${duplicates.length} title-based duplicates ---`);
duplicates.forEach(d => {
    console.log(`[DUPE] "${d.event.title.ko}" (Date: ${d.event.date.start})`);
    console.log(`      ID: ${d.event.id} vs ${d.duplicateOf.id}`);
});

if (duplicates.length > 0) {
    const dupeIndices = new Set(duplicates.map(d => d.index));
    const cleaned = mainEvents.filter((_, index) => !dupeIndices.has(index));
    fs.writeFileSync(mainEventsPath, JSON.stringify(cleaned, null, 2));
    console.log(`\nRemoved ${duplicates.length} duplicates. New count: ${cleaned.length}`);
} else {
    console.log('\nNo title-based duplicates found.');
}
