const fs = require('fs');
const path = require('path');

const peoplePath = path.join(__dirname, 'src', 'data', 'people.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newPeople = [
  {
    "id": "person_benjamin_franklin",
    "type": "person",
    "date": { "birth": "1706-01-17", "death": "1790-04-17" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "보스턴", "en": "Boston" }, "coordinates": { "lat": 42.36, "lng": -71.05 }, "region": "americas" },
    "title": { "ko": "벤저민 프랭클린", "en": "Benjamin Franklin" },
    "description": { "ko": "미국의 건국의 아버지이자 피뢰침을 발명하고 전기의 방전 이론을 정립한 다재다능한 과학자.", "en": "One of the Founding Fathers of the United States, polymath, inventor, scientist, known for his discoveries regarding electricity." },
    "category": "thinker", "relatedEvents": ["event_lightning_rod"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "벤저민_프랭클린", "en": "Benjamin_Franklin" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_lavoisier",
    "type": "person",
    "date": { "birth": "1743-08-26", "death": "1794-05-08" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "파리", "en": "Paris" }, "coordinates": { "lat": 48.85, "lng": 2.35 }, "region": "europe" },
    "title": { "ko": "앙투안 라부아지에", "en": "Antoine Lavoisier" },
    "description": { "ko": "근대 화학의 아버지. 질량 보존의 법칙을 확립하고 연소의 산소 이론을 세워 연금술의 잔재를 없앰.", "en": "French nobleman and chemist central to the 18th-century chemical revolution, widely considered the father of modern chemistry." },
    "category": "thinker", "relatedEvents": ["event_conservation_mass"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "앙투안_라부아지에", "en": "Antoine_Lavoisier" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "person_edward_jenner",
    "type": "person",
    "date": { "birth": "1749-05-17", "death": "1823-01-26" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "버클리", "en": "Berkeley" }, "coordinates": { "lat": 51.69, "lng": -2.45 }, "region": "europe" },
    "title": { "ko": "에드워드 제너", "en": "Edward Jenner" },
    "description": { "ko": "인류 최초로 천연두 백신(우두법)을 개발하여 수천만 명의 목숨을 구한 면역학의 아버지.", "en": "English physician and scientist who pioneered the concept of vaccines including creating the smallpox vaccine." },
    "category": "thinker", "relatedEvents": ["event_smallpox_vaccine"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "에드워드_제너", "en": "Edward_Jenner" }, "icon": "⚕️", "importance": 5
  },
  {
    "id": "person_john_dalton",
    "type": "person",
    "date": { "birth": "1766-09-06", "death": "1844-07-27" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "이글스필드", "en": "Eaglesfield" }, "coordinates": { "lat": 54.66, "lng": -3.37 }, "region": "europe" },
    "title": { "ko": "존 돌턴", "en": "John Dalton" },
    "description": { "ko": "모든 물질이 '원자'로 이루어져 있다는 현대 원자론을 최초로 제안한 화학자.", "en": "English chemist, physicist, and meteorologist best known for introducing the atomic theory into chemistry." },
    "category": "thinker", "relatedEvents": ["event_atomic_theory"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "존_돌턴", "en": "John_Dalton" }, "icon": "🧮", "importance": 4
  },
  {
    "id": "person_faraday",
    "type": "person",
    "date": { "birth": "1791-09-22", "death": "1867-08-25" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "뉴잉턴 버츠", "en": "Newington Butts" }, "coordinates": { "lat": 51.49, "lng": -0.10 }, "region": "europe" },
    "title": { "ko": "마이클 패러데이", "en": "Michael Faraday" },
    "description": { "ko": "전자기 유도 법칙을 발견하여 전기 시대의 막을 연 최고의 실험물리학자.", "en": "English scientist who contributed to the study of electromagnetism and electrochemistry." },
    "category": "thinker", "relatedEvents": ["event_electromagnetic_induction"], "relatedPeople": ["person_maxwell"], "relatedMedia": [], "wikipedia": { "ko": "마이클_패러데이", "en": "Michael_Faraday" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_babbage",
    "type": "person",
    "date": { "birth": "1791-12-26", "death": "1871-10-18" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "찰스 배비지", "en": "Charles Babbage" },
    "description": { "ko": "컴퓨터의 아버지. 최초의 기계식 범용 컴퓨터인 '해석기관'을 설계함.", "en": "English polymath, mathematician, philosopher, inventor and mechanical engineer who originated the concept of a digital programmable computer." },
    "category": "thinker", "relatedEvents": ["event_analytical_engine"], "relatedPeople": ["person_ada_lovelace"], "relatedMedia": [], "wikipedia": { "ko": "찰스_배비지", "en": "Charles_Babbage" }, "icon": "🧮", "importance": 4
  },
  {
    "id": "person_ada_lovelace",
    "type": "person",
    "date": { "birth": "1815-12-10", "death": "1852-11-27" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "에이다 러브레이스", "en": "Ada Lovelace" },
    "description": { "ko": "배비지의 해석기관 알고리즘을 최초로 구상한 인류 최초의 컴퓨터 프로그래머.", "en": "English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer." },
    "category": "thinker", "relatedEvents": ["event_analytical_engine"], "relatedPeople": ["person_babbage"], "relatedMedia": [], "wikipedia": { "ko": "에이다_러브레이스", "en": "Ada_Lovelace" }, "icon": "🧮", "importance": 4
  },
  {
    "id": "person_mendel",
    "type": "person",
    "date": { "birth": "1822-07-20", "death": "1884-01-06" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "하인첸도르프", "en": "Heinzendorf" }, "coordinates": { "lat": 49.62, "lng": 17.84 }, "region": "europe" },
    "title": { "ko": "그레고어 멘델", "en": "Gregor Mendel" },
    "description": { "ko": "완두콩 교배 실험을 통해 유전의 법칙(멘델의 법칙)을 발견한 유전학의 창시자.", "en": "Augustinian friar and scientist, posthumously recognized as the founder of the modern science of genetics." },
    "category": "thinker", "relatedEvents": ["event_mendelian_inheritance"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "그레고어_멘델", "en": "Gregor_Mendel" }, "icon": "🌱", "importance": 5
  },
  {
    "id": "person_maxwell",
    "type": "person",
    "date": { "birth": "1831-06-13", "death": "1879-11-05" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "에든버러", "en": "Edinburgh" }, "coordinates": { "lat": 55.95, "lng": -3.18 }, "region": "europe" },
    "title": { "ko": "제임스 클러크 맥스웰", "en": "James Clerk Maxwell" },
    "description": { "ko": "맥스웰 방정식을 통해 전기와 자기를 하나로 통합하는 전자기학의 기초를 완성한 물리학자.", "en": "Scottish scientist responsible for the classical theory of electromagnetic radiation, bringing together electricity, magnetism, and light." },
    "category": "thinker", "relatedEvents": ["event_maxwell_equations"], "relatedPeople": ["person_faraday"], "relatedMedia": [], "wikipedia": { "ko": "제임스_클러크_맥스웰", "en": "James_Clerk_Maxwell" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_pasteur",
    "type": "person",
    "date": { "birth": "1822-12-27", "death": "1895-09-28" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "돌", "en": "Dole" }, "coordinates": { "lat": 47.09, "lng": 5.49 }, "region": "europe" },
    "title": { "ko": "루이 파스퇴르", "en": "Louis Pasteur" },
    "description": { "ko": "광견병 백신을 개발하고 저온 살균법을 도입하여 현대 미생물학 및 면역학의 기초를 다짐.", "en": "French chemist and microbiologist renowned for his discoveries of the principles of vaccination, microbial fermentation and pasteurization." },
    "category": "thinker", "relatedEvents": ["event_pasteurization", "event_swan_neck"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "루이_파스퇴르", "en": "Louis_Pasteur" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "person_mendeleev",
    "type": "person",
    "date": { "birth": "1834-02-08", "death": "1907-02-02" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "토볼스크", "en": "Tobolsk" }, "coordinates": { "lat": 58.20, "lng": 68.25 }, "region": "europe" }, // Russia is mostly europe/asia, using europe
    "title": { "ko": "드미트리 멘델레예프", "en": "Dmitri Mendeleev" },
    "description": { "ko": "원소들의 규칙을 밝혀낸 원소 주기율표를 최초로 작성한 러시아의 화학자.", "en": "Russian chemist and inventor who formulated the Periodic Law and created a farsighted version of the periodic table of elements." },
    "category": "thinker", "relatedEvents": ["event_periodic_table"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "드미트리_멘델레예프", "en": "Dmitri_Mendeleev" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "person_koch",
    "type": "person",
    "date": { "birth": "1843-12-11", "death": "1910-05-27" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "클라우스탈", "en": "Clausthal" }, "coordinates": { "lat": 51.81, "lng": 10.33 }, "region": "europe" },
    "title": { "ko": "로베르트 코흐", "en": "Robert Koch" },
    "description": { "ko": "결핵균과 콜레라균을 발견하고 감염병의 병원균을 증명하는 코흐의 원칙을 세운 세균학의 창시자.", "en": "German physician and microbiologist, discovering the specific causative agents of deadly infectious diseases including tuberculosis, cholera, and anthrax." },
    "category": "thinker", "relatedEvents": ["event_tuberculosis"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "로베르트_코흐", "en": "Robert_Koch" }, "icon": "🔬", "importance": 4
  },
  {
    "id": "person_tesla",
    "type": "person",
    "date": { "birth": "1856-07-10", "death": "1943-01-07" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "스밀랸", "en": "Smiljan" }, "coordinates": { "lat": 44.56, "lng": 15.31 }, "region": "europe" },
    "title": { "ko": "니콜라 테슬라", "en": "Nikola Tesla" },
    "description": { "ko": "현대 교류(AC) 전력 시스템을 설계하고 눈부신 무선 통신 발명품을 남긴 천재적인 전기공학자.", "en": "Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current (AC) electricity supply system." },
    "category": "thinker", "relatedEvents": ["event_ac_motor"], "relatedPeople": ["person_edison"], "relatedMedia": [], "wikipedia": { "ko": "니콜라_테슬라", "en": "Nikola_Tesla" }, "icon": "⚡", "importance": 5
  },
  {
    "id": "person_planck",
    "type": "person",
    "date": { "birth": "1858-04-23", "death": "1947-10-04" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "킬", "en": "Kiel" }, "coordinates": { "lat": 54.32, "lng": 10.13 }, "region": "europe" },
    "title": { "ko": "막스 플랑크", "en": "Max Planck" },
    "description": { "ko": "에너지가 덩어리(양자)로 전달된다는 양자 가설을 발표하여 양자역학의 문을 연 물리학자.", "en": "German theoretical physicist whose discovery of energy quanta won him the Nobel Prize in Physics." },
    "category": "thinker", "relatedEvents": ["event_quantum_hypothesis"], "relatedPeople": ["person_albert_einstein"], "relatedMedia": [], "wikipedia": { "ko": "막스_플랑크", "en": "Max_Planck" }, "icon": "📖", "importance": 5
  },
  {
    "id": "person_edison",
    "type": "person",
    "date": { "birth": "1847-02-11", "death": "1931-10-18" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "밀란", "en": "Milan, Ohio" }, "coordinates": { "lat": 41.29, "lng": -82.60 }, "region": "americas" },
    "title": { "ko": "토머스 에디슨", "en": "Thomas Edison" },
    "description": { "ko": "백열전구, 축음기 등 셀 수 없는 발명을 통해 현대 밤의 풍경을 바꾼 미국의 위대한 발명가.", "en": "American inventor and businessman who has been described as America's greatest inventor." },
    "category": "thinker", "relatedEvents": ["event_incandescent_bulb"], "relatedPeople": ["person_tesla"], "relatedMedia": [], "wikipedia": { "ko": "토머스_에디슨", "en": "Thomas_Edison" }, "icon": "💡", "importance": 5
  }
];

