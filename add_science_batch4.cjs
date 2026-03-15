const fs = require('fs');
const path = require('path');

const peoplePath = path.join(__dirname, 'src', 'data', 'people.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newPeople = [
  {
    "id": "person_jj_thomson",
    "type": "person",
    "date": { "birth": "1856-12-18", "death": "1940-08-30" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "맨체스터", "en": "Manchester" }, "coordinates": { "lat": 53.48, "lng": -2.24 }, "region": "europe" },
    "title": { "ko": "조지프 존 톰슨", "en": "J. J. Thomson" },
    "description": { "ko": "전자를 발견하여 원자가 쪼개질 수 없다는 기존의 학설을 뒤집은 영국의 물리학자.", "en": "English physicist and Nobel Laureate in Physics, credited with the discovery of the electron." },
    "category": "thinker", "relatedEvents": ["event_electron_discovery"], "relatedPeople": ["person_rutherford"], "relatedMedia": [], "wikipedia": { "ko": "J._J._톰슨", "en": "J._J._Thomson" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "person_rutherford",
    "type": "person",
    "date": { "birth": "1871-08-30", "death": "1937-10-19" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "넬슨", "en": "Nelson" }, "coordinates": { "lat": -41.28, "lng": 173.28 }, "region": "oceania" },
    "title": { "ko": "어니스트 러더퍼드", "en": "Ernest Rutherford" },
    "description": { "ko": "원자핵을 발견하고 방사능 붕괴의 법칙을 규명한 핵물리학의 아버지.", "en": "New Zealand physicist who came to be known as the father of nuclear physics." },
    "category": "thinker", "relatedEvents": ["event_atomic_nucleus"], "relatedPeople": ["person_jj_thomson", "person_bohr"], "relatedMedia": [], "wikipedia": { "ko": "어니스트_러더퍼드", "en": "Ernest_Rutherford" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "person_bohr",
    "type": "person",
    "date": { "birth": "1885-10-07", "death": "1962-11-18" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "코펜하겐", "en": "Copenhagen" }, "coordinates": { "lat": 55.67, "lng": 12.56 }, "region": "europe" },
    "title": { "ko": "닐스 보어", "en": "Niels Bohr" },
    "description": { "ko": "양자 가설을 도입한 새로운 원자 모형을 제시하여 양자역학의 발전에 핵심적으로 기여함.", "en": "Danish physicist who made foundational contributions to understanding atomic structure and quantum theory." },
    "category": "thinker", "relatedEvents": ["event_bohr_model"], "relatedPeople": ["person_rutherford", "person_albert_einstein", "person_heisenberg"], "relatedMedia": [], "wikipedia": { "ko": "닐스_보어", "en": "Niels_Bohr" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_heisenberg",
    "type": "person",
    "date": { "birth": "1901-12-05", "death": "1976-02-01" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "뷔르츠부르크", "en": "Würzburg" }, "coordinates": { "lat": 49.79, "lng": 9.95 }, "region": "europe" },
    "title": { "ko": "베르너 하이젠베르크", "en": "Werner Heisenberg" },
    "description": { "ko": "양자역학의 확립에 기여한 불확정성 원리를 창시하여 현대 입자 물리학의 기초를 다짐.", "en": "German theoretical physicist whose contributions were crucial to the creation of quantum mechanics, known for the uncertainty principle." },
    "category": "thinker", "relatedEvents": ["event_uncertainty_principle"], "relatedPeople": ["person_bohr", "person_schrodinger"], "relatedMedia": [], "wikipedia": { "ko": "베르너_하이젠베르크", "en": "Werner_Heisenberg" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "person_schrodinger",
    "type": "person",
    "date": { "birth": "1887-08-12", "death": "1961-01-04" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "빈", "en": "Vienna" }, "coordinates": { "lat": 48.20, "lng": 16.37 }, "region": "europe" },
    "title": { "ko": "에르빈 슈뢰딩거", "en": "Erwin Schrödinger" },
    "description": { "ko": "양자역학의 파동 방정식을 제안하고 '슈뢰딩거의 고양이' 사고실험으로 유명한 오스트리아의 물리학자.", "en": "Nobel Prize-winning Austrian-Irish physicist who developed a number of fundamental results in quantum theory." },
    "category": "thinker", "relatedEvents": ["event_schrodinger_equation"], "relatedPeople": ["person_heisenberg", "person_dirac"], "relatedMedia": [], "wikipedia": { "ko": "에르빈_슈뢰딩거", "en": "Erwin_Schrödinger" }, "icon": "📖", "importance": 5
  },
  {
    "id": "person_dirac",
    "type": "person",
    "date": { "birth": "1902-08-08", "death": "1984-10-20" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "브리스틀", "en": "Bristol" }, "coordinates": { "lat": 51.45, "lng": -2.58 }, "region": "europe" },
    "title": { "ko": "폴 디랙", "en": "Paul Dirac" },
    "description": { "ko": "양자역학과 특수 상대성 이론을 결합한 디랙 방정식을 제안하여 반물질의 존재를 이론적으로 예언함.", "en": "Theoretical physicist who made fundamental contributions to the early development of both quantum mechanics and quantum electrodynamics." },
    "category": "thinker", "relatedEvents": ["event_antimatter"], "relatedPeople": ["person_schrodinger"], "relatedMedia": [], "wikipedia": { "ko": "폴_디랙", "en": "Paul_Dirac" }, "icon": "🧮", "importance": 4
  },
  {
    "id": "person_oppenheimer",
    "type": "person",
    "date": { "birth": "1904-04-22", "death": "1967-02-18" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "뉴욕", "en": "New York" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "J. 로버트 오펜하이머", "en": "J. Robert Oppenheimer" },
    "description": { "ko": "맨해튼 프로젝트의 로스앨러모스 연구소장을 맡아 최초의 원자폭탄 개발을 이끈 '원자폭탄의 아버지'.", "en": "American theoretical physicist who was the director of the Los Alamos Laboratory during World War II, often called the 'father of the atomic bomb'." },
    "category": "thinker", "relatedEvents": ["event_trinity_test"], "relatedPeople": ["person_albert_einstein", "person_fermi", "person_richard_feynman"], "relatedMedia": ["media_movie_oppenheimer"], "wikipedia": { "ko": "J._로버트_오펜하이머", "en": "J._Robert_Oppenheimer" }, "icon": "🔥", "importance": 5
  },
  {
    "id": "person_fermi",
    "type": "person",
    "date": { "birth": "1901-09-29", "death": "1954-11-28" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "로마", "en": "Rome" }, "coordinates": { "lat": 41.90, "lng": 12.49 }, "region": "europe" },
    "title": { "ko": "엔리코 페르미", "en": "Enrico Fermi" },
    "description": { "ko": "최초의 원자로인 시카고 파일-1을 건설하고 핵 제어 연쇄반응을 성공시킨 천재 물리학자.", "en": "Italian-American physicist and the creator of the world's first nuclear reactor, the Chicago Pile-1." },
    "category": "thinker", "relatedEvents": ["event_chicago_pile"], "relatedPeople": ["person_oppenheimer"], "relatedMedia": ["media_movie_oppenheimer"], "wikipedia": { "ko": "엔리코_페르미", "en": "Enrico_Fermi" }, "icon": "⚡", "importance": 5
  },
  {
    "id": "person_hubble",
    "type": "person",
    "date": { "birth": "1889-11-20", "death": "1953-09-28" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "미주리주", "en": "Marshfield, Missouri" }, "coordinates": { "lat": 37.33, "lng": -92.90 }, "region": "americas" },
    "title": { "ko": "에드윈 허블", "en": "Edwin Hubble" },
    "description": { "ko": "우주가 팽창하고 있음을 관측으로 증명(허블의 법칙)하여 인간의 우주 관을 영원히 바꿔놓은 천문학자.", "en": "American astronomer who played a crucial role in establishing the fields of extragalactic astronomy and observational cosmology." },
    "category": "thinker", "relatedEvents": ["event_hubble_law"], "relatedPeople": ["person_lemaitre", "person_albert_einstein"], "relatedMedia": [], "wikipedia": { "ko": "에드윈_허블", "en": "Edwin_Hubble" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "person_lemaitre",
    "type": "person",
    "date": { "birth": "1894-07-17", "death": "1966-06-20" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "샤를루아", "en": "Charleroi" }, "coordinates": { "lat": 50.41, "lng": 4.44 }, "region": "europe" },
    "title": { "ko": "조르주 르메트르", "en": "Georges Lemaître" },
    "description": { "ko": "팽창 우주론을 최초로 제안하고 우주의 기원을 하나의 원시 원자(빅뱅 이론)로 설명한 벨기에의 신부이자 천문학자.", "en": "Belgian Catholic priest and astronomer who first theorized that the universe is expanding, and formulated the Big Bang theory." },
    "category": "thinker", "relatedEvents": ["event_big_bang_theory"], "relatedPeople": ["person_hubble", "person_albert_einstein"], "relatedMedia": [], "wikipedia": { "ko": "조르주_르메트르", "en": "Georges_Lemaître" }, "icon": "💡", "importance": 4
  },
  {
    "id": "person_jonas_salk",
    "type": "person",
    "date": { "birth": "1914-10-28", "death": "1995-06-23" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "뉴욕", "en": "New York" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "조너스 소크", "en": "Jonas Salk" },
    "description": { "ko": "수많은 아이들에게 소아마비 공포를 끝낸 최초의 안전하고 효과적인 소아마비 백신 개발자.", "en": "American virologist and medical researcher who discovered and developed one of the first successful polio vaccines." },
    "category": "thinker", "relatedEvents": ["event_polio_vaccine"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "조너스_소크", "en": "Jonas_Salk" }, "icon": "⚕️", "importance": 4
  },
  {
    "id": "person_mcclintock",
    "type": "person",
    "date": { "birth": "1902-06-16", "death": "1992-09-02" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "하트퍼드", "en": "Hartford, Connecticut" }, "coordinates": { "lat": 41.76, "lng": -72.67 }, "region": "americas" },
    "title": { "ko": "바버라 매클린톡", "en": "Barbara McClintock" },
    "description": { "ko": "옥수수의 색상 변화를 연구하여 유전자가 한 곳에서 다른 곳으로 이동할 수 있다는 도약 유전자(트랜스포존)를 발견한 유전학자.", "en": "American scientist and cytogeneticist who was awarded the 1983 Nobel Prize in Physiology or Medicine for the discovery of genetic transposition." },
    "category": "thinker", "relatedEvents": ["event_transposon"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "바버라_매클린톡", "en": "Barbara_McClintock" }, "icon": "🌱", "importance": 4
  },
  {
    "id": "person_woese",
    "type": "person",
    "date": { "birth": "1928-07-15", "death": "2012-12-30" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "시러큐스", "en": "Syracuse, NY" }, "coordinates": { "lat": 43.04, "lng": -76.14 }, "region": "americas" },
    "title": { "ko": "칼 우즈", "en": "Carl Woese" },
    "description": { "ko": "리보솜 RNA 분석을 통해 지구 생물계를 진정세균, 고세균, 진핵생물이라는 3역으로 재분류한 미생물학자.", "en": "American microbiologist who defined the Archaea in 1977 by phylogenetic taxonomy of 16S ribosomal RNA, redesigning the tree of life." },
    "category": "thinker", "relatedEvents": ["event_archaea"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "칼_우즈", "en": "Carl_Woese" }, "icon": "🔬", "importance": 4
  },
  {
    "id": "person_von_neumann",
    "type": "person",
    "date": { "birth": "1903-12-28", "death": "1957-02-08" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "부다페스트", "en": "Budapest" }, "coordinates": { "lat": 47.49, "lng": 19.04 }, "region": "europe" },
    "title": { "ko": "존 폰 노이만", "en": "John von Neumann" },
    "description": { "ko": "수학, 컴퓨터 과학, 양자역학, 경제학(게임 이론) 전반에 걸쳐 천재성을 발휘한 20세기 최고의 과학자 중 한 명.", "en": "Hungarian-American mathematician, physicist, computer scientist, polymath. Designed the Von Neumann architecture for computers." },
    "category": "thinker", "relatedEvents": ["event_von_neumann_architecture"], "relatedPeople": ["person_oppenheimer", "person_alan_turing"], "relatedMedia": [], "wikipedia": { "ko": "존_폰_노이만", "en": "John_von_Neumann" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "person_shannon",
    "type": "person",
    "date": { "birth": "1916-04-30", "death": "2001-02-24" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "미시간주", "en": "Petoskey, Michigan" }, "coordinates": { "lat": 45.37, "lng": -84.95 }, "region": "americas" },
    "title": { "ko": "클로드 섀넌", "en": "Claude Shannon" },
    "description": { "ko": "디지털 회로 이론과 정보 이론의 창시자로 통신 및 컴퓨터 혁명의 근원적인 기반을 설계함.", "en": "American mathematician, electrical engineer, and cryptographer known as the 'father of information theory'." },
    "category": "thinker", "relatedEvents": ["event_information_theory"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "클로드_섀넌", "en": "Claude_Shannon" }, "icon": "💡", "importance": 5
  }
];

