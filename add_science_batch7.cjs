const fs = require('fs');
const path = require('path');

const peoplePath = path.join(__dirname, 'src', 'data', 'people.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newPeople = [
  {
    "id": "person_leeuwenhoek",
    "type": "person",
    "date": { "birth": "1632-10-24", "death": "1723-08-26" },
    "era": "premodern",
    "birthPlace": { "name": { "ko": "델프트", "en": "Delft" }, "coordinates": { "lat": 52.01, "lng": 4.35 }, "region": "europe" },
    "title": { "ko": "안토니 판 레이우엔훅", "en": "Antonie van Leeuwenhoek" },
    "description": { "ko": "직접 렌즈를 연마하여 단일 렌즈 현미경을 만들고, 미생물을 인류 최초로 관찰하여 미생물학의 아버지가 된 네덜란드의 직물 상인.", "en": "Dutch tradesman and scientist. Commonly known as the Father of Microbiology, he discovered bacteria and protists." },
    "category": "thinker", "relatedEvents": ["event_first_microbe"], "relatedPeople": ["person_robert_hooke"], "relatedMedia": [], "wikipedia": { "ko": "안토니_판_레이우엔훅", "en": "Antonie_van_Leeuwenhoek" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "person_robert_hooke",
    "type": "person",
    "date": { "birth": "1635-07-28", "death": "1703-03-03" },
    "era": "premodern",
    "birthPlace": { "name": { "ko": "아일오브와이트", "en": "Isle of Wight" }, "coordinates": { "lat": 50.69, "lng": -1.30 }, "region": "europe" },
    "title": { "ko": "로버트 훅", "en": "Robert Hooke" },
    "description": { "ko": "복합 현미경으로 코르크 단면을 관찰하여 벌집 모양의 작은 방을 '세포(cell)'라 최초로 명명하고 용수철 법칙을 연구한 영국의 만물박사.", "en": "English polymath. He coined the term 'cell' and discovered the law of elasticity known as Hooke's law." },
    "category": "thinker", "relatedEvents": ["event_micrographia"], "relatedPeople": ["person_leeuwenhoek", "person_isaac_newton"], "relatedMedia": [], "wikipedia": { "ko": "로버트_훅", "en": "Robert_Hooke" }, "icon": "🔬", "importance": 4
  },
  {
    "id": "person_vesalius",
    "type": "person",
    "date": { "birth": "1514-12-31", "death": "1564-10-15" },
    "era": "premodern",
    "birthPlace": { "name": { "ko": "브뤼셀", "en": "Brussels" }, "coordinates": { "lat": 50.85, "lng": 4.35 }, "region": "europe" },
    "title": { "ko": "안드레아스 베살리우스", "en": "Andreas Vesalius" },
    "description": { "ko": "인체를 직접 해부하여 천여 년간 진리로 믿어지던 갈레노스의 해부학 오류를 바로잡고 근대 인체 해부학의 기초를 닦은 의학자.", "en": "16th-century anatomist, physician, and author of one of the most influential books on human anatomy, 'De humani corporis fabrica'." },
    "category": "thinker", "relatedEvents": ["event_fabric_of_human", "event_scientific_revolution_start"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "안드레아스_베살리우스", "en": "Andreas_Vesalius" }, "icon": "🦴", "importance": 5
  },
  {
    "id": "person_william_harvey",
    "type": "person",
    "date": { "birth": "1578-04-01", "death": "1657-06-03" },
    "era": "premodern",
    "birthPlace": { "name": { "ko": "포크스턴", "en": "Folkestone" }, "coordinates": { "lat": 51.08, "lng": 1.18 }, "region": "europe" },
    "title": { "ko": "윌리엄 하비", "en": "William Harvey" },
    "description": { "ko": "동물의 심장 박동과 혈관을 치밀하게 분석하여 인체 내 혈액이 심장을 중심으로 온몸을 순환한다는 '혈액 순환론'을 증명한 영국의 의사.", "en": "English physician who made seminal contributions in anatomy and physiology. He was the first to describe completely the systemic circulation of blood." },
    "category": "thinker", "relatedEvents": ["event_blood_circulation"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "윌리엄_하비", "en": "William_Harvey" }, "icon": "❤️", "importance": 5
  },
  {
    "id": "person_nightingale",
    "type": "person",
    "date": { "birth": "1820-05-12", "death": "1910-08-13" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "피렌체", "en": "Florence" }, "coordinates": { "lat": 43.76, "lng": 11.25 }, "region": "europe" },
    "title": { "ko": "플로렌스 나이팅게일", "en": "Florence Nightingale" },
    "description": { "ko": "크림 전쟁에서 야전 병원의 위생을 개선하고 감염 사망률을 극적으로 낮추었으며, 통계 데이터 시각화를 통해 장미 도표를 고안한 백의의 천사.", "en": "English social reformer and statistician, and the founder of modern nursing." },
    "category": "thinker", "relatedEvents": ["event_rose_diagram"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "플로렌스_나이팅게일", "en": "Florence_Nightingale" }, "icon": "⚕️", "importance": 5
  },
  {
    "id": "person_alexander_fleming",
    "type": "person",
    "date": { "birth": "1881-08-06", "death": "1955-03-11" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "로크필드", "en": "Lochfield" }, "coordinates": { "lat": 55.60, "lng": -4.68 }, "region": "europe" },
    "title": { "ko": "알렉산더 플레밍", "en": "Alexander Fleming" },
    "description": { "ko": "우연히 날아든 푸른곰팡이 주변에서 세균이 자라지 못하는 현상을 관찰하여, 기적의 항생제 '페니실린'을 최초로 발견한 세균학자.", "en": "Scottish physician and microbiologist, best known for discovering the world's first broadly effective antibiotic substance, which he named penicillin." },
    "category": "thinker", "relatedEvents": ["event_penicillin"], "relatedPeople": ["person_howard_florey"], "relatedMedia": [], "wikipedia": { "ko": "알렉산더_플레밍", "en": "Alexander_Fleming" }, "icon": "💊", "importance": 5
  },
  {
    "id": "person_edward_jenner",
    "type": "person",
    "date": { "birth": "1749-05-17", "death": "1823-01-26" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "버클리", "en": "Berkeley, Gloucestershire" }, "coordinates": { "lat": 51.69, "lng": -2.45 }, "region": "europe" },
    "title": { "ko": "에드워드 제너", "en": "Edward Jenner" },
    "description": { "ko": "소젖 짜는 여성은 천연두에 걸리지 않는다는 사실에 착안하여 우두를 접종하는 종두법(백신)을 창시하여, 감염병 예방의 신기원을 이룩함.", "en": "English physician and scientist who pioneered the concept of vaccines including creating the smallpox vaccine, the world's first vaccine." },
    "category": "thinker", "relatedEvents": ["event_vaccine"], "relatedPeople": ["person_louis_pasteur"], "relatedMedia": [], "wikipedia": { "ko": "에드워드_제너", "en": "Edward_Jenner" }, "icon": "💉", "importance": 5
  },
  {
    "id": "person_jonas_salk",
    "type": "person",
    "date": { "birth": "1914-10-28", "death": "1995-06-23" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "뉴욕", "en": "New York City" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "조너스 소크", "en": "Jonas Salk" },
    "description": { "ko": "인류를 공포에 떨게 한 소아마비를 정복하기 위해 안전하고 효과적인 소아마비 백신을 최초로 개발하고, 인류를 위해 특허를 주장하지 않은 성자.", "en": "American virologist and medical researcher who discovered and developed one of the first successful polio vaccines." },
    "category": "thinker", "relatedEvents": ["event_polio_vaccine"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "조너스_소크", "en": "Jonas_Salk" }, "icon": "💉", "importance": 5
  },
  {
    "id": "person_karl_landsteiner",
    "type": "person",
    "date": { "birth": "1868-06-14", "death": "1943-06-26" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "빈", "en": "Vienna" }, "coordinates": { "lat": 48.20, "lng": 16.37 }, "region": "europe" },
    "title": { "ko": "카를 란트슈타이너", "en": "Karl Landsteiner" },
    "description": { "ko": "인간의 혈액형에 A형, B형, C형(이후 O형)이 존재함을 최초로 발견하여 안전한 수혈을 가능하게 만든 오스트리아의 병리학자.", "en": "Austrian biologist, physician, and immunologist. He distinguished the main blood groups in 1900." },
    "category": "thinker", "relatedEvents": ["event_blood_groups"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "카를_란트슈타이너", "en": "Karl_Landsteiner" }, "icon": "🩸", "importance": 5
  },
  {
    "id": "person_paul_ehrlich",
    "type": "person",
    "date": { "birth": "1854-03-14", "death": "1915-08-20" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "슈첼린", "en": "Strzelin" }, "coordinates": { "lat": 50.78, "lng": 17.06 }, "region": "europe" },
    "title": { "ko": "파울 에를리히", "en": "Paul Ehrlich" },
    "description": { "ko": "인체에는 무해하면서 병원균만을 골라 투입해 죽이는 '마법의 탄환' 개념을 구상, 매독 치료제 살바르산 606호를 개발하여 화학 요법의 시대를 염.", "en": "German Jewish physician and scientist who worked in the fields of hematology, immunology, and antimicrobial chemotherapy." },
    "category": "thinker", "relatedEvents": ["event_salvarsan"], "relatedPeople": ["person_robert_koch"], "relatedMedia": [], "wikipedia": { "ko": "파울_에를리히", "en": "Paul_Ehrlich" }, "icon": "💊", "importance": 4
  },
  {
    "id": "person_john_snow",
    "type": "person",
    "date": { "birth": "1813-03-15", "death": "1858-06-16" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "요크", "en": "York" }, "coordinates": { "lat": 53.95, "lng": -1.08 }, "region": "europe" },
    "title": { "ko": "존 스노", "en": "John Snow" },
    "description": { "ko": "1854년 런던 콜레라 대유행 당시 사망자 지도를 그려 오염된 펌프를 차단함으로써 역학이라는 새로운 학문을 개척한 의사.", "en": "English physician and a leader in the development of anesthesia and medical hygiene. Considered one of the founders of modern epidemiology." },
    "category": "thinker", "relatedEvents": ["event_ghost_map"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "존_스노_(의사)", "en": "John_Snow" }, "icon": "🗺️", "importance": 5
  },
  {
    "id": "person_semmelweis",
    "type": "person",
    "date": { "birth": "1818-07-01", "death": "1865-08-13" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "부더", "en": "Buda (Budapest)" }, "coordinates": { "lat": 47.49, "lng": 19.04 }, "region": "europe" },
    "title": { "ko": "이그나츠 제멜바이스", "en": "Ignaz Semmelweis" },
    "description": { "ko": "의사의 오염된 손이 임산부에게 산욕열을 옮긴다는 사실을 밝혀내고 염소 소독 손 씻기를 강력히 옹호한 방역의 선구자 (하지만 생전에는 철저히 배척받음).", "en": "Hungarian physician and scientist, known as an early pioneer of antiseptic procedures. Urged hand-washing to prevent puerperal fever." },
    "category": "thinker", "relatedEvents": ["event_hand_washing"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "이그나츠_제멜바이스", "en": "Ignaz_Semmelweis" }, "icon": "🧼", "importance": 4
  },
  {
    "id": "person_luis_alvarez",
    "type": "person",
    "date": { "birth": "1911-06-13", "death": "1988-09-01" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "샌프란시스코", "en": "San Francisco" }, "coordinates": { "lat": 37.77, "lng": -122.41 }, "region": "americas" },
    "title": { "ko": "루이스 앨버레즈", "en": "Luis Alvarez" },
    "description": { "ko": "입자 물리학으로 노벨상을 수상하고 아들 월터와 함께 백악기-제3기 경계층의 이리듐을 관측하여 공룡이 운석 충돌로 멸종했다는 가설을 증명한 천재 물리학자.", "en": "American experimental physicist, inventor, and professor who was awarded the Nobel Prize in Physics; proposed the asteroid impact theory of dinosaur extinction." },
    "category": "thinker", "relatedEvents": ["event_kt_extinction"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "루이스_앨버레즈", "en": "Luis_Walter_Alvarez" }, "icon": "☄️", "importance": 4
  },
  {
    "id": "person_maryam_mirzakhani",
    "type": "person",
    "date": { "birth": "1977-05-12", "death": "2017-07-14" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "테헤란", "en": "Tehran" }, "coordinates": { "lat": 35.68, "lng": 51.38 }, "region": "asia" },
    "title": { "ko": "마리암 미르자하니", "en": "Maryam Mirzakhani" },
    "description": { "ko": "복잡한 곡선의 기하학과 동역학에 관한 독창적인 연구로 수학계 노벨상이라 불리는 필즈상을 여성 최초로 수상한 이란 출신의 천재 수학자.", "en": "Iranian mathematician and a professor of mathematics at Stanford University. She was the first woman to win the Fields Medal." },
    "category": "thinker", "relatedEvents": ["event_fields_medal_female"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "마리암_미르자하니", "en": "Maryam_Mirzakhani" }, "icon": "📐", "importance": 4
  },
  {
    "id": "person_shinya_yamanaka",
    "type": "person",
    "date": { "birth": "1962-09-04", "death": null },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "히가시오사카", "en": "Higashiosaka" }, "coordinates": { "lat": 34.66, "lng": 135.60 }, "region": "asia" },
    "title": { "ko": "야마나카 신야", "en": "Shinya Yamanaka" },
    "description": { "ko": "성숙한 체세포를 조작하여 모든 조직으로 분화할 수 있는 유도 만능 줄기세포(iPS 세포)로 시간을 거스르게 만든 일본의 생물학자(노벨상 수상).", "en": "Japanese stem cell researcher and a Nobel Prize laureate who discovered induced pluripotent stem cells (iPS cells)." },
    "category": "thinker", "relatedEvents": ["event_ips_cells"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "야마나카_신야", "en": "Shinya_Yamanaka" }, "icon": "🧬", "importance": 5
  }
];

