const fs = require('fs');
const path = require('path');

const mediaPath = path.join(__dirname, 'src', 'data', 'media.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const media = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const southAsiaMedia = [
  {
    "id": "media_movie_mohenjo_daro",
    "type": "movie",
    "title": {
      "ko": "모헨조 다로",
      "en": "Mohenjo Daro"
    },
    "year": 2016,
    "creator": {
      "ko": "아슈토쉬 고와리커 감독",
      "en": "Dir. Ashutosh Gowariker"
    },
    "description": {
      "ko": "인더스 문명의 전성기 모헨조다로를 배경으로 한 대사극 영화.",
      "en": "An epic adventure-romance film set in 2016 BC at the height of the Indus Valley Civilization."
    },
    "relatedEvents": ["event_indus_valley"],
    "relatedPeople": [],
    "wikipedia": {
      "ko": "모헨조_다로_(영화)",
      "en": "Mohenjo_Daro_(film)"
    },
    "icon": "🎬"
  },
  {
    "id": "media_movie_asoka",
    "type": "movie",
    "title": {
      "ko": "아소카",
      "en": "Asoka"
    },
    "year": 2001,
    "creator": {
      "ko": "산토시 시반 감독",
      "en": "Dir. Santosh Sivan"
    },
    "description": {
      "ko": "마우리야 왕조의 아소카 왕이 칼링가 전쟁 이후 불교에 귀의하기까지의 과정을 그린 영화.",
      "en": "An epic historical drama focusing on the early life of Emperor Asoka."
    },
    "relatedEvents": ["event_ashoka_buddhism", "event_maurya_empire"],
    "relatedPeople": [],
    "wikipedia": {
      "ko": "아소카_(영화)",
      "en": "Asoka_(film)"
    },
    "icon": "🎬"
  },
  {
    "id": "media_movie_jodhaa_akbar",
    "type": "movie",
    "title": {
      "ko": "조다 악바르",
      "en": "Jodhaa Akbar"
    },
    "year": 2008,
    "creator": {
      "ko": "아슈토쉬 고와리커 감독",
      "en": "Dir. Ashutosh Gowariker"
    },
    "description": {
      "ko": "무굴 제국의 아크바르 대제와 힌두 공주 조다바이의 사랑과 정치를 그린 대작.",
      "en": "A 16th-century love story about a marriage of alliance between a Mughal emperor and a Rajput princess."
    },
    "relatedEvents": ["event_mughal_empire"],
    "relatedPeople": [],
    "wikipedia": {
      "ko": "조다_악바르",
      "en": "Jodhaa_Akbar"
    },
    "icon": "🎬"
  },
  {
    "id": "media_movie_mangal_pandey",
    "type": "movie",
    "title": {
      "ko": "망갈 판데이",
      "en": "Mangal Pandey: The Rising"
    },
    "year": 2005,
    "creator": {
      "ko": "케탄 메타 감독",
      "en": "Dir. Ketan Mehta"
    },
    "description": {
      "ko": "영국의 식민 지배에 맞서 세포이 항쟁의 도화선이 된 망갈 판데이의 삶을 다룬 영화.",
      "en": "A biographical historical film based on the life of Mangal Pandey, who helped spark the Indian Rebellion of 1857."
    },
    "relatedEvents": ["event_sepoy_mutiny"],
    "relatedPeople": [],
    "wikipedia": {
      "ko": "망갈_판데이_(영화)",
      "en": "Mangal_Pandey:_The_Rising"
    },
    "icon": "🎬"
  },
  {
    "id": "media_movie_gandhi",
    "type": "movie",
    "title": {
      "ko": "간디",
      "en": "Gandhi"
    },
    "year": 1982,
    "creator": {
      "ko": "리처드 아텐버러 감독",
      "en": "Dir. Richard Attenborough"
    },
    "description": {
      "ko": "마하트마 간디의 비폭력 불복종 운동과 인도의 독립 과정을 다룬 아카데미 수상작.",
      "en": "A biographical film that dramatizes the life of Mohandas Gandhi, the leader of India's non-violent independence movement."
    },
    "relatedEvents": ["event_salt_march", "event_india_partition"],
    "relatedPeople": [],
    "wikipedia": {
      "ko": "간디_(영화)",
      "en": "Gandhi_(film)"
    },
    "icon": "🎬"
  },
  {
    "id": "media_novel_train_to_pakistan",
    "type": "novel",
    "title": {
      "ko": "파키스탄행 열차",
      "en": "Train to Pakistan"
    },
    "year": 1956,
    "creator": {
      "ko": "쿠슈완트 싱",
      "en": "Khushwant Singh"
    },
    "description": {
      "ko": "인도와 파키스탄 분단 당시의 혼란과 비극을 다룬 쿠슈완트 싱의 고전 소설.",
      "en": "A historical novel by Khushwant Singh about the Partition of India in August 1947."
    },
    "relatedEvents": ["event_india_partition"],
    "relatedPeople": [],
    "wikipedia": {
      "ko": "파키스탄행_열차",
      "en": "Train_to_Pakistan"
    },
    "icon": "📚"
  },
  {
    "id": "media_novel_midnights_children",
    "type": "novel",
    "title": {
      "ko": "한밤의 아이들",
      "en": "Midnight's Children"
    },
    "year": 1981,
    "creator": {
      "ko": "살만 루슈디",
      "en": "Salman Rushdie"
    },
    "description": {
      "ko": "인도의 독립 순간에 태어난 아이들의 삶을 통해 인도 현대사를 은유적으로 그린 소설.",
      "en": "A novel by Salman Rushdie about India's transition from British colonial rule to independence and partition."
    },
    "relatedEvents": ["event_india_partition"],
    "relatedPeople": [],
    "wikipedia": {
      "ko": "한밤의_아이들",
      "en": "Midnight's_Children"
    },
    "icon": "📚"
  }
];

// 1. 미디어 데이터 추가 (중복 제외)
const existingMediaIds = new Set(media.map(m => m.id));
const newMedia = southAsiaMedia.filter(m => !existingMediaIds.has(m.id));

if (newMedia.length > 0) {
  const updatedMedia = [...media, ...newMedia];
  fs.writeFileSync(mediaPath, JSON.stringify(updatedMedia, null, 2), 'utf8');
  console.log(`${newMedia.length}개의 남아시아 미디어가 추가되었습니다.`);
}

// 2. 이벤트 데이터 업데이트 (relatedMedia 추가)
let eventUpdateCount = 0;
const mediaMap = {}; // eventId -> [mediaId, ...]
southAsiaMedia.forEach(m => {
  m.relatedEvents.forEach(eId => {
    if (!mediaMap[eId]) mediaMap[eId] = [];
    mediaMap[eId].push(m.id);
  });
});

const updatedEvents = events.map(event => {
  if (mediaMap[event.id]) {
    const newMediaIds = mediaMap[event.id];
    const currentMedia = event.relatedMedia || [];
    const combinedMedia = Array.from(new Set([...currentMedia, ...newMediaIds]));
    
    if (combinedMedia.length > currentMedia.length) {
      eventUpdateCount++;
      return { ...event, relatedMedia: combinedMedia };
    }
  }
  return event;
});

if (eventUpdateCount > 0) {
  fs.writeFileSync(eventsPath, JSON.stringify(updatedEvents, null, 2), 'utf8');
  console.log(`${eventUpdateCount}개의 이벤트에 관련 미디어가 연결되었습니다.`);
}
