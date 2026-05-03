const fs = require('fs');
const path = require('path');

const mainEvents = JSON.parse(fs.readFileSync('src/data/events.json', 'utf8'));

console.log(`Checking for partial title overlaps among ${mainEvents.length} events...`);

const duplicates = [];
for (let i = 0; i < mainEvents.length; i++) {
    for (let j = i + 1; j < mainEvents.length; j++) {
        const e1 = mainEvents[i];
        const e2 = mainEvents[j];
        
        const t1 = e1.title.ko.replace(/\s+/g, '');
        const t2 = e2.title.ko.replace(/\s+/g, '');
        
        // If one title is contained in another and dates are similar
        if ((t1.includes(t2) || t2.includes(t1)) && Math.abs(new Date(e1.date.start).getFullYear() - new Date(e2.date.start).getFullYear()) < 10) {
            duplicates.push({ e1, e2 });
        }
    }
}

console.log(`\n--- Found ${duplicates.length} partial overlaps ---`);
duplicates.forEach(d => {
    console.log(`[OVERLAP] "${d.e1.title.ko}" vs "${d.e2.title.ko}"`);
    console.log(`          Date: ${d.e1.date.start} vs ${d.e2.date.start}`);
});