const newEvents = [
  {
    "id": "event_first_microbe",
    "type": "event",
    "date": { "start": "1674-01-01", "end": "1674-01-01" }, // approx reported
    "era": "premodern",
    "location": { "name": { "ko": "델프트", "en": "Delft" }, "coordinates": { "lat": 52.01, "lng": 4.35 }, "region": "europe" },
    "title": { "ko": "미생물의 최초 관찰", "en": "First Observation of Microorganisms" },
    "description": { "ko": "안토니 판 레이우엔훅이 성능 좋은 단일 렌즈 현미경으로 호숫물을 치여다보고 눈에 보이지 않는 수많은 극미동물들을 세상에 처음 보고함.", "en": "Antonie van Leeuwenhoek provides the first description of bacteria and other microorganisms." },
    "category": "discovery", "relatedPeople": ["person_leeuwenhoek"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "현미경", "en": "Microorganism#Discovery" }, "icon": "🦠", "importance": 5
  },
  {
    "id": "event_micrographia",
    "type": "event",
    "date": { "start": "1665-01-01", "end": "1665-01-01" },
    "era": "premodern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "«마이크로그라피아» 출판 ('세포' 명명)", "en": "Publication of Micrographia" },
    "description": { "ko": "로버트 훅이 다양한 곤충과 식물의 접사 관찰화를 실은 책을 발간. 코르크의 단면을 보며 '세포(Cell)'라는 용어를 사상 최초로 사용함.", "en": "Robert Hooke published Micrographia, coining the term 'cell' for the basic unit of life." },
    "category": "publication", "relatedPeople": ["person_robert_hooke"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "마이크로그라피아", "en": "Micrographia" }, "icon": "📖", "importance": 4
  },
  {
    "id": "event_fabric_of_human",
    "type": "event",
    "date": { "start": "1543-01-01", "end": "1543-01-01" },
    "era": "premodern",
    "location": { "name": { "ko": "바젤", "en": "Basel" }, "coordinates": { "lat": 47.55, "lng": 7.59 }, "region": "europe" },
    "title": { "ko": "«인체의 구조에 관하여» 출간", "en": "De humani corporis fabrica Published" },
    "description": { "ko": "안드레아스 베살리우스가 갈레노스의 잘못된 동물 해부 지식을 비판하고 실제 인체 해부를 바탕으로 한 현대 해부학의 기념비를 세움. 다수의 서적과 같은 해 발행.", "en": "Andreas Vesalius published his foundational work on human anatomy, changing medicine forever." },
    "category": "publication", "relatedPeople": ["person_vesalius"], "relatedEvents": ["event_scientific_revolution_start"], "relatedMedia": [], "wikipedia": { "ko": "데_휴마니_코포리스_파스리카", "en": "De_humani_corporis_fabrica" }, "icon": "🦴", "importance": 5
  },
  {
    "id": "event_blood_circulation",
    "type": "event",
    "date": { "start": "1628-01-01", "end": "1628-01-01" },
    "era": "premodern",
    "location": { "name": { "ko": "프랑크푸르트", "en": "Frankfurt" }, "coordinates": { "lat": 50.11, "lng": 8.68 }, "region": "europe" }, // published in Frankfurt
    "title": { "ko": "혈액 순환론 발표", "en": "De Motu Cordis Published" },
    "description": { "ko": "윌리엄 하비가 동물의 심장과 피의 움직임을 해부 실험하여 혈액은 간에서 지속적으로 만들어지는 것이 아니라 밀폐된 관을 통해 전신을 순환한다는 것을 명백히 밝힘.", "en": "William Harvey published De Motu Cordis, describing the systemic circulation of blood pumped to the brain and body by the heart." },
    "category": "publication", "relatedPeople": ["person_william_harvey"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "동물의_심장과_혈액의_운동에_관한_해부학적_연구", "en": "Exercitatio_Anatomica_de_Motu_Cordis_et_Sanguinis_in_Animalibus" }, "icon": "❤️", "importance": 5
  },
  {
    "id": "event_rose_diagram",
    "type": "event",
    "date": { "start": "1858-01-01", "end": "1858-01-01" }, // Published notes on matters...
    "era": "modern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "사망률 통계 분석 (장미 도표) 발표", "en": "Publication of Coxcomb Diagram" },
    "description": { "ko": "플로렌스 나이팅게일이 크림 전쟁 중 영국 군인의 폐사 원인을 조사하여, 전투 부상보다 감염 예방 미흡으로 더 많이 죽었음을 한눈에 알 수 있는 장미 도표(극좌표 그래프)를 발표.", "en": "Florence Nightingale created the 'Coxcomb' diagram to show causes of mortality in the army, pioneering data visualization." },
    "category": "publication", "relatedPeople": ["person_nightingale"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "플로렌스_나이팅게일#통계학과_위생", "en": "Florence_Nightingale#Statistics_and_sanitary_reform" }, "icon": "📊", "importance": 5
  },
  {
    "id": "event_penicillin",
    "type": "event",
    "date": { "start": "1928-09-28", "end": "1928-09-28" },
    "era": "modern",
    "location": { "name": { "ko": "오기스트 역 (런던)", "en": "London (St Mary's Hospital)" }, "coordinates": { "lat": 51.51, "lng": -0.17 }, "region": "europe" },
    "title": { "ko": "페니실린의 기적적인 발견", "en": "Discovery of Penicillin" },
    "description": { "ko": "알렉산더 플레밍이 실수로 열어둔 포도상구균 배양 접시에 핀 푸른곰팡이가 세균의 증식을 억제하는 것을 발견하며 세계 최초의 항생제 페니실린을 발명.", "en": "Alexander Fleming serendipitously discovered penicillin from a mold that contaminated his Petri dishes." },
    "category": "discovery", "relatedPeople": ["person_alexander_fleming"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "페니실린", "en": "Penicillin" }, "icon": "💊", "importance": 5
  },
  {
    "id": "event_vaccine",
    "type": "event",
    "date": { "start": "1796-05-14", "end": "1796-05-14" },
    "era": "modern",
    "location": { "name": { "ko": "버클리", "en": "Berkeley, Gloucestershire" }, "coordinates": { "lat": 51.69, "lng": -2.45 }, "region": "europe" },
    "title": { "ko": "천연두 백신(종두법) 발명", "en": "Invention of the Smallpox Vaccine" },
    "description": { "ko": "에드워드 제너가 우두고름을 8세 소년 제임스 핍스에게 접종한 뒤 천연두 병원균을 투여, 소년이 병에 걸리지 않는 것을 증명하여 면역학의 새 장을 염.", "en": "Edward Jenner tested his hypothesis that infection with cowpox could protect a person from smallpox infection." },
    "category": "experiment", "relatedPeople": ["person_edward_jenner"], "relatedEvents": ["event_polio_vaccine"], "relatedMedia": [], "wikipedia": { "ko": "종두법", "en": "Smallpox_vaccine" }, "icon": "💉", "importance": 5
  },
  {
    "id": "event_polio_vaccine",
    "type": "event",
    "date": { "start": "1955-04-12", "end": "1955-04-12" }, // Announcement
    "era": "contemporary",
    "location": { "name": { "ko": "앤아버", "en": "Ann Arbor, MI" }, "coordinates": { "lat": 42.28, "lng": -83.74 }, "region": "americas" },
    "title": { "ko": "소아마비 백신 개발 성공 발표", "en": "Polio Vaccine Success Announced" },
    "description": { "ko": "수많은 아이들을 죽음과 마비로 내몰던 공포의 소아마비를 막아낼 조너스 소크의 사백신 개발 완료와 안전성이 언론에 발표되어 전국이 환호함. 소크는 '태양에 특허를 낼 수 있는가?'라며 특허권을 포기함.", "en": "The results of the Salk polio vaccine trial were announced, showing the vaccine was safe and effective." },
    "category": "discovery", "relatedPeople": ["person_jonas_salk"], "relatedEvents": ["event_vaccine"], "relatedMedia": [], "wikipedia": { "ko": "소아마비_백신", "en": "Polio_vaccine" }, "icon": "💉", "importance": 5
  },
  {
    "id": "event_blood_groups",
    "type": "event",
    "date": { "start": "1900-01-01", "end": "1901-01-01" }, // Discovered in 1900, published in 1901
    "era": "modern",
    "location": { "name": { "ko": "빈", "en": "Vienna" }, "coordinates": { "lat": 48.20, "lng": 16.37 }, "region": "europe" },
    "title": { "ko": "ABO식 혈액형 발견", "en": "Discovery of ABO Blood Groups" },
    "description": { "ko": "카를 란트슈타이너가 혈액 응집 반응이 무작위가 아니라 A, B, C(후의 O) 세 가지 유형의 상호작용 때문이라는 사실을 밝혀, 치명적인 수혈 부작용을 원천 차단함.", "en": "Karl Landsteiner discovered the ABO blood group system, paving the way for safe blood transfusions." },
    "category": "discovery", "relatedPeople": ["person_karl_landsteiner"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "ABO_혈액형", "en": "ABO_blood_group_system" }, "icon": "🩸", "importance": 5
  },
  {
    "id": "event_salvarsan",
    "type": "event",
    "date": { "start": "1909-08-31", "end": "1909-08-31" },
    "era": "modern",
    "location": { "name": { "ko": "프랑크푸르트", "en": "Frankfurt" }, "coordinates": { "lat": 50.11, "lng": 8.68 }, "region": "europe" },
    "title": { "ko": "살바르산(606호)의 합성 (마법의 탄환)", "en": "Discovery of Salvarsan" },
    "description": { "ko": "파울 에를리히 팀이 수백 번의 실패 끝에 매독균만을 정확히 조준하여 폭격하는 치료제인 화합물 606호를 발견하여 항균 화학요법의 여명을 밝힘.", "en": "Paul Ehrlich and Sahachiro Hata discovered Salvarsan (compound 606), the first effective treatment for syphilis." },
    "category": "discovery", "relatedPeople": ["person_paul_ehrlich"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "파울_에를리히#주요_업적", "en": "Arsphenamine" }, "icon": "💊", "importance": 5
  },
  {
    "id": "event_ghost_map",
    "type": "event",
    "date": { "start": "1854-09-07", "end": "1854-09-07" }, // Handle removed
    "era": "modern",
    "location": { "name": { "ko": "런던 (브로드 스트리트)", "en": "London (Broad Street)" }, "coordinates": { "lat": 51.51, "lng": -0.13 }, "region": "europe" },
    "title": { "ko": "런던 콜레라 역학 조사", "en": "Broad Street Cholera Outbreak" },
    "description": { "ko": "의사 존 스노가 콜레라의 대유행 원인이 '나쁜 공기(장기설)'가 아니며 오염된 식수임을 증명한 소호 지역 사망 지도를 그려 펌프 손잡이를 제거함.", "en": "Dr. John Snow traced the source of a cholera outbreak to a contaminated public water pump in Soho, establishing modern epidemiology." },
    "category": "discovery", "relatedPeople": ["person_john_snow"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "존_스노_(의사)", "en": "1854_Broad_Street_cholera_outbreak" }, "icon": "🗺️", "importance": 5
  },
  {
    "id": "event_hand_washing",
    "type": "event",
    "date": { "start": "1847-05-15", "end": "1847-05-15" }, // Implemented policy
    "era": "modern",
    "location": { "name": { "ko": "빈 (오스트리아)", "en": "Vienna" }, "coordinates": { "lat": 48.20, "lng": 16.37 }, "region": "europe" },
    "title": { "ko": "산욕열 감염 예방을 위한 손 씻기 도입", "en": "Implementation of Hand-washing" },
    "description": { "ko": "이그나츠 제멜바이스가 분만실에서 의사가 시체 해부 후 손을 염소액으로 소독하도록 강제하여 임산부 사망률을 드라마틱하게 낮추었으나, 당시 주류 의학계로부터 멸시를 당함.", "en": "Ignaz Semmelweis introduced mandatory hand washing with chlorinated lime solutions for doctors, dramatically reducing puerperal fever mortality." },
    "category": "experiment", "relatedPeople": ["person_semmelweis"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "산욕열", "en": "Ignaz_Semmelweis" }, "icon": "🧼", "importance": 4
  },
  {
    "id": "event_kt_extinction",
    "type": "event",
    "date": { "start": "1980-06-06", "end": "1980-06-06" }, // Date published in Science
    "era": "contemporary",
    "location": { "name": { "ko": "미국 (버클리)", "en": "Berkeley, CA" }, "coordinates": { "lat": 37.87, "lng": -122.25 }, "region": "americas" },
    "title": { "ko": "백악기 대멸종 운석 충돌 가설 발표", "en": "Alvarez Hypothesis Proposed" },
    "description": { "ko": "앨버레즈 부자가 이탈리아 구비오의 K-Pg 경계층 점토에서 비정상적으로 높은 농도의 이리듐을 발견하고 6500만 년 전 칙술루브 소행성 충돌이 공룡을 쓸어버렸다고 주장.", "en": "Luis and Walter Alvarez published their claim that a large asteroid impact caused the Cretaceous-Paleogene extinction." },
    "category": "discovery", "relatedPeople": ["person_luis_alvarez"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "K-Pg_멸종", "en": "Alvarez_hypothesis" }, "icon": "☄️", "importance": 5
  },
  {
    "id": "event_fields_medal_female",
    "type": "event",
    "date": { "start": "2014-08-13", "end": "2014-08-13" },
    "era": "contemporary",
    "location": { "name": { "ko": "서울", "en": "Seoul" }, "coordinates": { "lat": 37.56, "lng": 126.97 }, "region": "korea" }, // ICM 2014 held in Seoul
    "title": { "ko": "여성 최초 필즈상 수상 (마리암 미르자하니)", "en": "First Woman Awarded the Fields Medal" },
    "description": { "ko": "서울에서 열린 세계수학자대회(ICM)에서 마리암 미르자하니가 기하학과 동역학 분야의 뛰어난 성과를 인정받아 여성 수학자로서 역사상 처음으로 필즈상을 거머쥠.", "en": "Maryam Mirzakhani became the first woman to win the Fields Medal at the ICM in Seoul." },
    "category": "experiment", "relatedPeople": ["person_maryam_mirzakhani"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "마리암_미르자하니", "en": "Fields_Medal" }, "icon": "📐", "importance": 4
  },
  {
    "id": "event_ips_cells",
    "type": "event",
    "date": { "start": "2006-08-25", "end": "2006-08-25" }, // published in Cell
    "era": "contemporary",
    "location": { "name": { "ko": "교토", "en": "Kyoto" }, "coordinates": { "lat": 35.01, "lng": 135.76 }, "region": "asia" },
    "title": { "ko": "유도 만능 줄기세포(iPS 세포) 확립", "en": "Creation of iPS Cells" },
    "description": { "ko": "야마나카 신야가 분화가 끝난 쥐의 체세포에 단 4개의 특정 유전자(야마나카 인자)를 주입해, 배아줄기세포처럼 어떤 세포로든 분화가 가능한 iPS 세포를 만들어냄.", "en": "Shinya Yamanaka's team published the generation of induced pluripotent stem cells from adult mouse fibroblasts." },
    "category": "discovery", "relatedPeople": ["person_shinya_yamanaka"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "유도만능줄기세포", "en": "Induced_pluripotent_stem_cell" }, "icon": "🧬", "importance": 5
  },
  {
    "id": "event_human_genome",
    "type": "event",
    "date": { "start": "2003-04-14", "end": "2003-04-14" },
    "era": "contemporary",
    "location": { "name": { "ko": "국제 공동 기구", "en": "International Consortium" }, "coordinates": { "lat": 0, "lng": 0 }, "region": "etc" },
    "title": { "ko": "인간 게놈 프로젝트(HGP) 완성 선언", "en": "Human Genome Project Completed" },
    "description": { "ko": "DNA의 이중 나선이 밝혀지고 50주년이 되는 해, 인간 게놈(약 30억 쌍의 염기 서열)의 99%를 해독하여 인류 영생 비밀의 첫 페이지를 공식적으로 선언함.", "en": "The International Human Genome Sequencing Consortium announced the successful completion of the Human Genome Project." },
    "category": "experiment", "relatedPeople": [], "relatedEvents": ["event_dna_structure"], "relatedMedia": [], "wikipedia": { "ko": "인간_게놈_프로젝트", "en": "Human_Genome_Project" }, "icon": "🧬", "importance": 5
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
console.log('Batch 7 (Final) complete! Check totals.');
