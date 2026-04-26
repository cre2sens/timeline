const fs = require('fs');
const path = require('path');

const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');
let events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newEvents = [
  {
    "id": "event_shang_dynasty",
    "type": "event",
    "date": { "start": "-1600-01-01", "end": "-1046-01-01" },
    "era": "ancient",
    "location": {
      "name": { "ko": "황허 유역", "en": "Yellow River Basin" },
      "coordinates": { "lat": 36.1, "lng": 114.3 },
      "region": "eastAsia"
    },
    "title": { "ko": "상나라(은나라)와 갑골문자", "en": "Shang Dynasty and Oracle Bones" },
    "description": {
      "ko": "중국 최고(最古)의 왕조로, 한자의 기원이 되는 갑골문자가 사용됨.",
      "en": "The earliest Chinese dynasty with written records, known for oracle bone script."
    },
    "category": "politics",
    "importance": 4,
    "relatedPeople": [],
    "wikipedia": { "ko": "상나라", "en": "Shang_dynasty" },
    "icon": "📜",
    "image": ""
  },
  {
    "id": "event_hundred_schools",
    "type": "event",
    "date": { "start": "-0770-01-01", "end": "-0221-01-01" },
    "era": "ancient",
    "location": {
      "name": { "ko": "중국 중원", "en": "Central Plains of China" },
      "coordinates": { "lat": 34.7, "lng": 113.6 },
      "region": "eastAsia"
    },
    "title": { "ko": "춘추전국시대와 제자백가", "en": "Spring and Autumn Period & Hundred Schools of Thought" },
    "description": {
      "ko": "정치적 혼란 속에서 공자, 노자 등 다양한 사상가들이 등장하여 중국 철학의 기초를 다짐.",
      "en": "A period of great cultural and intellectual expansion, laying the foundation for Chinese philosophy."
    },
    "category": "culture",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "제자백가", "en": "Hundred_Schools_of_Thought" },
    "icon": "📖",
    "image": ""
  },
  {
    "id": "event_qin_unification",
    "type": "event",
    "date": { "start": "-0221-01-01", "end": "-0206-01-01" },
    "era": "ancient",
    "location": {
      "name": { "ko": "함양 (현재 시안 부근)", "en": "Xianyang" },
      "coordinates": { "lat": 34.3, "lng": 108.7 },
      "region": "eastAsia"
    },
    "title": { "ko": "진시황의 중국 통일", "en": "Qin Unification of China" },
    "description": {
      "ko": "진시황이 중국 역사상 최초로 천하를 통일하고 중앙집권제를 확립함. 만리장성 축조 시작.",
      "en": "Qin Shi Huang unites China, establishing the first imperial dynasty and standardizing writing and measurements."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "진시황", "en": "Qin_Shi_Huang" },
    "icon": "👑",
    "image": ""
  },
  {
    "id": "event_han_dynasty",
    "type": "event",
    "date": { "start": "-0202-01-01", "end": "0220-01-01" },
    "era": "ancient",
    "location": {
      "name": { "ko": "장안 (현재 시안)", "en": "Chang'an" },
      "coordinates": { "lat": 34.2, "lng": 108.9 },
      "region": "eastAsia"
    },
    "title": { "ko": "한나라 건국과 실크로드", "en": "Han Dynasty and the Silk Road" },
    "description": {
      "ko": "중국 문화의 기틀을 마련한 한나라 건국. 실크로드가 개척되어 동서양 교역이 시작됨.",
      "en": "A golden age in Chinese history which established the Silk Road and invented paper."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "한나라", "en": "Han_dynasty" },
    "icon": "🐫",
    "image": ""
  },
  {
    "id": "event_three_kingdoms",
    "type": "event",
    "date": { "start": "0220-01-01", "end": "0280-01-01" },
    "era": "ancient",
    "location": {
      "name": { "ko": "중국 전역", "en": "China" },
      "coordinates": { "lat": 35.0, "lng": 110.0 },
      "region": "eastAsia"
    },
    "title": { "ko": "삼국시대", "en": "Three Kingdoms Period" },
    "description": {
      "ko": "위, 촉, 오 세 나라가 정립하여 패권을 다투던 시기. 삼국지 연의의 배경.",
      "en": "A period of division into the states of Wei, Shu, and Wu; highly romanticized in literature."
    },
    "category": "war",
    "importance": 4,
    "relatedPeople": [],
    "wikipedia": { "ko": "삼국시대_(중국)", "en": "Three_Kingdoms" },
    "icon": "⚔️",
    "image": ""
  },
  {
    "id": "event_tang_dynasty",
    "type": "event",
    "date": { "start": "0618-06-18", "end": "0907-06-01" },
    "era": "medieval",
    "location": {
      "name": { "ko": "장안", "en": "Chang'an" },
      "coordinates": { "lat": 34.2, "lng": 108.9 },
      "region": "eastAsia"
    },
    "title": { "ko": "당나라 건국", "en": "Establishment of the Tang Dynasty" },
    "description": {
      "ko": "국제적이고 개방적인 문화가 융성했던 중국 역사상 최고의 황금기 중 하나.",
      "en": "A cosmopolitan golden age of Chinese culture, renowned for its poetry, art, and territorial expansion."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "당나라", "en": "Tang_dynasty" },
    "icon": "🏮",
    "image": ""
  },
  {
    "id": "event_song_inventions",
    "type": "event",
    "date": { "start": "0960-01-01", "end": "1279-01-01" },
    "era": "medieval",
    "location": {
      "name": { "ko": "카이펑 및 항저우", "en": "Kaifeng and Hangzhou" },
      "coordinates": { "lat": 34.8, "lng": 114.3 },
      "region": "eastAsia"
    },
    "title": { "ko": "송나라와 3대 발명품", "en": "Song Dynasty & Great Inventions" },
    "description": {
      "ko": "나침반, 화약, 활판 인쇄술이 발명 및 실용화되어 인류 문명 발전에 지대한 공헌을 함.",
      "en": "An era of significant economic growth and technological innovation, including gunpowder and the compass."
    },
    "category": "science",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "송나라", "en": "Song_dynasty" },
    "icon": "🧭",
    "image": ""
  },
  {
    "id": "event_yuan_dynasty",
    "type": "event",
    "date": { "start": "1271-12-18", "end": "1368-01-01" },
    "era": "medieval",
    "location": {
      "name": { "ko": "대도 (현재 베이징)", "en": "Dadu (Beijing)" },
      "coordinates": { "lat": 39.9, "lng": 116.4 },
      "region": "eastAsia"
    },
    "title": { "ko": "원나라 건국", "en": "Yuan Dynasty Established" },
    "description": {
      "ko": "몽골 제국의 쿠빌라이 칸이 건국한 왕조. 실크로드를 통한 동서양 교류가 극대화됨.",
      "en": "Mongol-led dynasty established by Kublai Khan; a period of unprecedented East-West cultural exchange."
    },
    "category": "politics",
    "importance": 4,
    "relatedPeople": [],
    "wikipedia": { "ko": "원나라", "en": "Yuan_dynasty" },
    "icon": "🐎",
    "image": ""
  },
  {
    "id": "event_ming_zheng_he",
    "type": "event",
    "date": { "start": "1368-01-23", "end": "1644-04-25" },
    "era": "earlyModern",
    "location": {
      "name": { "ko": "베이징 (자금성)", "en": "Beijing (Forbidden City)" },
      "coordinates": { "lat": 39.9, "lng": 116.4 },
      "region": "eastAsia"
    },
    "title": { "ko": "명나라 건국과 정화의 원정", "en": "Ming Dynasty & Zheng He's Voyages" },
    "description": {
      "ko": "한족 왕조의 부흥. 자금성을 건설하고 환관 정화가 대규모 함대를 이끌고 아프리카까지 항해함.",
      "en": "Restoration of Han rule, construction of the Forbidden City, and massive maritime expeditions led by Zheng He."
    },
    "category": "politics",
    "importance": 4,
    "relatedPeople": [],
    "wikipedia": { "ko": "명나라", "en": "Ming_dynasty" },
    "icon": "⛵",
    "image": ""
  },
  {
    "id": "event_qing_dynasty",
    "type": "event",
    "date": { "start": "1644-01-01", "end": "1912-02-12" },
    "era": "earlyModern",
    "location": {
      "name": { "ko": "베이징", "en": "Beijing" },
      "coordinates": { "lat": 39.9, "lng": 116.4 },
      "region": "eastAsia"
    },
    "title": { "ko": "청나라 건국", "en": "Qing Dynasty Established" },
    "description": {
      "ko": "만주족이 세운 중국의 마지막 제국 왕조. 역사상 가장 넓은 영토를 확보함.",
      "en": "The last imperial dynasty of China, established by the Manchus, which greatly expanded China's territory."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "청나라", "en": "Qing_dynasty" },
    "icon": "🐉",
    "image": ""
  },
  {
    "id": "event_opium_wars",
    "type": "event",
    "date": { "start": "1839-09-04", "end": "1842-08-29" },
    "era": "modern",
    "location": {
      "name": { "ko": "광저우 및 중국 해안", "en": "Guangzhou & China Coast" },
      "coordinates": { "lat": 23.1, "lng": 113.2 },
      "region": "eastAsia"
    },
    "title": { "ko": "제1차 아편전쟁", "en": "First Opium War" },
    "description": {
      "ko": "영국과의 전쟁에서 패배하여 홍콩을 할양하고 불평등 조약을 맺으며 서구 열강의 침탈이 시작됨.",
      "en": "A series of military engagements fought between Britain and the Qing dynasty over the opium trade."
    },
    "category": "war",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "제1차_아편_전쟁", "en": "First_Opium_War" },
    "icon": "💥",
    "image": ""
  },
  {
    "id": "event_xinhai_revolution",
    "type": "event",
    "date": { "start": "1911-10-10", "end": "1912-02-12" },
    "era": "modern",
    "location": {
      "name": { "ko": "우창 (현재 우한)", "en": "Wuchang (Wuhan)" },
      "coordinates": { "lat": 30.5, "lng": 114.3 },
      "region": "eastAsia"
    },
    "title": { "ko": "신해혁명", "en": "Xinhai Revolution" },
    "description": {
      "ko": "쑨원 등의 혁명파가 봉기하여 청나라를 무너뜨리고 아시아 최초의 공화국인 중화민국을 수립함.",
      "en": "The revolution that overthrow China's last imperial dynasty and established the Republic of China."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "신해혁명", "en": "Xinhai_Revolution" },
    "icon": "🚩",
    "image": ""
  },
  {
    "id": "event_prc_established",
    "type": "event",
    "date": { "start": "1949-10-01", "end": "1949-10-01" },
    "era": "contemporary",
    "location": {
      "name": { "ko": "베이징 티안안먼 광장", "en": "Tiananmen Square, Beijing" },
      "coordinates": { "lat": 39.9, "lng": 116.4 },
      "region": "eastAsia"
    },
    "title": { "ko": "중화인민공화국 수립", "en": "Establishment of the PRC" },
    "description": {
      "ko": "국공내전에서 승리한 마오쩌둥이 베이징에서 사회주의 국가인 중화인민공화국의 수립을 선포함.",
      "en": "Mao Zedong proclaims the founding of the People's Republic of China after winning the Chinese Civil War."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "중화인민공화국의_역사", "en": "History_of_the_People's_Republic_of_China" },
    "icon": "⭐",
    "image": ""
  },
  {
    "id": "event_economic_reform",
    "type": "event",
    "date": { "start": "1978-12-18", "end": "1978-12-18" },
    "era": "contemporary",
    "location": {
      "name": { "ko": "베이징", "en": "Beijing" },
      "coordinates": { "lat": 39.9, "lng": 116.4 },
      "region": "eastAsia"
    },
    "title": { "ko": "덩샤오핑의 개혁개방", "en": "Chinese Economic Reform" },
    "description": {
      "ko": "덩샤오핑 주도 하에 자본주의 시장경제를 도입하여 현재의 경제 대국으로 성장하는 발판을 마련함.",
      "en": "The program of economic reforms termed 'Socialism with Chinese characteristics' initiated by Deng Xiaoping."
    },
    "category": "economy",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": { "ko": "개혁개방", "en": "Chinese_economic_reform" },
    "icon": "📈",
    "image": ""
  }
];

const existingIds = new Set(events.map(e => e.id));
const itemsToAdd = newEvents.filter(e => !existingIds.has(e.id));

if (itemsToAdd.length > 0) {
  events.push(...itemsToAdd);
  fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), 'utf8');
  console.log(`Added ${itemsToAdd.length} new China events.`);
} else {
  console.log('Events already exist.');
}
