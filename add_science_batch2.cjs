const fs = require('fs');
const path = require('path');

const peoplePath = path.join(__dirname, 'src', 'data', 'people.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newPeople = [
  {
    "id": "person_thales",
    "type": "person",
    "date": { "birth": "-0624-01-01", "death": "-0546-01-01" },
    "era": "ancient",
    "birthPlace": { "name": { "ko": "밀레토스", "en": "Miletus" }, "coordinates": { "lat": 37.53, "lng": 27.28 }, "region": "middleEast" },
    "title": { "ko": "탈레스", "en": "Thales of Miletus" },
    "description": { "ko": "만물의 근원을 물로 보았으며, 신화적 해석을 벗어나 합리적이고 과학적인 사고를 최초로 시도한 철학자.", "en": "Recognized as the first philosopher in the Greek tradition, he sought natural explanations for phenomena." },
    "category": "thinker", "relatedEvents": [], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "탈레스", "en": "Thales_of_Miletus" }, "icon": "📖", "importance": 4
  },
  {
    "id": "person_pythagoras",
    "type": "person",
    "date": { "birth": "-0570-01-01", "death": "-0495-01-01" },
    "era": "ancient",
    "birthPlace": { "name": { "ko": "사모스", "en": "Samos" }, "coordinates": { "lat": 37.75, "lng": 26.98 }, "region": "europe" },
    "title": { "ko": "피타고라스", "en": "Pythagoras" },
    "description": { "ko": "만물의 근원을 수(Number)로 보았으며 피타고라스 정리를 증명한 고대 그리스의 수학자이자 철학자.", "en": "Ancient Ionian Greek philosopher and the eponymous founder of Pythagoreanism, known for the Pythagorean theorem." },
    "category": "thinker", "relatedEvents": ["event_pythagorean_theorem"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "피타고라스", "en": "Pythagoras" }, "icon": "🧮", "importance": 4
  },
  {
    "id": "person_archimedes",
    "type": "person",
    "date": { "birth": "-0287-01-01", "death": "-0212-01-01" },
    "era": "ancient",
    "birthPlace": { "name": { "ko": "시라쿠사", "en": "Syracuse" }, "coordinates": { "lat": 37.07, "lng": 15.28 }, "region": "europe" },
    "title": { "ko": "아르키메데스", "en": "Archimedes" },
    "description": { "ko": "부력의 원리(유레카)와 지렛대의 원리를 발견한 고대 최고의 수학자이자 공학자.", "en": "Greek mathematician, physicist, engineer, astronomer, and inventor. Famous for the principle of buoyancy." },
    "category": "thinker", "relatedEvents": ["event_archimedes_principle"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "아르키메데스", "en": "Archimedes" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_euclid",
    "type": "person",
    "date": { "birth": "-0325-01-01", "death": "-0265-01-01" },
    "era": "ancient",
    "birthPlace": { "name": { "ko": "알렉산드리아", "en": "Alexandria" }, "coordinates": { "lat": 31.20, "lng": 29.91 }, "region": "africa" },
    "title": { "ko": "에우클레이데스 (유클리드)", "en": "Euclid" },
    "description": { "ko": "기하학의 아버지로 불리며 «기하학 원론»을 집필하여 2천 년간 수학 교과서의 표준을 세움.", "en": "Greek mathematician, often referred to as the 'founder of geometry', author of the Elements." },
    "category": "thinker", "relatedEvents": ["event_euclid_elements"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "에우클레이데스", "en": "Euclid" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "person_hippocrates",
    "type": "person",
    "date": { "birth": "-0460-01-01", "death": "-0370-01-01" },
    "era": "ancient",
    "birthPlace": { "name": { "ko": "코스", "en": "Kos" }, "coordinates": { "lat": 36.89, "lng": 27.28 }, "region": "europe" },
    "title": { "ko": "히포크라테스", "en": "Hippocrates" },
    "description": { "ko": "의학의 아버지. 질병을 미신이나 신의 저주가 아닌 자연적 원인으로 설명하기 시작함.", "en": "Greek physician of the Age of Pericles, considered one of the most outstanding figures in the history of medicine." },
    "category": "thinker", "relatedEvents": [], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "히포크라테스", "en": "Hippocrates" }, "icon": "⚕️", "importance": 5
  },
  {
    "id": "person_ptolemy",
    "type": "person",
    "date": { "birth": "0100-01-01", "death": "0170-01-01" },
    "era": "ancient",
    "birthPlace": { "name": { "ko": "알렉산드리아", "en": "Alexandria" }, "coordinates": { "lat": 31.20, "lng": 29.91 }, "region": "africa" },
    "title": { "ko": "프톨레마이오스", "en": "Ptolemy" },
    "description": { "ko": "천동설을 체계화한 «알마게스트»를 저술하여 천문학의 절대적 권위자로 수 세기 동안 군림함.", "en": "Mathematician, astronomer, geographer and astrologer who codified the Earth-centric Ptolemaic system." },
    "category": "thinker", "relatedEvents": ["event_almagest"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "클라우디오스_프톨레마이오스", "en": "Ptolemy" }, "icon": "🔭", "importance": 4
  },
  {
    "id": "person_jang_yeong_sil",
    "type": "person",
    "date": { "birth": "1390-01-01", "death": "1450-01-01" }, // 약력
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "동래", "en": "Dongnae" }, "coordinates": { "lat": 35.20, "lng": 129.08 }, "region": "korea" },
    "title": { "ko": "장영실", "en": "Jang Yeong-sil" },
    "description": { "ko": "조선 전기의 천재 발명가. 자격루(물시계), 측우기 등 당대 최고 수준의 과학 기구를 제작함.", "en": "Prominent Korean engineer, scientist, and inventor during the Joseon Dynasty." },
    "category": "thinker", "relatedEvents": ["event_clepsydra", "event_hangeul"], "relatedPeople": ["person_sejong"], "relatedMedia": ["media_movie_forbidden_dream"], "wikipedia": { "ko": "장영실", "en": "Jang_Yeong-sil" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_al_khwarizmi",
    "type": "person",
    "date": { "birth": "0780-01-01", "death": "0850-01-01" },
    "era": "medieval",
    "birthPlace": { "name": { "ko": "화레즘", "en": "Khwarazm" }, "coordinates": { "lat": 42.22, "lng": 59.33 }, "region": "middleEast" },
    "title": { "ko": "알 콰리즈미", "en": "Al-Khwarizmi" },
    "description": { "ko": "대수학(Algebra)의 아버지. 그의 대수학 저서는 수백 년간 서양 수학의 교재로 사용됨. 알고리즘 어원의 주인공.", "en": "Persian mathematician, astronomer, and geographer. Known as the father of algebra." },
    "category": "thinker", "relatedEvents": ["event_algebra"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "알콰리즈미", "en": "Al-Khwarizmi" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "person_ibn_sina",
    "type": "person",
    "date": { "birth": "0980-08-01", "death": "1037-06-21" },
    "era": "medieval",
    "birthPlace": { "name": { "ko": "부하라", "en": "Bukhara" }, "coordinates": { "lat": 39.77, "lng": 64.42 }, "region": "middleEast" },
    "title": { "ko": "이븐 시나 (아비센나)", "en": "Ibn Sina (Avicenna)" },
    "description": { "ko": "이슬람 황금기의 최고 의학자. 의학 백과사전 «의학정전»은 유럽에서 17세기까지 표준 교재로 쓰임.", "en": "Persian polymath who is regarded as one of the most significant physicians, astronomers, thinkers and writers of the Islamic Golden Age." },
    "category": "thinker", "relatedEvents": ["event_canon_medicine"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "이븐_시나", "en": "Avicenna" }, "icon": "⚕️", "importance": 5
  },
  {
    "id": "person_da_vinci",
    "type": "person",
    "date": { "birth": "1452-04-15", "death": "1519-05-02" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "빈치", "en": "Vinci" }, "coordinates": { "lat": 43.78, "lng": 10.92 }, "region": "europe" },
    "title": { "ko": "레오나르도 다 빈치", "en": "Leonardo da Vinci" },
    "description": { "ko": "르네상스 시대를 대표하는 융합형 진정한 메이커. 예술가이자 해부학, 공학, 천문학을 넘나든 르네상스적 천재.", "en": "Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect." },
    "category": "thinker", "relatedEvents": ["event_vitruvian_man"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "레오나르도_다_빈치", "en": "Leonardo_da_Vinci" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_galileo",
    "type": "person",
    "date": { "birth": "1564-02-15", "death": "1642-01-08" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "피사", "en": "Pisa" }, "coordinates": { "lat": 43.72, "lng": 10.40 }, "region": "europe" },
    "title": { "ko": "갈릴레오 갈릴레이", "en": "Galileo Galilei" },
    "description": { "ko": "지동설을 옹호하고 현대 관측 천문학의 창시자이자 낙하의 법칙 등 고전 물리학의 아버지.", "en": "Italian astronomer, physicist and engineer, sometimes described as a polymath, from Pisa. Father of observational astronomy." },
    "category": "thinker", "relatedEvents": ["event_galileo_telescope", "event_heliocentrism"], "relatedPeople": ["person_copernicus", "person_kepler"], "relatedMedia": [], "wikipedia": { "ko": "갈릴레오_갈릴레이", "en": "Galileo_Galilei" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "person_kepler",
    "type": "person",
    "date": { "birth": "1571-12-27", "death": "1630-11-15" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "바일데어슈타트", "en": "Weil der Stadt" }, "coordinates": { "lat": 48.75, "lng": 8.87 }, "region": "europe" },
    "title": { "ko": "요하네스 케플러", "en": "Johannes Kepler" },
    "description": { "ko": "독일의 천문학자. 행성 운동의 세 가지 법칙을 발견하여 천체 역학의 기초를 확립.", "en": "German astronomer, mathematician, and astrologer. He is a key figure in the 17th-century scientific revolution, best known for his laws of planetary motion." },
    "category": "thinker", "relatedEvents": ["event_kepler_laws"], "relatedPeople": ["person_galileo"], "relatedMedia": [], "wikipedia": { "ko": "요하네스_케플러", "en": "Johannes_Kepler" }, "icon": "🔭", "importance": 4
  },
  {
    "id": "person_william_harvey",
    "type": "person",
    "date": { "birth": "1578-04-01", "death": "1657-06-03" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "포크스턴", "en": "Folkestone" }, "coordinates": { "lat": 51.08, "lng": 1.18 }, "region": "europe" },
    "title": { "ko": "윌리엄 하비", "en": "William Harvey" },
    "description": { "ko": "동물의 심장 박동에 의해 혈액이 온몸을 순환한다는 혈액 순환론을 최초로 상세히 규명한 영국의 의학자.", "en": "English physician who made seminal contributions in anatomy and physiology. First known physician to describe completely the systemic circulation." },
    "category": "thinker", "relatedEvents": ["event_blood_circulation"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "윌리엄_하비", "en": "William_Harvey" }, "icon": "⚕️", "importance": 4
  },
  {
    "id": "person_descartes",
    "type": "person",
    "date": { "birth": "1596-03-31", "death": "1650-02-11" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "라 에 앙 투란", "en": "La Haye en Touraine" }, "coordinates": { "lat": 46.96, "lng": 0.69 }, "region": "europe" },
    "title": { "ko": "르네 데카르트", "en": "René Descartes" },
    "description": { "ko": "‘나는 생각한다, 고로 존재한다.’ 해석기하학의 창시자이자 근대 철학과 방법론적 회의의 창시자.", "en": "French philosopher, mathematician, and scientist. A prominent figure of the Scientific Revolution." },
    "category": "thinker", "relatedEvents": ["event_cartesian_system"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "르네_데카르트", "en": "René_Descartes" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "person_huygens",
    "type": "person",
    "date": { "birth": "1629-04-14", "death": "1695-07-08" },
    "era": "earlyModern",
    "birthPlace": { "name": { "ko": "헤이그", "en": "The Hague" }, "coordinates": { "lat": 52.07, "lng": 4.30 }, "region": "europe" },
    "title": { "ko": "크리스티안 하위헌스", "en": "Christiaan Huygens" },
    "description": { "ko": "빛의 파동설을 최초로 주장하였고, 진자시계를 발명한 네덜란드의 물리학자 및 천문학자.", "en": "Dutch mathematician, physicist, astronomer and inventor, regarded as one of the greatest scientists of all time." },
    "category": "thinker", "relatedEvents": ["event_wave_theory"], "relatedPeople": ["person_isaac_newton"], "relatedMedia": [], "wikipedia": { "ko": "크리스티안_하위헌스", "en": "Christiaan_Huygens" }, "icon": "🔬", "importance": 4
  }
];

