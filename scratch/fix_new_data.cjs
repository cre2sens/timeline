const fs = require('fs');
const path = require('path');

const eventsFile = path.join(__dirname, '../src/data/events.json');
const events = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));

events.forEach(e => {
    if (e.id.includes('쿠바')) e.location.region = 'americas';
    if (e.id.includes('베트남')) e.location.region = 'eastAsia'; // Approximate
    if (e.id.includes('반둥')) e.location.region = 'eastAsia';
    
    // Add some common English titles for the new ones
    if (e.title.ko === '함무라비 법전 편찬') {
        e.title.en = 'Code of Hammurabi';
        e.description.ko = '고대 바빌로니아의 함무라비 왕이 반포한 세계에서 가장 오래된 성문법 중 하나';
        e.description.en = 'One of the oldest deciphered writings of significant length in the world, enacted by the Babylonian King Hammurabi.';
    }
    if (e.title.ko === '불교 창시') {
        e.title.en = 'Founding of Buddhism';
        e.description.ko = '고타마 싯다르타에 의해 인도에서 창시된 종교';
        e.description.en = 'A religion founded by Gautama Buddha in ancient India.';
    }
    if (e.title.ko === '산업 혁명 본격화') {
        e.title.en = 'Full-scale Industrial Revolution';
        e.description.ko = '증기기관의 개량과 공장제 기계 공업의 발달로 인한 경제 및 사회적 대변혁';
        e.description.en = 'The transition to new manufacturing processes in Great Britain, continental Europe, and the United States.';
    }
});

fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
console.log('Fixed some regions and added key translations.');
