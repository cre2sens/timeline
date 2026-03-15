const fs = require('fs');
const path = require('path');

const peoplePath = path.join(__dirname, 'src', 'data', 'people.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newPeople = [
  {
    "id": "person_aristotle",
    "type": "person",
    "date": { "birth": "-0384-01-01", "death": "-0322-01-01" },
    "era": "ancient",
    "birthPlace": { "name": { "ko": "스타게이라", "en": "Stagira" }, "coordinates": { "lat": 40.58, "lng": 23.75 }, "region": "europe" },
    "title": { "ko": "아리스토텔레스", "en": "Aristotle" },
    "description": { "ko": "고대 그리스 철학자이자 자연과학의 선구자. 고전 역학과 생물학의 기초를 다짐.", "en": "Ancient Greek philosopher and polymath, pioneer of natural sciences." },
    "category": "thinker",
    "relatedEvents": [],
    "relatedPeople": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "아리스토텔레스", "en": "Aristotle" },
    "icon": "📖",
    "image": "",
    "importance": 5
  },
  {
    "id": "person_copernicus",
    "type": "person",
    "date": { "birth": "1473-02-19", "death": "1543-05-24" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "투룬", "en": "Toruń" }, "coordinates": { "lat": 53.01, "lng": 18.60 }, "region": "europe" },
    "title": { "ko": "니콜라우스 코페르니쿠스", "en": "Nicolaus Copernicus" },
    "description": { "ko": "지동설(태양 중심설)을 제창하여 과학 혁명의 기초를 마련한 폴란드의 천문학자.", "en": "Polish astronomer who formulated a model of the universe that placed the Sun rather than Earth at the center." },
    "category": "thinker",
    "relatedEvents": ["event_heliocentrism"],
    "relatedPeople": ["person_galileo"],
    "relatedMedia": [],
    "wikipedia": { "ko": "니콜라우스_코페르니쿠스", "en": "Nicolaus_Copernicus" },
    "icon": "🔭",
    "image": "",
    "importance": 5
  },
  {
    "id": "person_leeuwenhoek",
    "type": "person",
    "date": { "birth": "1632-10-24", "death": "1723-08-26" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "델프트", "en": "Delft" }, "coordinates": { "lat": 52.01, "lng": 4.35 }, "region": "europe" },
    "title": { "ko": "안톤 판 레이우엔훅", "en": "Antonie van Leeuwenhoek" },
    "description": { "ko": "미생물학의 아버지. 직접 제작한 현미경으로 미생물을 최초로 관찰함.", "en": "The Father of Microbiology, first to observe microorganisms using microscopes of his own design." },
    "category": "thinker",
    "relatedEvents": [],
    "relatedPeople": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "안톤_판_레이우엔훅", "en": "Antonie_van_Leeuwenhoek" },
    "icon": "🔬",
    "image": "",
    "importance": 4
  },
  {
    "id": "person_isaac_newton",
    "type": "person",
    "date": { "birth": "1643-01-04", "death": "1727-03-31" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "울즈소프", "en": "Woolsthorpe-by-Colsterworth" }, "coordinates": { "lat": 52.81, "lng": -0.63 }, "region": "europe" },
    "title": { "ko": "아이작 뉴턴", "en": "Isaac Newton" },
    "description": { "ko": "고전 역학을 확립하고 만유인력의 법칙, 미적분학의 창시 등 자연과학의 새 지평을 연 영국의 물리학자.", "en": "English mathematician and physicist who formulated the laws of motion and universal gravitation." },
    "category": "thinker",
    "relatedEvents": ["event_principia"],
    "relatedPeople": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "아이작_뉴턴", "en": "Isaac_Newton" },
    "icon": "📖",
    "image": "",
    "importance": 5
  },
  {
    "id": "person_charles_darwin",
    "type": "person",
    "date": { "birth": "1809-02-12", "death": "1882-04-19" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "슈루즈베리", "en": "Shrewsbury" }, "coordinates": { "lat": 52.71, "lng": -2.75 }, "region": "europe" },
    "title": { "ko": "찰스 다윈", "en": "Charles Darwin" },
    "description": { "ko": "자연선택을 통한 진화론을 제시하여 생물학에 혁명적 변화를 가져온 영국의 생물학자.", "en": "English naturalist who proposed the scientific theory of evolution by natural selection." },
    "category": "thinker",
    "relatedEvents": ["event_origin_of_species"],
    "relatedPeople": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "찰스_다윈", "en": "Charles_Darwin" },
    "icon": "📖",
    "image": "",
    "importance": 5
  },
  {
    "id": "person_marie_curie",
    "type": "person",
    "date": { "birth": "1867-11-07", "death": "1934-07-04" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "바르샤바", "en": "Warsaw" }, "coordinates": { "lat": 52.22, "lng": 21.01 }, "region": "europe" },
    "title": { "ko": "마리 퀴리", "en": "Marie Curie" },
    "description": { "ko": "방사능 연구의 선구자. 여성 최초의 노벨상 수상자이자 두 가지 과학 분야(물리학, 화학)에서 노벨상을 수상한 최초의 인물.", "en": "Pioneer in radioactivity research, the first woman to win a Nobel Prize, and the first person to win twice in multiple sciences." },
    "category": "thinker",
    "relatedEvents": [],
    "relatedPeople": ["person_albert_einstein"],
    "relatedMedia": ["media_movie_radioactive"],
    "wikipedia": { "ko": "마리_퀴리", "en": "Marie_Curie" },
    "icon": "🔬",
    "image": "",
    "importance": 5
  },
  {
    "id": "person_albert_einstein",
    "type": "person",
    "date": { "birth": "1879-03-14", "death": "1955-04-18" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "울름", "en": "Ulm" }, "coordinates": { "lat": 48.40, "lng": 9.99 }, "region": "europe" },
    "title": { "ko": "알베르트 아인슈타인", "en": "Albert Einstein" },
    "description": { "ko": "상대성 이론을 발표하여 현대 물리학의 뼈대를 세운 이론물리학자.", "en": "Theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics." },
    "category": "thinker",
    "relatedEvents": ["event_special_relativity", "event_general_relativity"],
    "relatedPeople": ["person_marie_curie", "person_oppenheimer"],
    "relatedMedia": ["media_movie_oppenheimer"],
    "wikipedia": { "ko": "알베르트_아인슈타인", "en": "Albert_Einstein" },
    "icon": "📖",
    "image": "",
    "importance": 5
  },
  {
    "id": "person_alan_turing",
    "type": "person",
    "date": { "birth": "1912-06-23", "death": "1954-06-07" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.52, "lng": -0.18 }, "region": "europe" },
    "title": { "ko": "앨런 튜링", "en": "Alan Turing" },
    "description": { "ko": "튜링 기계 모델을 통해 컴퓨터 과학과 인공지능의 토대를 마련한 영국의 수학자 및 암호학자.", "en": "English mathematician and cryptanalyst, widely considered the father of theoretical computer science and AI." },
    "category": "thinker",
    "relatedEvents": [],
    "relatedPeople": [],
    "relatedMedia": ["media_movie_imitation_game"],
    "wikipedia": { "ko": "앨런_튜링", "en": "Alan_Turing" },
    "icon": "💡",
    "image": "",
    "importance": 5
  },
  {
    "id": "person_rosalind_franklin",
    "type": "person",
    "date": { "birth": "1920-07-25", "death": "1958-04-16" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "로잘린드 프랭클린", "en": "Rosalind Franklin" },
    "description": { "ko": "X선 회절 사진(Photo 51)을 통해 DNA의 이중 나선 구조를 밝히는 데 결정적인 데이터를 제공한 과학자.", "en": "Chemist whose X-ray diffraction images of DNA led to the discovery of the DNA double helix." },
    "category": "thinker",
    "relatedEvents": ["event_dna_structure"],
    "relatedPeople": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "로잘린드_프랭클린", "en": "Rosalind_Franklin" },
    "icon": "🔬",
    "image": "",
    "importance": 4
  },
  {
    "id": "person_richard_feynman",
    "type": "person",
    "date": { "birth": "1918-05-11", "death": "1988-02-15" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "뉴욕", "en": "New York" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "리처드 파인만", "en": "Richard Feynman" },
    "description": { "ko": "양자전기역학 분야에서의 공로로 노벨상을 수상한 미국의 이론물리학자이자 탁월한 과학 교육자.", "en": "American theoretical physicist known for his work in the path integral formulation of quantum mechanics." },
    "category": "thinker",
    "relatedEvents": [],
    "relatedPeople": ["person_oppenheimer"],
    "relatedMedia": ["media_movie_oppenheimer"],
    "wikipedia": { "ko": "리처드_파인만", "en": "Richard_Feynman" },
    "icon": "📖",
    "image": "",
    "importance": 4
  }
];