const newEvents = [
  {
    "id": "event_lightning_rod",
    "type": "event",
    "date": { "start": "1752-06-15", "end": "1752-06-15" }, // approximate
    "era": "modern",
    "location": { "name": { "ko": "필라델피아", "en": "Philadelphia" }, "coordinates": { "lat": 39.95, "lng": -75.16 }, "region": "americas" },
    "title": { "ko": "프랭클린 연날리기 실험 / 피뢰침 발명", "en": "Franklin's Kite Experiment" },
    "description": { "ko": "번개가 전기의 일종이라는 것을 증명하기 위해 연을 띄웠고, 이를 응용해 피뢰침을 발명함.", "en": "Benjamin Franklin conducted his kite experiment drawing electricity from lightning, leading to the invention of the lightning rod." },
    "category": "invention", "relatedPeople": ["person_benjamin_franklin"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "벤저민_프랭클린#연_실험", "en": "Kite_experiment" }, "icon": "⚡", "importance": 4
  },
  {
    "id": "event_conservation_mass",
    "type": "event",
    "date": { "start": "1789-01-01", "end": "1789-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "파리", "en": "Paris" }, "coordinates": { "lat": 48.85, "lng": 2.35 }, "region": "europe" },
    "title": { "ko": "질량 보존의 법칙 및 현대 화학의 시작", "en": "Law of Conservation of Mass" },
    "description": { "ko": "앙투안 라부아지에가 화학 반응 전후 질량이 보존됨을 밝히는 «화학 원론»을 출판함.", "en": "Lavoisier published the foundational law of chemistry stating that mass is conserved in a chemical reaction." },
    "category": "discovery", "relatedPeople": ["person_lavoisier"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "질량_보존의_법칙", "en": "Conservation_of_mass" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "event_smallpox_vaccine",
    "type": "event",
    "date": { "start": "1796-05-14", "end": "1796-05-14" },
    "era": "modern",
    "location": { "name": { "ko": "버클리", "en": "Berkeley" }, "coordinates": { "lat": 51.69, "lng": -2.45 }, "region": "europe" },
    "title": { "ko": "천연두 백신(종두법) 최초 접종", "en": "First Smallpox Vaccine" },
    "description": { "ko": "에드워드 제너가 8살 소년에게 최초로 우두 백신을 접종하여 예방 면역학의 시대를 엶.", "en": "Edward Jenner successfully inoculated a young boy against smallpox using cowpox material." },
    "category": "discovery", "relatedPeople": ["person_edward_jenner"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "종두", "en": "Smallpox_vaccine" }, "icon": "⚕️", "importance": 5
  },
  {
    "id": "event_atomic_theory",
    "type": "event",
    "date": { "start": "1803-10-21", "end": "1803-10-21" },
    "era": "modern",
    "location": { "name": { "ko": "맨체스터", "en": "Manchester" }, "coordinates": { "lat": 53.48, "lng": -2.24 }, "region": "europe" },
    "title": { "ko": "돌턴의 원자설 발표", "en": "Dalton's Atomic Theory" },
    "description": { "ko": "존 돌턴이 물질이 더 이상 쪼개지지 않는 원자로 구성되어 있다는 근대적 원자설을 제안함.", "en": "John Dalton proposed that all matter was composed of atoms, indivisible and indestructible building blocks." },
    "category": "discovery", "relatedPeople": ["person_john_dalton"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "원자_이론", "en": "Atomic_theory" }, "icon": "💡", "importance": 5
  },
  {
    "id": "event_electromagnetic_induction",
    "type": "event",
    "date": { "start": "1831-08-29", "end": "1831-08-29" },
    "era": "modern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "전자기 유도 현상 발견", "en": "Electromagnetic Induction" },
    "description": { "ko": "마이클 패러데이가 자석의 운동이 전기를 만들어낼 수 있다는 전자기 유도 현상을 증명. 발전기 원리의 바탕.", "en": "Michael Faraday discovered electromagnetic induction, the operating principle of electric generators." },
    "category": "discovery", "relatedPeople": ["person_faraday"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "전자기_유도", "en": "Electromagnetic_induction" }, "icon": "⚡", "importance": 5
  },
  {
    "id": "event_analytical_engine",
    "type": "event",
    "date": { "start": "1837-01-01", "end": "1837-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "해석기관 설계안 제시", "en": "Analytical Engine Proposed" },
    "description": { "ko": "찰스 배비지가 현대식 컴퓨터의 기본 구조(산술장치, 제어흐름, 기억장치)를 모두 포함한 기계식 계산기 설계도를 작성함.", "en": "Charles Babbage proposed the Analytical Engine, the first design for a modern general-purpose computer." },
    "category": "invention", "relatedPeople": ["person_babbage", "person_ada_lovelace"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "해석기관", "en": "Analytical_Engine" }, "icon": "🧮", "importance": 4
  },
  {
    "id": "event_mendelian_inheritance",
    "type": "event",
    "date": { "start": "1865-02-08", "end": "1865-02-08" },
    "era": "modern",
    "location": { "name": { "ko": "브르노", "en": "Brno" }, "coordinates": { "lat": 49.19, "lng": 16.60 }, "region": "europe" },
    "title": { "ko": "멘델의 유전 법칙 발표", "en": "Mendelian Inheritance" },
    "description": { "ko": "그레고어 멘델이 완두콩 교배 실험을 통해 유전 형질이 어떻게 다음 세대로 전달되는지 법칙형태로 발표함.", "en": "Gregor Mendel presented his work on 'Experiments on Plant Hybridization', founding Mendelian genetics." },
    "category": "discovery", "relatedPeople": ["person_mendel"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "멘델의_유전법칙", "en": "Mendelian_inheritance" }, "icon": "🌱", "importance": 5
  },
  {
    "id": "event_maxwell_equations",
    "type": "event",
    "date": { "start": "1865-01-01", "end": "1865-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "맥스웰 방정식 출판", "en": "Maxwell's Equations" },
    "description": { "ko": "제임스 클러크 맥스웰이 전자기학의 기초가 되는 4개의 방정식을 통해 빛도 전자기파임을 증명함.", "en": "Maxwell published 'A Dynamical Theory of the Electromagnetic Field', unifying electromagnetism." },
    "category": "publication", "relatedPeople": ["person_maxwell"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "맥스웰_방정식", "en": "Maxwell's_equations" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "event_swan_neck",
    "type": "event",
    "date": { "start": "1862-01-01", "end": "1862-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "파리", "en": "Paris" }, "coordinates": { "lat": 48.85, "lng": 2.35 }, "region": "europe" },
    "title": { "ko": "자연발생설 완전 논파 (백조목 플라스크)", "en": "Refutation of Spontaneous Generation" },
    "description": { "ko": "루이 파스퇴르가 백조목 플라스크 실험을 통해 공기 중의 미생물 없이 생명이 스스로 발생하지 않음을 증명.", "en": "Louis Pasteur refuted spontaneous generation definitively with his swan-neck flask experiments." },
    "category": "discovery", "relatedPeople": ["person_pasteur"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "자연발생설", "en": "Spontaneous_generation" }, "icon": "🔬", "importance": 4
  },
  {
    "id": "event_pasteurization",
    "type": "event",
    "date": { "start": "1864-01-01", "end": "1864-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "아르부아", "en": "Arbois" }, "coordinates": { "lat": 46.90, "lng": 5.77 }, "region": "europe" },
    "title": { "ko": "저온 살균법 발명", "en": "Invention of Pasteurization" },
    "description": { "ko": "파스퇴르가 와인과 우유가 부패하는 것을 막기 위해 미생물을 열로 억제하는 저온 살균법을 개발함.", "en": "Pasteur patented the process of pasteurization for preserving food and beverages." },
    "category": "invention", "relatedPeople": ["person_pasteur"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "저온_살균법", "en": "Pasteurization" }, "icon": "💡", "importance": 4
  },
  {
    "id": "event_periodic_table",
    "type": "event",
    "date": { "start": "1869-03-06", "end": "1869-03-06" },
    "era": "modern",
    "location": { "name": { "ko": "상트페테르부르크", "en": "St. Petersburg" }, "coordinates": { "lat": 59.93, "lng": 30.33 }, "region": "europe" },
    "title": { "ko": "원소 주기율표 창안", "en": "Creation of Periodic Table" },
    "description": { "ko": "드미트리 멘델레예프가 당시 알려진 원소들을 화학적 특성에 따라 배열한 최초의 주기율표를 러시아 화학회에 제시함.", "en": "Dmitri Mendeleev presented the first recognizable periodic table to the Russian Chemical Society." },
    "category": "discovery", "relatedPeople": ["person_mendeleev"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "주기율표", "en": "Periodic_table" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "event_tuberculosis",
    "type": "event",
    "date": { "start": "1882-03-24", "end": "1882-03-24" },
    "era": "modern",
    "location": { "name": { "ko": "베를린", "en": "Berlin" }, "coordinates": { "lat": 52.52, "lng": 13.40 }, "region": "europe" },
    "title": { "ko": "결핵균 발견", "en": "Discovery of Tuberculosis Bacillus" },
    "description": { "ko": "로베르트 코흐가 당대 최고 치사율의 질병이던 결핵의 원인균을 분리하고 증명하여 전 세계적 파장을 일으킴.", "en": "Robert Koch announced the discovery of Mycobacterium tuberculosis, the bacteria that cause tuberculosis." },
    "category": "discovery", "relatedPeople": ["person_koch"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "결핵", "en": "History_of_tuberculosis" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "event_ac_motor",
    "type": "event",
    "date": { "start": "1887-01-01", "end": "1887-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "뉴욕", "en": "New York" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "교류(AC) 유도 모터 개발", "en": "Development of AC Motor" },
    "description": { "ko": "니콜라 테슬라가 교류 전력을 이용한 유도 모터를 개발하였고, 장거리 송전에 유리한 AC 시스템이 사실상 전력의 표준이 됨.", "en": "Nikola Tesla developed the first practical alternating current (AC) motor." },
    "category": "invention", "relatedPeople": ["person_tesla"], "relatedEvents": ["event_incandescent_bulb"], "relatedMedia": [], "wikipedia": { "ko": "유도전동기", "en": "Induction_motor" }, "icon": "⚡", "importance": 5
  },
  {
    "id": "event_quantum_hypothesis",
    "type": "event",
    "date": { "start": "1900-12-14", "end": "1900-12-14" },
    "era": "modern",
    "location": { "name": { "ko": "베를린", "en": "Berlin" }, "coordinates": { "lat": 52.52, "lng": 13.40 }, "region": "europe" },
    "title": { "ko": "양자 가설 발표", "en": "Planck's Quantum Hypothesis" },
    "description": { "ko": "막스 플랑크가 흑체 복사 문제를 해결하기 위해 에너지가 연속적이지 않고 불연속적인 덩어리(양자)로 방출된다는 가설을 제출. 양자역학의 태동.", "en": "Max Planck formulated his quantum theory explaining black-body radiation, marking the birth of quantum mechanics." },
    "category": "discovery", "relatedPeople": ["person_planck"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "플랑크_법칙", "en": "Planck's_law" }, "icon": "💡", "importance": 5
  },
  {
    "id": "event_incandescent_bulb",
    "type": "event",
    "date": { "start": "1879-10-22", "end": "1879-10-22" },
    "era": "modern",
    "location": { "name": { "ko": "멘로파크", "en": "Menlo Park" }, "coordinates": { "lat": 40.56, "lng": -74.34 }, "region": "americas" },
    "title": { "ko": "실용적 백열전구 발명", "en": "Invention of Incandescent Light Bulb" },
    "description": { "ko": "토머스 에디슨이 탄소 필라멘트를 이용한 성공적인 백열전구를 발명, 상용화에 성공하여 인류를 어둠에서 해방시킴.", "en": "Thomas Edison completed a successful 13.5-hour test of a carbon-filament incandescent light bulb." },
    "category": "invention", "relatedPeople": ["person_edison"], "relatedEvents": ["event_ac_motor"], "relatedMedia": [], "wikipedia": { "ko": "백열전구", "en": "Incandescent_light_bulb" }, "icon": "💡", "importance": 5
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
console.log('Batch 3 complete!');
