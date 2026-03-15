const fs = require('fs');
const path = require('path');

const peoplePath = path.join(__dirname, 'src', 'data', 'people.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newPeople = [
  {
    "id": "person_alfred_wegener",
    "type": "person",
    "date": { "birth": "1880-11-01", "death": "1930-11-02" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "베를린", "en": "Berlin" }, "coordinates": { "lat": 52.52, "lng": 13.40 }, "region": "europe" },
    "title": { "ko": "알프레트 베게너", "en": "Alfred Wegener" },
    "description": { "ko": "대륙 이동설을 제창하여 현대 판구조론의 기초 모델을 세운 독일의 기상학자이자 지구물리학자.", "en": "German polar researcher, geophysicist and meteorologist, primarily known for his theory of continental drift." },
    "category": "thinker", "relatedEvents": ["event_continental_drift"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "알프레트_베게너", "en": "Alfred_Wegener" }, "icon": "🌍", "importance": 5
  },
  {
    "id": "person_mary_anning",
    "type": "person",
    "date": { "birth": "1799-05-21", "death": "1847-03-09" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "라임레지스", "en": "Lyme Regis" }, "coordinates": { "lat": 50.72, "lng": -2.93 }, "region": "europe" },
    "title": { "ko": "메리 애닝", "en": "Mary Anning" },
    "description": { "ko": "세계 최초로 이크티오사우루스와 플레시오사우루스의 화석을 발견하여 쥐라기 해양 생태계를 세상에 알린 독보적인 고생물학자.", "en": "English fossil collector, dealer, and palaeontologist who became known around the world for important discoveries in Jurassic marine fossil beds." },
    "category": "thinker", "relatedEvents": ["event_ichthyosaur_discovery"], "relatedPeople": [], "relatedMedia": ["media_movie_ammonite"], "wikipedia": { "ko": "메리_애닝", "en": "Mary_Anning" }, "icon": "🦖", "importance": 4
  },
  {
    "id": "person_rachel_carson",
    "type": "person",
    "date": { "birth": "1907-05-27", "death": "1964-04-14" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "스프링데일", "en": "Springdale, PA" }, "coordinates": { "lat": 40.54, "lng": -79.78 }, "region": "americas" },
    "title": { "ko": "레이첼 카슨", "en": "Rachel Carson" },
    "description": { "ko": "DDT 등 화학 살충제의 위험성을 경고한 명저 '침묵의 봄'을 통해 현대 환경 운동을 촉발시킨 해양 생물학자.", "en": "American marine biologist, author, and conservationist whose book Silent Spring is credited with advancing the global environmental movement." },
    "category": "thinker", "relatedEvents": ["event_silent_spring"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "레이첼_카슨", "en": "Rachel_Carson" }, "icon": "🌱", "importance": 5
  },
  {
    "id": "person_linus_pauling",
    "type": "person",
    "date": { "birth": "1901-02-28", "death": "1994-08-19" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "포틀랜드", "en": "Portland, Oregon" }, "coordinates": { "lat": 45.52, "lng": -122.67 }, "region": "americas" },
    "title": { "ko": "라이너스 폴링", "en": "Linus Pauling" },
    "description": { "ko": "화학 결합의 본질을 밝혀내어 양자 화학을 확립하고, 단백질 구조 연구와 평화 운동으로 단독 노벨상을 두 번이나 수상한 전설적 화학자.", "en": "American chemist, biochemist, peace activist, author, educator. Published The Nature of the Chemical Bond." },
    "category": "thinker", "relatedEvents": ["event_chemical_bond"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "라이너스_폴링", "en": "Linus_Pauling" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "person_fritz_haber",
    "type": "person",
    "date": { "birth": "1868-12-09", "death": "1934-01-29" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "브레슬라우", "en": "Breslau" }, "coordinates": { "lat": 51.10, "lng": 17.03 }, "region": "europe" },
    "title": { "ko": "프리츠 하버", "en": "Fritz Haber" },
    "description": { "ko": "공기 중의 질소로 암모니아를 합성하여 화학 비료를 만들어 인류를 기아에서 구한 동시에 양면적인 독가스를 개발한 화학자.", "en": "German chemist who received the Nobel Prize in Chemistry for his invention of the Haber-Bosch process." },
    "category": "thinker", "relatedEvents": ["event_haber_process"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "프리츠_하버", "en": "Fritz_Haber" }, "icon": "⚖️", "importance": 4
  },
  {
    "id": "person_dorothy_hodgkin",
    "type": "person",
    "date": { "birth": "1910-05-12", "death": "1994-07-29" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "카이로", "en": "Cairo" }, "coordinates": { "lat": 30.04, "lng": 31.23 }, "region": "africa" },
    "title": { "ko": "도로시 호지킨", "en": "Dorothy Hodgkin" },
    "description": { "ko": "X선 결정학을 발전시켜 페니실린, 비타민 B12, 인슐린 등의 3차원 분자 구조를 밝혀낸 위대한 화학자.", "en": "British chemist who developed protein crystallography, won the Nobel Prize for discovering the structure of Vitamin B12 and Penicillin." },
    "category": "thinker", "relatedEvents": ["event_b12_structure"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "도로시_크로풋_호지킨", "en": "Dorothy_Hodgkin" }, "icon": "🔬", "importance": 4
  },
  {
    "id": "person_humboldt",
    "type": "person",
    "date": { "birth": "1769-09-14", "death": "1859-05-06" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "베를린", "en": "Berlin" }, "coordinates": { "lat": 52.52, "lng": 13.40 }, "region": "europe" },
    "title": { "ko": "알렉산더 폰 훔볼트", "en": "Alexander von Humboldt" },
    "description": { "ko": "지구상의 모든 자연현상이 서로 연결되어 있다는 총체적인 훔볼트 자연관을 정립한 근대 지리학과 생물지리학의 1인자.", "en": "Prussian polymath, geographer, naturalist, explorer, and influential proponent of Romantic philosophy and science." },
    "category": "thinker", "relatedEvents": ["event_cosmos_humboldt"], "relatedPeople": ["person_charles_darwin"], "relatedMedia": [], "wikipedia": { "ko": "알렉산더_폰_훔볼트", "en": "Alexander_von_Humboldt" }, "icon": "🌍", "importance": 5
  },
  {
    "id": "person_cuvier",
    "type": "person",
    "date": { "birth": "1769-08-23", "death": "1832-05-13" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "몽벨리아르", "en": "Montbéliard" }, "coordinates": { "lat": 47.50, "lng": 6.79 }, "region": "europe" },
    "title": { "ko": "조르주 퀴비에", "en": "Georges Cuvier" },
    "description": { "ko": "화석 연구를 통해 멸종의 개념을 과학적으로 입증하고 고생물학과 비교 해부학을 창시한 프랑스의 생물학자.", "en": "French naturalist and zoologist, sometimes referred to as the 'founding father of paleontology'." },
    "category": "thinker", "relatedEvents": ["event_comparative_anatomy"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "조르주_퀴비에", "en": "Georges_Cuvier" }, "icon": "🦴", "importance": 4
  },
  {
    "id": "person_lyell",
    "type": "person",
    "date": { "birth": "1797-11-14", "death": "1875-02-22" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "키나데이", "en": "Kinnordy" }, "coordinates": { "lat": 56.68, "lng": -3.00 }, "region": "europe" },
    "title": { "ko": "찰스 라이엘", "en": "Charles Lyell" },
    "description": { "ko": "과거 지구에서 발생한 일은 현재 관찰되는 지질학적 힘과 동일하다는 '동일과정설'을 대중화시킨 지질학자. 다윈에게 큰 영향을 줌.", "en": "Scottish geologist who demonstrated the power of known natural causes in explaining Earth's history (uniformitarianism)." },
    "category": "thinker", "relatedEvents": ["event_principles_geology"], "relatedPeople": ["person_charles_darwin", "person_hutton"], "relatedMedia": [], "wikipedia": { "ko": "찰스_라이엘", "en": "Charles_Lyell" }, "icon": "🌍", "importance": 4
  },
  {
    "id": "person_hutton",
    "type": "person",
    "date": { "birth": "1726-06-03", "death": "1797-03-26" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "에든버러", "en": "Edinburgh" }, "coordinates": { "lat": 55.95, "lng": -3.18 }, "region": "europe" },
    "title": { "ko": "제임스 허턴", "en": "James Hutton" },
    "description": { "ko": "현대 지질학의 아버지. 지구의 깊은 시간을 인식하고 지각의 형성과 변형 과정의 기초를 세운 스코틀랜드의 과학자.", "en": "Scottish geologist, physician, chemical manufacturer, naturalist, and experimental agriculturalist. Often referred to as the Father of Modern Geology." },
    "category": "thinker", "relatedEvents": ["event_theory_of_earth"], "relatedPeople": ["person_lyell"], "relatedMedia": [], "wikipedia": { "ko": "제임스_허턴", "en": "James_Hutton" }, "icon": "🌍", "importance": 4
  },
  {
    "id": "person_yalow",
    "type": "person",
    "date": { "birth": "1921-07-19", "death": "2011-08-09" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "뉴욕", "en": "New York" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "로잘린 얠로", "en": "Rosalyn Yalow" },
    "description": { "ko": "피 속에 극히 미량으로 존재하는 호르몬(인슐린 등)을 측정할 수 있는 방사성면역측정법(RIA)을 개발하여 노벨 생리의학상을 수상한 의학 물리학자.", "en": "American medical physicist, and a co-winner of the 1977 Nobel Prize in Physiology or Medicine for development of the radioimmunoassay (RIA) technique." },
    "category": "thinker", "relatedEvents": ["event_ria"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "로잘린_서스먼_얠로", "en": "Rosalyn_Sussman_Yalow" }, "icon": "⚕️", "importance": 4
  },
  {
    "id": "person_tu_youyou",
    "type": "person",
    "date": { "birth": "1930-12-30", "death": null },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "닝보", "en": "Ningbo" }, "coordinates": { "lat": 29.86, "lng": 121.54 }, "region": "asia" },
    "title": { "ko": "투유유", "en": "Tu Youyou" },
    "description": { "ko": "중국 전통 의학 서적을 영감으로 항말라리아 약효 성분인 아르테미시닌을 추출, 개발하여 말라리아로 사망하는 수백만 명을 구한 약학자.", "en": "Chinese pharmaceutical chemist who discovered artemisinin and dihydroartemisinin, used to treat malaria." },
    "category": "thinker", "relatedEvents": ["event_artemisinin"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "투유유", "en": "Tu_Youyou" }, "icon": "🌿", "importance": 4
  },
  {
    "id": "person_wu",
    "type": "person",
    "date": { "birth": "1912-05-31", "death": "1997-02-16" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "타이창", "en": "Taicang" }, "coordinates": { "lat": 31.45, "lng": 121.10 }, "region": "asia" },
    "title": { "ko": "우첸슝 (치엔쉬엉 우)", "en": "Chien-Shiung Wu" },
    "description": { "ko": "놀라운 정확도의 우 실험(Wu experiment)을 통해 자연계의 약력에서 '패리티 비보존 법칙'이 성립함을 증명한 세계 최고의 실험물리학자.", "en": "Chinese-American experimental physicist who made significant contributions in the field of nuclear physics, known for the Wu experiment." },
    "category": "thinker", "relatedEvents": ["event_parity_violation"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "우첸슝", "en": "Chien-Shiung_Wu" }, "icon": "🔬", "importance": 4
  },
  {
    "id": "person_meitner",
    "type": "person",
    "date": { "birth": "1878-11-07", "death": "1968-10-27" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "빈", "en": "Vienna" }, "coordinates": { "lat": 48.20, "lng": 16.37 }, "region": "europe" },
    "title": { "ko": "리제 마이트너", "en": "Lise Meitner" },
    "description": { "ko": "우라늄에 중성자를 충돌시켜 원자핵이 쪼개지는 현상을 인류 최초로 이론적으로 규명하고 '핵분열'이라 명명한 물리학자.", "en": "Austrian-Swedish physicist who was one of those responsible for the discovery of the element protactinium and nuclear fission." },
    "category": "thinker", "relatedEvents": ["event_nuclear_fission"], "relatedPeople": ["person_oppenheimer", "person_albert_einstein"], "relatedMedia": [], "wikipedia": { "ko": "리제_마이트너", "en": "Lise_Meitner" }, "icon": "🔥", "importance": 5
  },
  {
    "id": "person_jane_goodall",
    "type": "person",
    "date": { "birth": "1934-04-03", "death": null },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "제인 구달", "en": "Jane Goodall" },
    "description": { "ko": "탄자니아의 곰베 숲에서 침팬지 무리에 동화되어 야생 침팬지의 도구 사용을 세계 최초로 발견하여 인간의 본질에 대한 질문을 던진 영장류 학자.", "en": "English primatologist and anthropologist, considered the world's foremost expert on chimpanzees." },
    "category": "thinker", "relatedEvents": ["event_chimp_tools"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "제인_구달", "en": "Jane_Goodall" }, "icon": "🐒", "importance": 4
  }
];