const newEvents = [
  {
    "id": "event_electron_discovery",
    "type": "event",
    "date": { "start": "1897-04-30", "end": "1897-04-30" },
    "era": "modern",
    "location": { "name": { "ko": "케임브리지 (캐번디시 연구소)", "en": "Cambridge" }, "coordinates": { "lat": 52.20, "lng": 0.11 }, "region": "europe" },
    "title": { "ko": "전자의 발견", "en": "Discovery of the Electron" },
    "description": { "ko": "J.J. 톰슨이 음극선 실험을 통해 원자보다 작은 질량을 가진 입자인 전자를 최초로 발견함.", "en": "J. J. Thomson discovered the electron through experiments with cathode ray tubes." },
    "category": "discovery", "relatedPeople": ["person_jj_thomson"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "전자", "en": "Electron" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "event_atomic_nucleus",
    "type": "event",
    "date": { "start": "1911-03-07", "end": "1911-03-07" }, // approximate presentation
    "era": "contemporary",
    "location": { "name": { "ko": "맨체스터", "en": "Manchester" }, "coordinates": { "lat": 53.48, "lng": -2.24 }, "region": "europe" },
    "title": { "ko": "원자핵의 발견 (알파 산란 실험)", "en": "Discovery of the Atomic Nucleus" },
    "description": { "ko": "어니스트 러더퍼드가 금박 알파 입자 산란 실험 결과를 바탕으로 원자의 질량이 뭉쳐있는 작은 중심, 원자핵의 존재를 알아냄.", "en": "Rutherford discovered the atomic nucleus following the Geiger–Marsden gold foil experiment." },
    "category": "discovery", "relatedPeople": ["person_rutherford"], "relatedEvents": ["event_electron_discovery"], "relatedMedia": [], "wikipedia": { "ko": "원자핵", "en": "Atomic_nucleus" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "event_bohr_model",
    "type": "event",
    "date": { "start": "1913-07-01", "end": "1913-07-01" }, // Published July
    "era": "contemporary",
    "location": { "name": { "ko": "코펜하겐", "en": "Copenhagen" }, "coordinates": { "lat": 55.67, "lng": 12.56 }, "region": "europe" },
    "title": { "ko": "보어의 원자 모형 발표", "en": "Bohr Model Proposed" },
    "description": { "ko": "닐스 보어가 전자가 정해진 궤도에서만 불연속적인 에너지를 가지며 회전한다는 양자역학적 원자 모형을 제시함.", "en": "Niels Bohr proposed the Bohr model of the atom, introducing quantum theory to atomic structure." },
    "category": "discovery", "relatedPeople": ["person_bohr"], "relatedEvents": ["event_atomic_nucleus"], "relatedMedia": [], "wikipedia": { "ko": "보어_모형", "en": "Bohr_model" }, "icon": "💡", "importance": 5
  },
  {
    "id": "event_uncertainty_principle",
    "type": "event",
    "date": { "start": "1927-03-23", "end": "1927-03-23" },
    "era": "contemporary",
    "location": { "name": { "ko": "코펜하겐", "en": "Copenhagen" }, "coordinates": { "lat": 55.67, "lng": 12.56 }, "region": "europe" },
    "title": { "ko": "불확정성 원리 발표", "en": "Uncertainty Principle Formulated" },
    "description": { "ko": "베르너 하이젠베르크가 입자의 위치와 운동량을 동시에 정확하게 측정할 수 없다는 양자역학의 핵심 원리를 발표함.", "en": "Werner Heisenberg stated the uncertainty principle, fundamentally changing quantum mechanics." },
    "category": "discovery", "relatedPeople": ["person_heisenberg"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "불확정성_원리", "en": "Uncertainty_principle" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "event_schrodinger_equation",
    "type": "event",
    "date": { "start": "1926-01-27", "end": "1926-01-27" },
    "era": "contemporary",
    "location": { "name": { "ko": "취리히", "en": "Zurich" }, "coordinates": { "lat": 47.37, "lng": 8.54 }, "region": "europe" },
    "title": { "ko": "슈뢰딩거 파동 방정식 제안", "en": "Schrödinger Equation Published" },
    "description": { "ko": "에르빈 슈뢰딩거가 전자의 상태를 입자가 아닌 확률적 '파동함수'로 표현한 파동 역학 방정식을 출판함.", "en": "Erwin Schrödinger published his paper detailing the Schrödinger equation, formulating wave mechanics." },
    "category": "publication", "relatedPeople": ["person_schrodinger"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "슈뢰딩거_방정식", "en": "Schrödinger_equation" }, "icon": "📖", "importance": 5
  },
  {
    "id": "event_antimatter",
    "type": "event",
    "date": { "start": "1932-08-02", "end": "1932-08-02" },
    "era": "contemporary",
    "location": { "name": { "ko": "패서디나 (Caltech)", "en": "Pasadena" }, "coordinates": { "lat": 34.14, "lng": -118.14 }, "region": "americas" },
    "title": { "ko": "최초의 반물질(양전자) 관측", "en": "Discovery of the Positron" },
    "description": { "ko": "칼 앤더슨이 우주선 관측을 통해 디랙의 방정식이 예언했던 양전자(반입자)를 실제로 발견함.", "en": "Carl David Anderson discovered the positron, confirming Paul Dirac's theoretical prediction of antimatter." },
    "category": "discovery", "relatedPeople": ["person_dirac"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "양전자", "en": "Positron" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "event_chicago_pile",
    "type": "event",
    "date": { "start": "1942-12-02", "end": "1942-12-02" },
    "era": "contemporary",
    "location": { "name": { "ko": "시카고", "en": "Chicago" }, "coordinates": { "lat": 41.87, "lng": -87.62 }, "region": "americas" },
    "title": { "ko": "최초의 핵 제어 연쇄반응 (시카고 파일-1)", "en": "First Controlled Nuclear Chain Reaction" },
    "description": { "ko": "엔리코 페르미와 그의 팀이 시카고 대학교 운동장 지하에서 세계 최초의 원자로를 가동하여 스스로 지속되는 핵 연쇄반응에 성공함.", "en": "Enrico Fermi's team achieved the first artificial self-sustaining nuclear chain reaction at Chicago Pile-1." },
    "category": "invention", "relatedPeople": ["person_fermi"], "relatedEvents": [], "relatedMedia": ["media_movie_oppenheimer"], "wikipedia": { "ko": "시카고_파일-1", "en": "Chicago_Pile-1" }, "icon": "🔥", "importance": 5
  },
  {
    "id": "event_trinity_test",
    "type": "event",
    "date": { "start": "1945-07-16", "end": "1945-07-16" },
    "era": "contemporary",
    "location": { "name": { "ko": "뉴멕시코 앨러머고도", "en": "Alamogordo" }, "coordinates": { "lat": 32.89, "lng": -105.96 }, "region": "americas" },
    "title": { "ko": "트리니티 핵실험 (맨해튼 프로젝트)", "en": "Trinity Nuclear Test" },
    "description": { "ko": "J. 로버트 오펜하이머가 주도한 맨해튼 프로젝트의 일환으로 인류 역사상 최초의 플루토늄 폭발식 핵무기 실험이 성공함.", "en": "The first detonation of a nuclear weapon, conducted by the United States Army as part of the Manhattan Project." },
    "category": "experiment", "relatedPeople": ["person_oppenheimer"], "relatedEvents": ["event_chicago_pile"], "relatedMedia": ["media_movie_oppenheimer"], "wikipedia": { "ko": "트리니티_(핵실험)", "en": "Trinity_(nuclear_test)" }, "icon": "🔥", "importance": 5
  },
  {
    "id": "event_hubble_law",
    "type": "event",
    "date": { "start": "1929-01-17", "end": "1929-01-17" },
    "era": "contemporary",
    "location": { "name": { "ko": "윌슨 산 천문대", "en": "Mount Wilson Observatory" }, "coordinates": { "lat": 34.22, "lng": -118.06 }, "region": "americas" },
    "title": { "ko": "허블-르메트르 법칙 발표", "en": "Publication of Hubble's Law" },
    "description": { "ko": "에드윈 허블이 은하의 후퇴 속도가 거리에 비례한다는 관측 사실을 발표하여 우주 팽창을 확정 증명함.", "en": "Edwin Hubble showed that the recessional velocity of a galaxy increases with its distance from the Earth, implying an expanding universe." },
    "category": "discovery", "relatedPeople": ["person_hubble"], "relatedEvents": ["event_big_bang_theory"], "relatedMedia": [], "wikipedia": { "ko": "허블의_법칙", "en": "Hubble's_law" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "event_big_bang_theory",
    "type": "event",
    "date": { "start": "1927-04-20", "end": "1927-04-20" },
    "era": "contemporary",
    "location": { "name": { "ko": "브뤼셀", "en": "Brussels" }, "coordinates": { "lat": 50.85, "lng": 4.35 }, "region": "europe" },
    "title": { "ko": "빅뱅 이론 최초 제안 (원시 원자 가설)", "en": "Proposal of the Big Bang Theory" },
    "description": { "ko": "천문학자이자 성직자 조르주 르메트르가 우주가 초기의 무한히 작은 상태에서 폭발적으로 팽창하기 시작했다는 빅뱅 이론을 제시함.", "en": "Georges Lemaître first noted that an expanding universe can be traced back in time to an originating single point, the 'Primeval Atom'." },
    "category": "discovery", "relatedPeople": ["person_lemaitre"], "relatedEvents": ["event_general_relativity"], "relatedMedia": [], "wikipedia": { "ko": "대폭발", "en": "Big_Bang" }, "icon": "💡", "importance": 5
  },
  {
    "id": "event_information_theory",
    "type": "event",
    "date": { "start": "1948-07-01", "end": "1948-07-01" },
    "era": "contemporary",
    "location": { "name": { "ko": "뉴저지 (벨 연구소)", "en": "Bell Labs, NJ" }, "coordinates": { "lat": 40.68, "lng": -74.39 }, "region": "americas" },
    "title": { "ko": "통신의 수학적 이론 발표 (정보 이론)", "en": "Mathematical Theory of Communication" },
    "description": { "ko": "클로드 섀넌이 정보의 양을 '비트(Bit)'로 정의하는 기념비적인 논문을 출판하여 디지털 정보 이론의 기반을 세움.", "en": "Claude Shannon published 'A Mathematical Theory of Communication', founding the field of information theory." },
    "category": "publication", "relatedPeople": ["person_shannon"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "정보_이론", "en": "Information_theory" }, "icon": "📖", "importance": 5
  },
  {
    "id": "event_von_neumann_architecture",
    "type": "event",
    "date": { "start": "1945-06-30", "end": "1945-06-30" },
    "era": "contemporary",
    "location": { "name": { "ko": "뉴저지 (어드밴스드 스터디)", "en": "Princeton" }, "coordinates": { "lat": 40.34, "lng": -74.65 }, "region": "americas" },
    "title": { "ko": "폰 노이만 구조 (EDVAC 보고서)", "en": "First Draft of a Report on the EDVAC" },
    "description": { "ko": "존 폰 노이만이 프로그램 내장 방식의 컴퓨터 구조(CPU, 메모리 분리)를 명시한 보고서를 발표하여 사실상 모든 현대 컴퓨터의 기반이 됨.", "en": "John von Neumann described a computer architecture with stored-program concept, which is used in almost all modern computers." },
    "category": "publication", "relatedPeople": ["person_von_neumann", "person_alan_turing"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "폰_노이만_구조", "en": "Von_Neumann_architecture" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "event_polio_vaccine",
    "type": "event",
    "date": { "start": "1955-04-12", "end": "1955-04-12" }, // successful trial announcement
    "era": "contemporary",
    "location": { "name": { "ko": "앤아버 (미시간 대)", "en": "Ann Arbor" }, "coordinates": { "lat": 42.28, "lng": -83.74 }, "region": "americas" },
    "title": { "ko": "소아마비 백신 성공 발표", "en": "Polio Vaccine Success" },
    "description": { "ko": "대규모 임상 시험을 거쳐 조너스 소크가 개발한 소아마비 백신의 안전성과 효과가 입증 및 공식 발표되어 환호성에 휩싸임.", "en": "Results of the polio vaccine trial showed the Salk vaccine to be 80-90% effective, a watershed moment in public health." },
    "category": "discovery", "relatedPeople": ["person_jonas_salk"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "소아마비_백신", "en": "Polio_vaccine" }, "icon": "⚕️", "importance": 5
  },
  {
    "id": "event_transposon",
    "type": "event",
    "date": { "start": "1950-01-01", "end": "1950-01-01" }, // Initial reports
    "era": "contemporary",
    "location": { "name": { "ko": "콜드스프링하버", "en": "Cold Spring Harbor" }, "coordinates": { "lat": 40.86, "lng": -73.47 }, "region": "americas" },
    "title": { "ko": "트랜스포존(도약 유전자) 발견", "en": "Discovery of Transposons" },
    "description": { "ko": "바버라 매클린톡이 옥수수의 유전 형질 분석을 통해 유전자가 체계 내에서 이동할 수 있다는 놀라운 사실을 발표함.", "en": "Barbara McClintock discovered transposable elements (jumping genes) that can change position within a genome." },
    "category": "discovery", "relatedPeople": ["person_mcclintock"], "relatedEvents": ["event_dna_structure"], "relatedMedia": [], "wikipedia": { "ko": "트랜스포존", "en": "Transposable_element" }, "icon": "🌱", "importance": 4
  },
  {
    "id": "event_archaea",
    "type": "event",
    "date": { "start": "1977-11-03", "end": "1977-11-03" },
    "era": "contemporary",
    "location": { "name": { "ko": "어배너 (일리노이 대)", "en": "Urbana, Illinois" }, "coordinates": { "lat": 40.11, "lng": -88.20 }, "region": "americas" },
    "title": { "ko": "고세균(Archaea) 발견 및 제3역 제안", "en": "Discovery of Archaea" },
    "description": { "ko": "칼 우즈와 조지 폭스가 리보솜 RNA 서열 분석이라는 혁신적인 방법을 통해 메탄 생성균이 기존 세균과 다른 완전히 새로운 계통군(고세균)임을 밝혀냄.", "en": "Carl Woese defined Archaea as a new domain of life, completely distinct from bacteria, based on ribosomal RNA phylogenetic analysis." },
    "category": "discovery", "relatedPeople": ["person_woese"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "고세균", "en": "Archaea" }, "icon": "🔬", "importance": 4
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
console.log('Batch 4 complete!');
