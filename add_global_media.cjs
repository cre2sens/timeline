const fs = require('fs');
const path = require('path');

const mediaPath = path.join(__dirname, 'src', 'data', 'media.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const media = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const globalMedia = [
  {
    "id": "media_novel_three_kingdoms",
    "type": "novel",
    "title": { "ko": "삼국지연의", "en": "Romance of the Three Kingdoms" },
    "year": 1400,
    "creator": { "ko": "나관중", "en": "Luo Guanzhong" },
    "description": {
      "ko": "중국 삼국시대의 역사를 바탕으로 한 고전 소설로 전 세계적으로 가장 유명한 역사 소설 중 하나.",
      "en": "A 14th-century historical novel attributed to Luo Guanzhong, set in the turbulent years at the end of the Han dynasty."
    },
    "relatedEvents": ["event_three_kingdoms"],
    "relatedPeople": [],
    "wikipedia": { "ko": "삼국지연의", "en": "Romance_of_the_Three_Kingdoms" },
    "icon": "📚"
  },
  {
    "id": "media_movie_gladiator",
    "type": "movie",
    "title": { "ko": "글래디에이터", "en": "Gladiator" },
    "year": 2000,
    "creator": { "ko": "리들리 스콧 감독", "en": "Dir. Ridley Scott" },
    "description": {
      "ko": "로마 제국 전성기, 황제의 총애를 받던 장군 막시무스가 검투사가 되어 복수하는 과정을 그린 대작.",
      "en": "An epic historical drama following a Roman general who is betrayed and becomes a gladiator."
    },
    "relatedEvents": ["event_rome_founding", "event_fall_of_rome"],
    "relatedPeople": [],
    "wikipedia": { "ko": "글래디에이터_(영화)", "en": "Gladiator_(2000_film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_ben_hur",
    "type": "movie",
    "title": { "ko": "벤허", "en": "Ben-Hur" },
    "year": 1959,
    "creator": { "ko": "윌리엄 와일러 감독", "en": "Dir. William Wyler" },
    "description": {
      "ko": "로마 제국 시대, 유대인 귀족 벤허의 파란만장한 삶과 복수, 그리고 용서를 그린 영화사적 걸작.",
      "en": "A religious epic set in the Roman Empire, following a Jewish prince who is betrayed and enslaved."
    },
    "relatedEvents": ["event_rome_founding"],
    "relatedPeople": [],
    "wikipedia": { "ko": "벤허_(1959년_영화)", "en": "Ben-Hur_(1959_film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_kingdom_of_heaven",
    "type": "movie",
    "title": { "ko": "킹덤 오브 헤븐", "en": "Kingdom of Heaven" },
    "year": 2005,
    "creator": { "ko": "리들리 스콧 감독", "en": "Dir. Ridley Scott" },
    "description": {
      "ko": "12세기 십자군 전쟁을 배경으로 예루살렘 왕국과 이슬람 세력의 충돌과 평화를 향한 고뇌를 담은 영화.",
      "en": "An epic historical drama about the Crusades and the defense of Jerusalem in the 12th century."
    },
    "relatedEvents": ["event_crusades"],
    "relatedPeople": [],
    "wikipedia": { "ko": "킹덤_오브_헤븐_(영화)", "en": "Kingdom_of_Heaven_(film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_les_miserables",
    "type": "movie",
    "title": { "ko": "레 미제라블", "en": "Les Misérables" },
    "year": 2012,
    "creator": { "ko": "톰 후퍼 감독", "en": "Dir. Tom Hooper" },
    "description": {
      "ko": "빅토르 위고의 소설을 원작으로, 19세기 프랑스 혁명기의 혼란과 인간의 구원을 그린 뮤지컬 영화.",
      "en": "Based on Victor Hugo's novel, set during the post-Revolutionary period in France, leading up to the 1832 June Rebellion."
    },
    "relatedEvents": ["event_french_revolution"],
    "relatedPeople": [],
    "wikipedia": { "ko": "레_미제라블_(2012년_영화)", "en": "Les_Misérables_(2012_film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_western_front",
    "type": "movie",
    "title": { "ko": "서부 전선 이상 없다", "en": "All Quiet on the Western Front" },
    "year": 2022,
    "creator": { "ko": "에드워드 버거 감독", "en": "Dir. Edward Berger" },
    "description": {
      "ko": "제1차 세계대전의 참혹한 현실을 독일군 병사의 시선으로 그린 반전 영화의 고전.",
      "en": "Based on the 1929 novel by Erich Maria Remarque, depicting the physical and mental stress of German soldiers during WWI."
    },
    "relatedEvents": ["event_ww1"],
    "relatedPeople": [],
    "wikipedia": { "ko": "서부_전선_이상_없다_(2022년_영화)", "en": "All_Quiet_on_the_Western_Front_(2022_film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_schindlers_list",
    "type": "movie",
    "title": { "ko": "쉰들러 리스트", "en": "Schindler's List" },
    "year": 1993,
    "creator": { "ko": "스티븐 스필버그 감독", "en": "Dir. Steven Spielberg" },
    "description": {
      "ko": "제2차 세계대전 중 유대인 1,100여 명의 목숨을 구한 독일인 사업가 오스카 쉰들러의 실화를 다룬 명작.",
      "en": "The story of Oskar Schindler, a German industrialist who saved more than a thousand mostly Polish-Jewish refugees from the Holocaust."
    },
    "relatedEvents": ["event_ww2"],
    "relatedPeople": [],
    "wikipedia": { "ko": "쉰들러_리스트", "en": "Schindler's_List" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_taegukgi",
    "type": "movie",
    "title": { "ko": "태극기 휘날리며", "en": "Taegukgi: The Brotherhood of War" },
    "year": 2004,
    "creator": { "ko": "강제규 감독", "en": "Dir. Kang Je-gyu" },
    "description": {
      "ko": "한국전쟁의 비극 속에서 엇갈린 운명을 맞이한 두 형제의 이야기를 그린 한국 영화 역사상 최고의 전쟁 대작.",
      "en": "An epic war film depicting the emotional and physical toll of the Korean War on two brothers."
    },
    "relatedEvents": ["event_korean_war"],
    "relatedPeople": [],
    "wikipedia": { "ko": "태극기_휘날리며", "en": "Taegukgi_(film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_resistance",
    "type": "movie",
    "title": { "ko": "항거: 유관순 이야기", "en": "A Resistance" },
    "year": 2019,
    "creator": { "ko": "조민호 감독", "en": "Dir. Joe Min-ho" },
    "description": {
      "ko": "1919년 3·1 운동 이후 서대문 감옥에 갇힌 유관순과 여성 독립운동가들의 투쟁을 그린 영화.",
      "en": "The story of Yu Gwan-sun and other female independence activists imprisoned after the March 1st Movement."
    },
    "relatedEvents": ["event_march_first"],
    "relatedPeople": [],
    "wikipedia": { "ko": "항거:_유관순_이야기", "en": "A_Resistance" },
    "icon": "🎬"
  },
  {
    "id": "media_drama_nokdu",
    "type": "drama",
    "title": { "ko": "녹두꽃", "en": "The Nokdu Flower" },
    "year": 2019,
    "creator": { "ko": "SBS", "en": "SBS" },
    "description": {
      "ko": "1894년 동학농민운동의 소용돌이 속에서 엇갈린 길을 걷게 된 두 형제의 서사를 다룬 드라마.",
      "en": "A historical drama set during the Donghak Peasant Revolution of 1894."
    },
    "relatedEvents": ["event_donghak"],
    "relatedPeople": [],
    "wikipedia": { "ko": "녹두꽃_(드라마)", "en": "Nokdu_Flower" },
    "icon": "📺"
  },
  {
    "id": "media_novel_war_and_peace",
    "type": "novel",
    "title": { "ko": "전쟁과 평화", "en": "War and Peace" },
    "year": 1869,
    "creator": { "ko": "레프 톨스토이", "en": "Leo Tolstoy" },
    "description": {
      "ko": "나폴레옹 전쟁 시기 러시아 사회와 인간의 삶을 거시적이고도 세밀하게 그려낸 톨스토이의 불후의 명작.",
      "en": "A masterpiece of world literature set during the Napoleonic Wars in Russia."
    },
    "relatedEvents": ["event_napoleon"],
    "relatedPeople": [],
    "wikipedia": { "ko": "전쟁과_평화", "en": "War_and_Peace" },
    "icon": "📚"
  },
  {
    "id": "media_movie_opium_war",
    "type": "movie",
    "title": { "ko": "아편전쟁", "en": "The Opium War" },
    "year": 1997,
    "creator": { "ko": "셰진 감독", "en": "Dir. Xie Jin" },
    "description": {
      "ko": "19세기 중반, 영국과 청나라 사이의 아편 전쟁과 홍콩 할양의 역사를 다룬 중국 대작 영화.",
      "en": "A historical drama about the First Opium War between Britain and China."
    },
    "relatedEvents": ["event_opium_war", "event_opium_wars"],
    "relatedPeople": [],
    "wikipedia": { "ko": "아편전쟁_(영화)", "en": "The_Opium_War_(film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_lawrence_arabia",
    "type": "movie",
    "title": { "ko": "아라비아의 로렌스", "en": "Lawrence of Arabia" },
    "year": 1962,
    "creator": { "ko": "데이비드 린 감독", "en": "Dir. David Lean" },
    "description": {
      "ko": "제1차 세계대전 당시 중동에서 아랍 부족들을 통합해 오스만 제국에 맞선 T.E. 로렌스의 실화를 다룬 영화.",
      "en": "An epic biographical film based on the life of T. E. Lawrence during World War I."
    },
    "relatedEvents": ["event_ww1"],
    "relatedPeople": [],
    "wikipedia": { "ko": "아라비아의_로렌스_(영화)", "en": "Lawrence_of_Arabia_(film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_1917",
    "type": "movie",
    "title": { "ko": "1917", "en": "1917" },
    "year": 2019,
    "creator": { "ko": "샘 멘데스 감독", "en": "Dir. Sam Mendes" },
    "description": {
      "ko": "제1차 세계대전, 아군을 구하기 위해 사선을 넘나드는 두 병사의 긴박한 임무를 원테이크 기법으로 담아낸 영화.",
      "en": "A war film directed by Sam Mendes, set during World War I, featuring a continuous shot style."
    },
    "relatedEvents": ["event_ww1"],
    "relatedPeople": [],
    "wikipedia": { "ko": "1917_(영화)", "en": "1917_(2019_film)" },
    "icon": "🎬"
  },
  {
    "id": "media_movie_spartacus",
    "type": "movie",
    "title": { "ko": "스파르타쿠스", "en": "Spartacus" },
    "year": 1960,
    "creator": { "ko": "스탠리 큐브릭 감독", "en": "Dir. Stanley Kubrick" },
    "description": {
      "ko": "로마 공화정 말기, 노예 검투사 스파르타쿠스가 주도한 대규모 노예 봉기를 다룬 역사 대작.",
      "en": "An epic historical drama based on the life of Spartacus and the Third Servile War."
    },
    "relatedEvents": ["event_rome_founding"],
    "relatedPeople": [],
    "wikipedia": { "ko": "스파르타쿠스_(영화)", "en": "Spartacus_(film)" },
    "icon": "🎬"
  }
];

// 1. 미디어 데이터 추가
const existingMediaIds = new Set(media.map(m => m.id));
const newMedia = globalMedia.filter(m => !existingMediaIds.has(m.id));

if (newMedia.length > 0) {
  const updatedMedia = [...media, ...newMedia];
  fs.writeFileSync(mediaPath, JSON.stringify(updatedMedia, null, 2), 'utf8');
  console.log(`${newMedia.length}개의 글로벌 미디어가 추가되었습니다.`);
}

// 2. 이벤트 데이터 업데이트
let eventUpdateCount = 0;
const mediaMap = {};
globalMedia.forEach(m => {
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
  console.log(`${eventUpdateCount}개의 글로벌 이벤트에 관련 미디어가 연결되었습니다.`);
}