const newEvents = [
  {
    "id": "event_pythagorean_theorem",
    "type": "event",
    "date": { "start": "-0500-01-01", "end": "-0500-01-01" }, // 추정 시기
    "era": "ancient",
    "location": { "name": { "ko": "크로톤", "en": "Croton" }, "coordinates": { "lat": 39.08, "lng": 17.12 }, "region": "europe" },
    "title": { "ko": "피타고라스 정리", "en": "Pythagorean Theorem Formulation" },
    "description": { "ko": "직각삼각형의 빗변 제곱은 다른 두 변의 제곱의 합과 같다는 기하학의 근본적인 정리가 기원전에 정립됨.", "en": "Fundamental relation in Euclidean geometry among the three sides of a right triangle." },
    "category": "discovery", "relatedPeople": ["person_pythagoras"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "피타고라스_정리", "en": "Pythagorean_theorem" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "event_archimedes_principle",
    "type": "event",
    "date": { "start": "-0250-01-01", "end": "-0250-01-01" },
    "era": "ancient",
    "location": { "name": { "ko": "시라쿠사", "en": "Syracuse" }, "coordinates": { "lat": 37.07, "lng": 15.28 }, "region": "europe" },
    "title": { "ko": "아르키메데스의 원리 발견", "en": "Discovery of Buoyancy Principle" },
    "description": { "ko": "왕관의 순도를 확인하기 위해 목욕탕에서 부력의 원리를 깨닫고 '유레카!'를 외치며 거리가 뛰쳐나왔다는 전설의 부력의 원리 규명.", "en": "The law of buoyancy was formulated by Archimedes of Syracuse." },
    "category": "discovery", "relatedPeople": ["person_archimedes"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "아르키메데스의_원리", "en": "Archimedes'_principle" }, "icon": "🧭", "importance": 5
  },
  {
    "id": "event_euclid_elements",
    "type": "event",
    "date": { "start": "-0300-01-01", "end": "-0300-01-01" },
    "era": "ancient",
    "location": { "name": { "ko": "알렉산드리아", "en": "Alexandria" }, "coordinates": { "lat": 31.20, "lng": 29.91 }, "region": "africa" },
    "title": { "ko": "기하학 원론 출판", "en": "Publication of Euclid's Elements" },
    "description": { "ko": "서양 수학 역사상 가장 큰 영향을 끼친 유클리드의 수학 및 기하학 저서가 발간됨.", "en": "A mathematical and geometric treatise consisting of 13 books written by the ancient Greek mathematician Euclid." },
    "category": "publication", "relatedPeople": ["person_euclid"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "에우클레이데스의_원론", "en": "Euclid's_Elements" }, "icon": "📖", "importance": 5
  },
  {
    "id": "event_almagest",
    "type": "event",
    "date": { "start": "0150-01-01", "end": "0150-01-01" },
    "era": "ancient",
    "location": { "name": { "ko": "알렉산드리아", "en": "Alexandria" }, "coordinates": { "lat": 31.20, "lng": 29.91 }, "region": "africa" },
    "title": { "ko": "알마게스트 출판", "en": "Publication of Almagest" },
    "description": { "ko": "수학, 자전과 공전을 기반으로 복잡한 주전원을 사용하여 우주의 구조를 지구 중심으로 설명한 프톨레마이오스의 대작.", "en": "A 2nd-century mathematical and astronomical treatise on the apparent motions of the stars and planetary paths." },
    "category": "publication", "relatedPeople": ["person_ptolemy"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "알마게스트", "en": "Almagest" }, "icon": "📖", "importance": 4
  },
  {
    "id": "event_clepsydra",
    "type": "event",
    "date": { "start": "1434-01-01", "end": "1434-01-01" },
    "era": "earlyModern",
    "location": { "name": { "ko": "한양(서울)", "en": "Hanyang" }, "coordinates": { "lat": 37.58, "lng": 126.98 }, "region": "korea" },
    "title": { "ko": "자격루의 완성", "en": "Completion of Jagyeongnu" },
    "description": { "ko": "세종대왕의 명으로 장영실이 스스로 시각을 알리는 물시계 ‘자격루’를 완성함.", "en": "Jang Yeong-sil invented the self-striking water clock under the patronage of King Sejong." },
    "category": "invention", "relatedPeople": ["person_jang_yeong_sil", "person_sejong"], "relatedEvents": [], "relatedMedia": ["media_movie_forbidden_dream"], "wikipedia": { "ko": "자격루", "en": "Jagyeongnu" }, "icon": "💡", "importance": 4
  },
  {
    "id": "event_algebra",
    "type": "event",
    "date": { "start": "0820-01-01", "end": "0820-01-01" },
    "era": "medieval",
    "location": { "name": { "ko": "바그다드", "en": "Baghdad" }, "coordinates": { "lat": 33.32, "lng": 44.42 }, "region": "middleEast" },
    "title": { "ko": "대수학 정립 (알자브르)", "en": "Foundations of Algebra" },
    "description": { "ko": "알 콰리즈미가 대수학 방정식의 해법을 다룬 서적 «알자브르»를 출간, 서구 수학의 체계를 재편성함.", "en": "Al-Khwarizmi published 'The Compendious Book on Calculation by Completion and Balancing'." },
    "category": "publication", "relatedPeople": ["person_al_khwarizmi"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "대수학", "en": "The_Compendious_Book_on_Calculation_by_Completion_and_Balancing" }, "icon": "🧮", "importance": 4
  },
  {
    "id": "event_canon_medicine",
    "type": "event",
    "date": { "start": "1025-01-01", "end": "1025-01-01" },
    "era": "medieval",
    "location": { "name": { "ko": "페르시아", "en": "Persia" }, "coordinates": { "lat": 32.42, "lng": 53.68 }, "region": "middleEast" },
    "title": { "ko": "의학정전 편찬", "en": "The Canon of Medicine" },
    "description": { "ko": "아비센나(이븐 시나)가 철학과 당대 의학을 집대성하여 출판. 수 세기 동안 중동과 유럽 전역에서 표준화된 교재로 사용됨.", "en": "Avicenna compiled an encyclopedia of medicine which became a standard medical text in Europe and the Islamic world." },
    "category": "publication", "relatedPeople": ["person_ibn_sina"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "의학정전", "en": "The_Canon_of_Medicine" }, "icon": "📖", "importance": 5
  },
  {
    "id": "event_vitruvian_man",
    "type": "event",
    "date": { "start": "1490-01-01", "end": "1490-01-01" },
    "era": "earlyModern",
    "location": { "name": { "ko": "밀라노", "en": "Milan" }, "coordinates": { "lat": 45.46, "lng": 9.19 }, "region": "europe" },
    "title": { "ko": "비트루비우스적 인간", "en": "Vitruvian Man" },
    "description": { "ko": "인체의 황금 비율을 기하학적으로 그려낸 레오나르도 다 빈치의 대표적인 드로잉. 과학과 예술의 궁극적 조화.", "en": "Drawing by Leonardo da Vinci describing the ideal human proportions with geometry." },
    "category": "discovery", "relatedPeople": ["person_da_vinci"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "비트루비우스적_인간", "en": "Vitruvian_Man" }, "icon": "🧭", "importance": 4
  },
  {
    "id": "event_galileo_telescope",
    "type": "event",
    "date": { "start": "1610-01-07", "end": "1610-01-07" },
    "era": "earlyModern",
    "location": { "name": { "ko": "파도바", "en": "Padua" }, "coordinates": { "lat": 45.41, "lng": 11.87 }, "region": "europe" },
    "title": { "ko": "목성의 네 위성 발견", "en": "Discovery of Galilean Moons" },
    "description": { "ko": "갈릴레이가 자신이 개량한 망원경을 사용하여 목성 주변을 도는 위성 4개를 발견. 천동설을 정면으로 반박하는 관측 증거 제시.", "en": "Galileo Galilei observed four objects surrounding Jupiter that behaved unlike stars, proving they orbital bodies." },
    "category": "discovery", "relatedPeople": ["person_galileo"], "relatedEvents": ["event_heliocentrism"], "relatedMedia": [], "wikipedia": { "ko": "갈릴레이_위성", "en": "Galilean_moons" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "event_kepler_laws",
    "type": "event",
    "date": { "start": "1609-01-01", "end": "1619-01-01" },
    "era": "earlyModern",
    "location": { "name": { "ko": "프라하", "en": "Prague" }, "coordinates": { "lat": 50.07, "lng": 14.43 }, "region": "europe" },
    "title": { "ko": "행성 운동의 3법칙", "en": "Kepler's Laws of Planetary Motion" },
    "description": { "ko": "요하네스 케플러가 타원 궤도의 법칙, 면적 속도 일정의 법칙, 조화의 법칙을 대외에 발표함.", "en": "Kepler published his three laws describing the motion of planets around the Sun." },
    "category": "discovery", "relatedPeople": ["person_kepler"], "relatedEvents": ["event_principia"], "relatedMedia": [], "wikipedia": { "ko": "케플러의_행성_운동_법칙", "en": "Kepler's_laws_of_planetary_motion" }, "icon": "🧭", "importance": 5
  },
  {
    "id": "event_blood_circulation",
    "type": "event",
    "date": { "start": "1628-01-01", "end": "1628-01-01" },
    "era": "earlyModern",
    "location": { "name": { "ko": "프랑크푸르트", "en": "Frankfurt" }, "coordinates": { "lat": 50.11, "lng": 8.68 }, "region": "europe" },
    "title": { "ko": "혈액 순환론 발표", "en": "Publication of De Motu Cordis" },
    "description": { "ko": "윌리엄 하비가 심장의 펌프 작용을 통해 혈액이 순환한다는 사실을 해부학 논문으로 증명함.", "en": "William Harvey published 'De Motu Cordis' proving the circulation of blood." },
    "category": "discovery", "relatedPeople": ["person_william_harvey"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "혈액순환", "en": "Circulatory_system" }, "icon": "🔬", "importance": 5
  },
  {
    "id": "event_cartesian_system",
    "type": "event",
    "date": { "start": "1637-01-01", "end": "1637-01-01" },
    "era": "earlyModern",
    "location": { "name": { "ko": "레이던", "en": "Leiden" }, "coordinates": { "lat": 52.16, "lng": 4.49 }, "region": "europe" },
    "title": { "ko": "좌표계의 확립 (방법서설 출판)", "en": "Cartesian Coordinate System" },
    "description": { "ko": "르네 데카르트가 책 «방법서설»의 부록으로 직교 좌표계(해석 기하학)를 도입하여 기하학과 대수학을 통합함.", "en": "Descartes introduced Cartesian coordinates in 'La Géométrie', bridging algebra and geometry." },
    "category": "invention", "relatedPeople": ["person_descartes"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "데카르트_좌표계", "en": "Cartesian_coordinate_system" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "event_wave_theory",
    "type": "event",
    "date": { "start": "1690-01-01", "end": "1690-01-01" },
    "era": "earlyModern",
    "location": { "name": { "ko": "파리", "en": "Paris" }, "coordinates": { "lat": 48.86, "lng": 2.35 }, "region": "europe" },
    "title": { "ko": "빛의 파동설 정립", "en": "Treatise on Light" },
    "description": { "ko": "크리스티안 하위헌스가 빛이 파동 형태의 성질을 가진다고 주장하는 역사적인 이론을 발표함(뉴턴의 입자설과 대립).", "en": "Huygens published the 'Treatise on Light' formulating his wave theory of light." },
    "category": "discovery", "relatedPeople": ["person_huygens"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "하위헌스-프레넬_원리", "en": "Huygens–Fresnel_principle" }, "icon": "💡", "importance": 4
  },
  {
    "id": "event_printing_press",
    "type": "event",
    "date": { "start": "1440-01-01", "end": "1440-01-01" },
    "era": "medieval", // or earlyModern depending on definition, using roughly medieval transition
    "location": { "name": { "ko": "마인츠", "en": "Mainz" }, "coordinates": { "lat": 49.99, "lng": 8.27 }, "region": "europe" },
    "title": { "ko": "금속 활자 인쇄기 발명", "en": "Invention of Printing Press" },
    "description": { "ko": "서양 최초로 요하네스 구텐베르크가 실용적 금속 활자 인쇄기를 발명하여 지식 전파의 민주화를 불러옴 (인쇄 혁명).", "en": "Johannes Gutenberg invented the moving type printing press, starting the Printing Revolution." },
    "category": "invention", "relatedPeople": [], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "인쇄기", "en": "Printing_press" }, "icon": "💡", "importance": 5
  },
  {
    "id": "event_fabrica",
    "type": "event",
    "date": { "start": "1543-06-01", "end": "1543-06-01" },
    "era": "earlyModern",
    "location": { "name": { "ko": "바젤", "en": "Basel" }, "coordinates": { "lat": 47.55, "lng": 7.59 }, "region": "europe" },
    "title": { "ko": "인체의 구조에 대하여 (파브리카)", "en": "De humani corporis fabrica" },
    "description": { "ko": "안드레아스 베살리우스가 갈레노스의 잘못된 구시대 해부학을 시정하고 인체 해부학을 체계화한 혁명적인 명저 출판.", "en": "Andreas Vesalius published a set of books on human anatomy, Revolutionizing medical science." },
    "category": "publication", "relatedPeople": [], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "인체의_구조에_대하여", "en": "De_humani_corporis_fabrica" }, "icon": "⚕️", "importance": 5
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
console.log('Batch 2 complete!');
