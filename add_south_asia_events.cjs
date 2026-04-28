const fs = require('fs');
const path = require('path');

const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const southAsiaEvents = [
  {
    "id": "event_indus_valley",
    "type": "event",
    "date": {
      "start": "-3300-01-01",
      "end": "-1300-12-31"
    },
    "era": "ancient",
    "location": {
      "name": {
        "ko": "인더스 강 유역",
        "en": "Indus Valley"
      },
      "coordinates": {
        "lat": 27.32,
        "lng": 68.13
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "인더스 문명",
      "en": "Indus Valley Civilization"
    },
    "description": {
      "ko": "인더스 강 유역에서 발생한 고대 문명으로 모헨조다로와 하라파가 주요 도시임.",
      "en": "An ancient civilization in the Indus River basin, known for cities like Mohenjo-daro and Harappa."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "인더스_문명",
      "en": "Indus_Valley_Civilisation"
    },
    "icon": "🏺"
  },
  {
    "id": "event_maurya_empire",
    "type": "event",
    "date": {
      "start": "-0322-01-01",
      "end": "-0185-01-01"
    },
    "era": "ancient",
    "location": {
      "name": {
        "ko": "파탈리푸트라",
        "en": "Pataliputra"
      },
      "coordinates": {
        "lat": 25.61,
        "lng": 85.14
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "마우리야 왕조 건국",
      "en": "Founding of Maurya Empire"
    },
    "description": {
      "ko": "찬드라굽타 마우리야가 인도 최초의 통일 제국을 건설함.",
      "en": "Chandragupta Maurya founded the first unified empire in India."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "마우리야_제국",
      "en": "Maurya_Empire"
    },
    "icon": "🏛️"
  },
  {
    "id": "event_ashoka_buddhism",
    "type": "event",
    "date": {
      "start": "-0260-01-01",
      "end": "-0260-12-31"
    },
    "era": "ancient",
    "location": {
      "name": {
        "ko": "칼링가",
        "en": "Kalinga"
      },
      "coordinates": {
        "lat": 20.48,
        "lng": 85.83
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "아소카 왕의 불교 개종",
      "en": "Ashoka's Conversion to Buddhism"
    },
    "description": {
      "ko": "칼링가 전쟁 이후 아소카 왕이 불교에 귀의하고 평화 정치를 펼치며 불교를 전파함.",
      "en": "After the Kalinga War, Emperor Ashoka converted to Buddhism and promoted peace and the spread of the faith."
    },
    "category": "culture",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "아소카",
      "en": "Ashoka"
    },
    "icon": "☸️"
  },
  {
    "id": "event_gupta_empire",
    "type": "event",
    "date": {
      "start": "0320-01-01",
      "end": "0550-12-31"
    },
    "era": "ancient",
    "location": {
      "name": {
        "ko": "마가다",
        "en": "Magadha"
      },
      "coordinates": {
        "lat": 25.45,
        "lng": 81.85
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "굽타 왕조 성립",
      "en": "Establishment of Gupta Empire"
    },
    "description": {
      "ko": "인도 고전 문화의 황금기를 이끈 왕조로 수학, 천문학, 예술이 비약적으로 발전함.",
      "en": "An era known as the Golden Age of India, marked by extensive inventions and discoveries in science and art."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "굽타_제국",
      "en": "Gupta_Empire"
    },
    "icon": "💎"
  },
  {
    "id": "event_delhi_sultanate",
    "type": "event",
    "date": {
      "start": "1206-01-01",
      "end": "1526-04-21"
    },
    "era": "medieval",
    "location": {
      "name": {
        "ko": "델리",
        "en": "Delhi"
      },
      "coordinates": {
        "lat": 28.61,
        "lng": 77.20
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "델리 술탄국 설립",
      "en": "Establishment of Delhi Sultanate"
    },
    "description": {
      "ko": "북인도 지역에 이슬람 세력이 세운 5개의 왕조를 통칭함.",
      "en": "The various Muslim dynasties that ruled in India from 1206 to 1526."
    },
    "category": "politics",
    "importance": 4,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "델리_술탄국",
      "en": "Delhi_Sultanate"
    },
    "icon": "🕌"
  },
  {
    "id": "event_mughal_empire",
    "type": "event",
    "date": {
      "start": "1526-04-21",
      "end": "1526-04-21"
    },
    "era": "earlyModern",
    "location": {
      "name": {
        "ko": "파니파트",
        "en": "Panipat"
      },
      "coordinates": {
        "lat": 29.39,
        "lng": 76.96
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "무굴 제국 건국",
      "en": "Founding of Mughal Empire"
    },
    "description": {
      "ko": "바부르가 파니파트 전투에서 승리하여 세운 제국으로 이후 인도 대부분을 지배함.",
      "en": "Babur founded the empire after his victory at the Battle of Panipat."
    },
    "category": "battle",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "무굴_제국",
      "en": "Mughal_Empire"
    },
    "icon": "⚔️"
  },
  {
    "id": "event_taj_mahal",
    "type": "event",
    "date": {
      "start": "1653-01-01",
      "end": "1653-01-01"
    },
    "era": "earlyModern",
    "location": {
      "name": {
        "ko": "아그라",
        "en": "Agra"
      },
      "coordinates": {
        "lat": 27.17,
        "lng": 78.04
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "타지마할 완공",
      "en": "Completion of Taj Mahal"
    },
    "description": {
      "ko": "무굴 제국의 샤 자한 황제가 사후 부인 뭄타즈 마할을 위해 지은 웅장한 묘당.",
      "en": "An ivory-white marble mausoleum commissioned by Emperor Shah Jahan for his favorite wife."
    },
    "category": "culture",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "타지마할",
      "en": "Taj_Mahal"
    },
    "icon": "🕌"
  },
  {
    "id": "event_battle_of_plassey",
    "type": "event",
    "date": {
      "start": "1757-06-23",
      "end": "1757-06-23"
    },
    "era": "earlyModern",
    "location": {
      "name": {
        "ko": "플라시",
        "en": "Plassey"
      },
      "coordinates": {
        "lat": 23.80,
        "lng": 88.25
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "플라시 전투",
      "en": "Battle of Plassey"
    },
    "description": {
      "ko": "영국 동인도 회사가 프랑스 세력을 꺾고 인도 지배의 발판을 마련한 결정적 전투.",
      "en": "A decisive victory of the British East India Company over the Nawab of Bengal and his French allies."
    },
    "category": "battle",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "플라시_전투",
      "en": "Battle_of_Plassey"
    },
    "icon": "⚔️"
  },
  {
    "id": "event_sepoy_mutiny",
    "type": "event",
    "date": {
      "start": "1857-05-10",
      "end": "1858-11-01"
    },
    "era": "modern",
    "location": {
      "name": {
        "ko": "메루트",
        "en": "Meerut"
      },
      "coordinates": {
        "lat": 28.98,
        "lng": 77.70
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "세포이 항쟁",
      "en": "Indian Rebellion of 1857"
    },
    "description": {
      "ko": "영국의 지배에 저항하여 인도 병사(세포이)들이 일으킨 대규모 반란.",
      "en": "A major, but ultimately unsuccessful, uprising in India against the rule of the British East India Company."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "세포이_항쟁",
      "en": "Indian_Rebellion_of_1857"
    },
    "icon": "✊"
  },
  {
    "id": "event_salt_march",
    "type": "event",
    "date": {
      "start": "1930-03-12",
      "end": "1930-04-06"
    },
    "era": "modern",
    "location": {
      "name": {
        "ko": "단디",
        "en": "Dandi"
      },
      "coordinates": {
        "lat": 20.89,
        "lng": 72.78
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "소금 행진",
      "en": "Salt March"
    },
    "description": {
      "ko": "영국의 소금 전매권에 저항하여 마하트마 간디가 전개한 비폭력 불복종 운동.",
      "en": "An act of nonviolent civil disobedience in colonial India led by Mahatma Gandhi."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "소금_행진",
      "en": "Salt_March"
    },
    "icon": "🚶"
  },
  {
    "id": "event_india_partition",
    "type": "event",
    "date": {
      "start": "1947-08-15",
      "end": "1947-08-15"
    },
    "era": "contemporary",
    "location": {
      "name": {
        "ko": "뉴델리",
        "en": "New Delhi"
      },
      "coordinates": {
        "lat": 28.61,
        "lng": 77.20
      },
      "region": "southAsia"
    },
    "title": {
      "ko": "인도·파키스탄 독립 및 분단",
      "en": "Independence and Partition of India"
    },
    "description": {
      "ko": "영국으로부터 독립했으나 종교 갈등으로 인도와 파키스탄으로 분단됨.",
      "en": "India gained independence from British rule, resulting in the partition into India and Pakistan."
    },
    "category": "politics",
    "importance": 5,
    "relatedPeople": [],
    "wikipedia": {
      "ko": "인도_분단",
      "en": "Partition_of_India"
    },
    "icon": "🇮🇳"
  }
];

// 중복 체크 후 추가
const existingIds = new Set(events.map(e => e.id));
const newEvents = southAsiaEvents.filter(e => !existingIds.has(e.id));

if (newEvents.length > 0) {
  const updatedEvents = [...events, ...newEvents];
  fs.writeFileSync(eventsPath, JSON.stringify(updatedEvents, null, 2), 'utf8');
  console.log(`${newEvents.length}개의 남아시아 이벤트가 추가되었습니다.`);
} else {
  console.log('추가할 새로운 이벤트가 없습니다.');
}