const newEvents = [
  {
    "id": "event_continental_drift",
    "type": "event",
    "date": { "start": "1912-01-06", "end": "1912-01-06" }, // presentation in Frankfurt
    "era": "contemporary",
    "location": { "name": { "ko": "프랑크푸르트", "en": "Frankfurt" }, "coordinates": { "lat": 50.11, "lng": 8.68 }, "region": "europe" },
    "title": { "ko": "대륙 이동설 제안", "en": "Proposal of Continental Drift" },
    "description": { "ko": "알프레트 베게너가 과거 하나로 뭉쳐있던 판게아 대륙이 쪼개지고 서서히 벌어져 현재의 지도가 되었다는 대륙 이동설을 발표함.", "en": "Alfred Wegener proposed the scientific theory that continents act like giant puzzles and drift over time." },
    "category": "discovery", "relatedPeople": ["person_alfred_wegener"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "대륙_이동설", "en": "Continental_drift" }, "icon": "🌍", "importance": 5
  },
  {
    "id": "event_ichthyosaur_discovery",
    "type": "event",
    "date": { "start": "1811-01-01", "end": "1811-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "쥐라기 해안 (영국)", "en": "Jurassic Coast" }, "coordinates": { "lat": 50.72, "lng": -2.93 }, "region": "europe" },
    "title": { "ko": "최초의 이크티오사우루스 화석 발견", "en": "Discovery of the First Ichthyosaur" },
    "description": { "ko": "당시 겨우 12살이던 메리 애닝이 발굴한 완벽한 쥐라기 화석으로 인해 인류의 고생물학과 생물 멸종에 관한 인식이 완전히 뒤바뀜.", "en": "Mary Anning discovered the first complete Ichthyosaur skeleton, changing paleontology." },
    "category": "discovery", "relatedPeople": ["person_mary_anning"], "relatedEvents": [], "relatedMedia": ["media_movie_ammonite"], "wikipedia": { "ko": "어룡", "en": "Ichthyosaur" }, "icon": "🦖", "importance": 4
  },
  {
    "id": "event_silent_spring",
    "type": "event",
    "date": { "start": "1962-09-27", "end": "1962-09-27" },
    "era": "contemporary",
    "location": { "name": { "ko": "뉴욕", "en": "New York" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "«침묵의 봄» 출판", "en": "Publication of Silent Spring" },
    "description": { "ko": "레이첼 카슨이 DDT 같은 무분별한 화학 농약이 생태계를 파괴함을 고발하여 서구 사회에 큰 충격을 줌. 글로벌 환경 운동의 바이블.", "en": "Rachel Carson published 'Silent Spring', bringing environmental concerns to the American public." },
    "category": "publication", "relatedPeople": ["person_rachel_carson"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "침묵의_봄", "en": "Silent_Spring" }, "icon": "📖", "importance": 5
  },
  {
    "id": "event_chemical_bond",
    "type": "event",
    "date": { "start": "1939-01-01", "end": "1939-01-01" },
    "era": "contemporary",
    "location": { "name": { "ko": "이타카 (코넬 출판부)", "en": "Ithaca" }, "coordinates": { "lat": 42.44, "lng": -76.50 }, "region": "americas" },
    "title": { "ko": "«화학 결합의 본성» 출판", "en": "The Nature of the Chemical Bond" },
    "description": { "ko": "라이너스 폴링이 양자 역학을 이용해 분자와 화합물이 결합하는 원리를 체계화한 화학 분야의 최고의 명저를 출판.", "en": "Linus Pauling published his defining work which became one of the most influential chemistry books ever." },
    "category": "publication", "relatedPeople": ["person_linus_pauling"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "라이너스_폴링#주요_업적", "en": "The_Nature_of_the_Chemical_Bond" }, "icon": "📖", "importance": 5
  },
  {
    "id": "event_haber_process",
    "type": "event",
    "date": { "start": "1909-07-02", "end": "1909-07-02" },
    "era": "modern",
    "location": { "name": { "ko": "카를스루에", "en": "Karlsruhe" }, "coordinates": { "lat": 49.00, "lng": 8.40 }, "region": "europe" },
    "title": { "ko": "하버-보슈법 성공 (암모니아 합성)", "en": "Haber-Bosch Process" },
    "description": { "ko": "프리츠 하버가 공기 중의 질소에서 직접 암모니아를 합성하는 공정을 만들어내어 식량 위기를 막고 인구 폭발을 주도함.", "en": "Fritz Haber successfully demonstrated a process to synthesize ammonia from nitrogen and hydrogen gases." },
    "category": "invention", "relatedPeople": ["person_fritz_haber"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "하버법", "en": "Haber_process" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "event_b12_structure",
    "type": "event",
    "date": { "start": "1955-08-01", "end": "1955-08-01" }, // roughly structure published
    "era": "contemporary",
    "location": { "name": { "ko": "옥스퍼드", "en": "Oxford" }, "coordinates": { "lat": 51.75, "lng": -1.25 }, "region": "europe" },
    "title": { "ko": "비타민 B12의 3차원 구조 규명", "en": "Structure of Vitamin B12" },
    "description": { "ko": "도로시 호지킨이 복잡하고 무거운 비타민 B12의 분자 구조를 X선 회절 결정학만으로 완전하게 풀어내어 의학계를 놀라게 함.", "en": "Dorothy Hodgkin solved the exceptionally complex crystal structure of vitamin B12." },
    "category": "discovery", "relatedPeople": ["person_dorothy_hodgkin"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "비타민_B12", "en": "Vitamin_B12" }, "icon": "🔬", "importance": 4
  },
  {
    "id": "event_cosmos_humboldt",
    "type": "event",
    "date": { "start": "1845-01-01", "end": "1862-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "베를린", "en": "Berlin" }, "coordinates": { "lat": 52.52, "lng": 13.40 }, "region": "europe" },
    "title": { "ko": "«코스모스»(훔볼트) 출판", "en": "Publication of Kosmos" },
    "description": { "ko": "훔볼트가 우주, 지구, 자연 그리고 식생 등 지구상의 모든 현상들이 촘촘히 연결되어 있다는 자연 생태관계를 집대성하여 출판함.", "en": "Alexander von Humboldt published Kosmos, an influential treatise on science and nature." },
    "category": "publication", "relatedPeople": ["person_humboldt"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "알렉산더_폰_훔볼트#주요_저서", "en": "Kosmos_(Humboldt)" }, "icon": "📖", "importance": 4
  },
  {
    "id": "event_comparative_anatomy",
    "type": "event",
    "date": { "start": "1817-01-01", "end": "1817-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "파리", "en": "Paris" }, "coordinates": { "lat": 48.85, "lng": 2.35 }, "region": "europe" },
    "title": { "ko": "«동물의 왕국» (비교 해부학의 완성)", "en": "Le Règne Animal" },
    "description": { "ko": "조르주 퀴비에가 화석 동물과 현생 동물의 해부학적 구조를 비교 분석하여 멸종이라는 새로운 개념을 과학적으로 입증함.", "en": "Georges Cuvier published his definitive work 'Le Règne Animal', establishing paleontology." },
    "category": "publication", "relatedPeople": ["person_cuvier"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "조르주_퀴비에#비교_해부학과_고생물학", "en": "Le_Règne_Animal" }, "icon": "🦴", "importance": 4
  },
  {
    "id": "event_principles_geology",
    "type": "event",
    "date": { "start": "1830-01-01", "end": "1833-01-01" },
    "era": "modern",
    "location": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "«지질학 원리» 출판 (동일과정설)", "en": "Principles of Geology" },
    "description": { "ko": "찰스 라이엘의 저서. '현재는 과거의 열쇠다'라며 지구의 변화는 느리고 점진적으로 일어남을 대중화하여 찰스 다윈에게 거대한 영감을 줌.", "en": "Charles Lyell published Principles of Geology, which popularized the doctrine of uniformitarianism." },
    "category": "publication", "relatedPeople": ["person_lyell"], "relatedEvents": ["event_origin_of_species"], "relatedMedia": [], "wikipedia": { "ko": "지질학의_원리", "en": "Principles_of_Geology" }, "icon": "📖", "importance": 5
  },
  {
    "id": "event_theory_of_earth",
    "type": "event",
    "date": { "start": "1788-03-07", "end": "1788-03-07" },
    "era": "modern",
    "location": { "name": { "ko": "에든버러", "en": "Edinburgh" }, "coordinates": { "lat": 55.95, "lng": -3.18 }, "region": "europe" },
    "title": { "ko": "«지구 이론» 발표", "en": "Theory of the Earth" },
    "description": { "ko": "제임스 허턴이 지구가 끝없이 순환하며 그 나이가 추정할 수 없을 만큼 깊다는 사실을 제시하여 성서 중심의 천지창조 연대를 뒤집음.", "en": "James Hutton read his 'Theory of the Earth' to the Royal Society of Edinburgh." },
    "category": "publication", "relatedPeople": ["person_hutton"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "제임스_허턴", "en": "Theory_of_the_Earth" }, "icon": "🌍", "importance": 4
  },
  {
    "id": "event_ria",
    "type": "event",
    "date": { "start": "1959-01-01", "end": "1959-01-01" }, // Development timeline
    "era": "contemporary",
    "location": { "name": { "ko": "브롱크스", "en": "Bronx, NY" }, "coordinates": { "lat": 40.84, "lng": -73.87 }, "region": "americas" },
    "title": { "ko": "방사성면역측정법(RIA) 개발", "en": "Development of RIA" },
    "description": { "ko": "로잘린 얠로 팀이 방사성 동위원소를 이용하여 혈액 내 각종 극미량 호르몬을 검출하는 획기적인 임상 의학의 토대를 만듦.", "en": "Rosalyn Yalow and Solomon Berson developed the radioimmunoassay technique." },
    "category": "discovery", "relatedPeople": ["person_yalow"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "방사면역측정법", "en": "Radioimmunoassay" }, "icon": "⚕️", "importance": 4
  },
  {
    "id": "event_artemisinin",
    "type": "event",
    "date": { "start": "1971-10-01", "end": "1971-10-01" }, // Breakthrough month
    "era": "contemporary",
    "location": { "name": { "ko": "베이징", "en": "Beijing" }, "coordinates": { "lat": 39.90, "lng": 116.40 }, "region": "asia" },
    "title": { "ko": "아르테미시닌 발견 (말라리아 치료)", "en": "Discovery of Artemisinin" },
    "description": { "ko": "프로젝트 523 소속의 투유유가 개똥쑥에서 유효 성분을 낮은 온도로 축출해내어 기적의 항말라리아 치료제 아르테미시닌을 손에 넣음.", "en": "Tu Youyou discovered Artemisinin, a breakthrough anti-malarial drug extracted from sweet wormwood." },
    "category": "discovery", "relatedPeople": ["person_tu_youyou"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "아르테미시닌", "en": "Artemisinin" }, "icon": "🌿", "importance": 5
  },
  {
    "id": "event_parity_violation",
    "type": "event",
    "date": { "start": "1956-12-01", "end": "1956-12-01" }, // conducted Dec 1956
    "era": "contemporary",
    "location": { "name": { "ko": "워싱턴 D.C. (NBS)", "en": "Washington, D.C." }, "coordinates": { "lat": 38.89, "lng": -77.03 }, "region": "americas" },
    "title": { "ko": "우 실험 (패리티 비보존 법칙 증명)", "en": "Wu Experiment" },
    "description": { "ko": "우첸슝이 초저온에서 코발트-60의 베타 붕괴를 관찰하여 입자물리학의 약력에서 좌우 대칭(패리티)이 깨짐을 완벽하게 증명해냄.", "en": "The Wu experiment established that parity is not conserved in weak nuclear interactions." },
    "category": "experiment", "relatedPeople": ["person_wu"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "우_실험", "en": "Wu_experiment" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "event_nuclear_fission",
    "type": "event",
    "date": { "start": "1939-02-11", "end": "1939-02-11" }, // Published date in Nature
    "era": "contemporary",
    "location": { "name": { "ko": "스톡홀름", "en": "Stockholm" }, "coordinates": { "lat": 59.32, "lng": 18.06 }, "region": "europe" },
    "title": { "ko": "우라늄 핵분열 메커니즘 해석", "en": "Explanation of Nuclear Fission" },
    "description": { "ko": "망명 중이던 리제 마이트너가 우라늄에 중성자를 쏘아 생긴 바륨의 원인을 '원자핵 쪼개짐(핵분열)' 현상으로 명쾌히 설명하고 질량 감손 에너지(E=mc²)를 확인.", "en": "Lise Meitner and Otto Frisch published the theoretical explanation for the process of nuclear fission." },
    "category": "discovery", "relatedPeople": ["person_meitner"], "relatedEvents": ["event_trinity_test"], "relatedMedia": [], "wikipedia": { "ko": "원자핵분열", "en": "Nuclear_fission" }, "icon": "🔥", "importance": 5
  },
  {
    "id": "event_chimp_tools",
    "type": "event",
    "date": { "start": "1960-11-04", "end": "1960-11-04" }, // Observed David Greybeard
    "era": "contemporary",
    "location": { "name": { "ko": "곰베 계곡 (탄자니아)", "en": "Gombe Stream" }, "coordinates": { "lat": -4.66, "lng": 29.62 }, "region": "africa" },
    "title": { "ko": "침팬지의 도구 사용 발견", "en": "Observation of Chimp Tool Use" },
    "description": { "ko": "제인 구달이 침팬지가 풀줄기를 다듬어 개미를 사냥하는 모습을 목격. 인류만의 특권이라 여겨졌던 '도구의 제작과 사용'의 정의를 뒤흔듦.", "en": "Jane Goodall observed a chimpanzee using objects as tools to fish for termites." },
    "category": "discovery", "relatedPeople": ["person_jane_goodall"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "제인_구달#업적", "en": "Jane_Goodall#Research_and_discoveries" }, "icon": "🐒", "importance": 5
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
console.log('Batch 6 complete!');