const newEvents = [
  {
    "id": "event_heliocentrism",
    "type": "event",
    "date": { "start": "1543-05-24", "end": "1543-05-24" },
    "era": "earlyModern",
    "location": { "name": { "ko": "뉘른베르크", "en": "Nuremberg" }, "coordinates": { "lat": 49.45, "lng": 11.07 }, "region": "europe" },
    "title": { "ko": "지동설 제창", "en": "Heliocentrism Publication" },
    "description": { "ko": "니콜라우스 코페르니쿠스가 《천구의 회전에 관하여》를 출판하며 태양 중심설 모델을 제시한 과학 혁명의 시작점.", "en": "Copernicus published 'De revolutionibus', proposing a heliocentric model of the universe." },
    "category": "discovery",
    "relatedPeople": ["person_copernicus"],
    "relatedEvents": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "천체_회전에_관하여", "en": "De_revolutionibus_orbium_coelestium" },
    "icon": "🧭",
    "importance": 5
  },
  {
    "id": "event_principia",
    "type": "event",
    "date": { "start": "1687-07-05", "end": "1687-07-05" },
    "era": "earlyModern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "프린키피아 출판", "en": "Publication of Principia" },
    "description": { "ko": "아이작 뉴턴이 만유인력의 법칙과 뉴턴 운동 법칙이 담긴 《자연철학의 수학적 원리》를 출간함.", "en": "Isaac Newton published his 'Principia Mathematica' laying the foundations of classical mechanics." },
    "category": "publication",
    "relatedPeople": ["person_isaac_newton"],
    "relatedEvents": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "자연철학의_수학적_원리", "en": "Philosophiæ_Naturalis_Principia_Mathematica" },
    "icon": "📖",
    "importance": 5
  },
  {
    "id": "event_origin_of_species",
    "type": "event",
    "date": { "start": "1859-11-24", "end": "1859-11-24" },
    "era": "modern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "종의 기원 출판", "en": "Publication of On the Origin of Species" },
    "description": { "ko": "찰스 다윈이 자연선택에 의한 생물 진화론을 담은 저서 《종의 기원》을 출판하여 과학과 사회에 엄청난 충격을 줌.", "en": "Charles Darwin published his theory of evolution by natural selection." },
    "category": "publication",
    "relatedPeople": ["person_charles_darwin"],
    "relatedEvents": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "종의_기원", "en": "On_the_Origin_of_Species" },
    "icon": "📖",
    "importance": 5
  },
  {
    "id": "event_special_relativity",
    "type": "event",
    "date": { "start": "1905-09-26", "end": "1905-09-26" },
    "era": "modern",
    "location": { "name": { "ko": "베른", "en": "Bern" }, "coordinates": { "lat": 46.94, "lng": 7.44 }, "region": "europe" },
    "title": { "ko": "특수 상대성 이론 발표", "en": "Special Relativity" },
    "description": { "ko": "알베르트 아인슈타인이 시간과 공간의 절대성을 부정한 특수 상대성 이론 및 E=mc²의 질량-에너지 등가원리를 기적의 해에 발표함.", "en": "Einstein published his theory of special relativity in his Annus Mirabilis papers." },
    "category": "discovery",
    "relatedPeople": ["person_albert_einstein"],
    "relatedEvents": [],
    "relatedMedia": ["media_movie_oppenheimer"],
    "wikipedia": { "ko": "특수_상대성_이론", "en": "Special_relativity" },
    "icon": "💡",
    "importance": 5
  },
  {
    "id": "event_penicillin",
    "type": "event",
    "date": { "start": "1928-09-28", "end": "1928-09-28" },
    "era": "modern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.51, "lng": -0.17 }, "region": "europe" },
    "title": { "ko": "페니실린 발견", "en": "Discovery of Penicillin" },
    "description": { "ko": "알렉산더 플레밍이 푸른곰팡이에서 최초의 항생제 성분인 페니실린을 우연히 발견하여 수억 명의 생명을 구함.", "en": "Alexander Fleming serendipitously discovered penicillin, the first true antibiotic." },
    "category": "discovery",
    "relatedPeople": [],
    "relatedEvents": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "페니실린", "en": "Penicillin" },
    "icon": "🧭",
    "importance": 5
  },
  {
    "id": "event_dna_structure",
    "type": "event",
    "date": { "start": "1953-04-25", "end": "1953-04-25" },
    "era": "contemporary",
    "location": { "name": { "ko": "케임브리지", "en": "Cambridge" }, "coordinates": { "lat": 52.20, "lng": 0.11 }, "region": "europe" },
    "title": { "ko": "DNA 구조 규명", "en": "Discovery of DNA Structure" },
    "description": { "ko": "제임스 왓슨과 프랜시스 크릭이 로잘린드 프랭클린의 X선 회절 데이터를 바탕으로 DNA 이중 나선 구조 논문을 네이처지에 게재.", "en": "Watson and Crick published the double-helix structure of DNA in Nature." },
    "category": "discovery",
    "relatedPeople": ["person_rosalind_franklin"],
    "relatedEvents": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "DNA", "en": "DNA" },
    "icon": "🧭",
    "importance": 5
  },
  {
    "id": "event_www",
    "type": "event",
    "date": { "start": "1991-08-06", "end": "1991-08-06" },
    "era": "contemporary",
    "location": { "name": { "ko": "제네바 (CERN)", "en": "Geneva (CERN)" }, "coordinates": { "lat": 46.23, "lng": 6.05 }, "region": "europe" },
    "title": { "ko": "최초의 웹사이트 공개 (WWW)", "en": "First Website Online (WWW)" },
    "description": { "ko": "팀 버너스리가 개발한 월드 와이드 웹(WWW) 프로젝트의 첫 웹사이트가 전 세계에 공개됨. 인터넷 대중화의 시작.", "en": "Tim Berners-Lee published the first-ever website, making the World Wide Web publicly available." },
    "category": "invention",
    "relatedPeople": [],
    "relatedEvents": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "월드_와이드_웹", "en": "World_Wide_Web" },
    "icon": "💡",
    "importance": 5
  },
  {
    "id": "event_human_genome",
    "type": "event",
    "date": { "start": "2003-04-14", "end": "2003-04-14" },
    "era": "contemporary",
    "location": { "name": { "ko": "전 세계 (국제 협력)", "en": "International" }, "coordinates": { "lat": 38.99, "lng": -77.09 }, "region": "etc" },
    "title": { "ko": "인간 게놈 프로젝트 완성", "en": "Human Genome Project Completed" },
    "description": { "ko": "인간의 DNA 염기 서열을 99% 해독하여 맞춤형 의학과 유전학 연구의 새 시대를 엶.", "en": "International scientific research project successfully mapped the human genome." },
    "category": "discovery",
    "relatedPeople": [],
    "relatedEvents": [],
    "relatedMedia": [],
    "wikipedia": { "ko": "인간_게놈_프로젝트", "en": "Human_Genome_Project" },
    "icon": "🔬",
    "importance": 5
  },
  {
    "id": "event_gravitational_waves",
    "type": "event",
    "date": { "start": "2015-09-14", "end": "2015-09-14" },
    "era": "contemporary",
    "location": { "name": { "ko": "캘리포니아 (LIGO)", "en": "California (LIGO)" }, "coordinates": { "lat": 46.45, "lng": -119.40 }, "region": "americas" },
    "title": { "ko": "중력파 최초 관측", "en": "First Observation of Gravitational Waves" },
    "description": { "ko": "LIGO 연구진이 두 블랙홀의 충돌로 발생한 중력파를 최초로 직접 관측하여 아인슈타인의 예측을 100년 만에 증명함.", "en": "LIGO scientifically observed ripples in spacetime, confirming Einstein’s prediction." },
    "category": "discovery",
    "relatedPeople": ["person_albert_einstein"],
    "relatedEvents": ["event_general_relativity"],
    "relatedMedia": [],
    "wikipedia": { "ko": "중력파의_최초_관측", "en": "First_observation_of_gravitational_waves" },
    "icon": "🔭",
    "importance": 5
  }
];

// Append to data arrays
const mergedPeople = [...peopleData];
newPeople.forEach(newP => {
  if (!mergedPeople.find(p => p.id === newP.id)) {
    mergedPeople.push(newP);
  }
});

const mergedEvents = [...eventsData];
newEvents.forEach(newE => {
  if (!mergedEvents.find(e => e.id === newE.id)) {
    mergedEvents.push(newE);
  }
});

fs.writeFileSync(peoplePath, JSON.stringify(mergedPeople, null, 2), 'utf8');
fs.writeFileSync(eventsPath, JSON.stringify(mergedEvents, null, 2), 'utf8');
console.log('Scripts complete!');
