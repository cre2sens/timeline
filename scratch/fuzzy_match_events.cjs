const fs = require('fs');

function getLevenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
            else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
    }
    return matrix[b.length][a.length];
}

function getSimilarity(a, b) {
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    if (longer.length === 0) return 1.0;
    return (longer.length - getLevenshteinDistance(longer, shorter)) / parseFloat(longer.length);
}

const events = JSON.parse(fs.readFileSync('src/data/events.json', 'utf8'));
const duplicates = [];

for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
        const e1 = events[i];
        const e2 = events[j];
        
        const sim = getSimilarity(e1.title.ko, e2.title.ko);
        if (sim > 0.6) {
            // Check if they are in the same era or have similar years
            const y1 = parseInt(e1.date.start.replace(/^-/, '').split('-')[0]) * (e1.date.start.startsWith('-') ? -1 : 1);
            const y2 = parseInt(e2.date.start.replace(/^-/, '').split('-')[0]) * (e2.date.start.startsWith('-') ? -1 : 1);
            
            if (Math.abs(y1 - y2) < 50) {
                duplicates.push({ e1, e2, sim });
            }
        }
    }
}

duplicates.sort((a, b) => b.sim - a.sim);

console.log(`Found ${duplicates.length} potential duplicates:`);
duplicates.forEach(d => {
    console.log(`[SIM: ${(d.sim * 100).toFixed(1)}%] "${d.e1.title.ko}" vs "${d.e2.title.ko}" (${d.e1.date.start} vs ${d.e2.date.start})`);
});
