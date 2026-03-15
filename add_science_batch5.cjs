const fs = require('fs');
const path = require('path');

const peoplePath = path.join(__dirname, 'src', 'data', 'people.json');
const eventsPath = path.join(__dirname, 'src', 'data', 'events.json');

const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newPeople = [
  {
    "id": "person_tsiolkovsky",
    "type": "person",
    "date": { "birth": "1857-09-17", "death": "1935-09-19" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "이젭스코예", "en": "Izhevskoye" }, "coordinates": { "lat": 54.54, "lng": 40.85 }, "region": "europe" },
    "title": { "ko": "콘스탄틴 치올콥스키", "en": "Konstantin Tsiolkovsky" },
    "description": { "ko": "우주비행의 진정한 선구자. '지구는 인류의 요람이지만 언제까지 요람에서 치낼 수는 없다'며 다단 로켓과 우주 정거장 개념을 제안한 로켓 공학의 아버지.", "en": "Russian and Soviet rocket scientist and pioneer of the astronautic theory." },
    "category": "thinker", "relatedEvents": [], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "콘스탄틴_치올콥스키", "en": "Konstantin_Tsiolkovsky" }, "icon": "🚀", "importance": 5
  },
  {
    "id": "person_goddard",
    "type": "person",
    "date": { "birth": "1882-10-05", "death": "1945-08-10" },
    "era": "modern",
    "birthPlace": { "name": { "ko": "우스터", "en": "Worcester, Massachusetts" }, "coordinates": { "lat": 42.26, "lng": -71.80 }, "region": "americas" },
    "title": { "ko": "로버트 고다드", "en": "Robert H. Goddard" },
    "description": { "ko": "세계 최초의 액체 연료 로켓을 발사하여 우주 시대의 문을 연 미국의 로켓 공학자.", "en": "American engineer, professor, physicist, and inventor who is credited with creating and building the world's first liquid-fueled rocket." },
    "category": "thinker", "relatedEvents": ["event_liquid_rocket"], "relatedPeople": ["person_von_braun"], "relatedMedia": [], "wikipedia": { "ko": "로버트_H._고다드", "en": "Robert_H._Goddard" }, "icon": "🚀", "importance": 5
  },
  {
    "id": "person_von_braun",
    "type": "person",
    "date": { "birth": "1912-03-23", "death": "1977-06-16" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "비지스크", "en": "Wyrzysk" }, "coordinates": { "lat": 53.15, "lng": 17.26 }, "region": "europe" },
    "title": { "ko": "베르너 폰 브라운", "en": "Wernher von Braun" },
    "description": { "ko": "독일의 V-2 로켓부터 미국의 아폴로 계획(새턴 V 로켓)까지 현대 우주 개발을 이끈 전설적인 로켓 과학자.", "en": "German-American aerospace engineer and space architect, the chief architect of the Apollo Saturn V rocket." },
    "category": "thinker", "relatedEvents": ["event_apollo_11"], "relatedPeople": [], "relatedMedia": ["media_movie_apollo_11"], "wikipedia": { "ko": "베르너_폰_브라운", "en": "Wernher_von_Braun" }, "icon": "🚀", "importance": 5
  },
  {
    "id": "person_gagarin",
    "type": "person",
    "date": { "birth": "1934-03-09", "death": "1968-03-27" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "클루시노", "en": "Klushino" }, "coordinates": { "lat": 55.62, "lng": 34.98 }, "region": "europe" },
    "title": { "ko": "유리 가가린", "en": "Yuri Gagarin" },
    "description": { "ko": "보스토크 1호를 타고 우주로 나아가 지구 궤도를 돈 인류 최초의 우주 비행사. '지구는 푸르다'는 말을 남김.", "en": "Soviet pilot and cosmonaut who became the first human to journey into outer space." },
    "category": "thinker", "relatedEvents": ["event_first_human_spaceflight"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "유리_가가린", "en": "Yuri_Gagarin" }, "icon": "👨‍🚀", "importance": 5
  },
  {
    "id": "person_neil_armstrong",
    "type": "person",
    "date": { "birth": "1930-08-05", "death": "2012-08-25" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "와파코네타", "en": "Wapakoneta, Ohio" }, "coordinates": { "lat": 40.56, "lng": -84.19 }, "region": "americas" },
    "title": { "ko": "닐 암스트롱", "en": "Neil Armstrong" },
    "description": { "ko": "아폴로 11호를 타고 달에 착륙하여 다른 천체에 발을 내디딘 인류 최초의 인물.", "en": "American astronaut and aeronautical engineer, and the first person to walk on the Moon." },
    "category": "thinker", "relatedEvents": ["event_moon_landing"], "relatedPeople": ["person_von_braun"], "relatedMedia": ["media_movie_apollo_11", "media_movie_first_man"], "wikipedia": { "ko": "닐_암스트롱", "en": "Neil_Armstrong" }, "icon": "👨‍🚀", "importance": 5
  },
  {
    "id": "person_hawking",
    "type": "person",
    "date": { "birth": "1942-01-08", "death": "2018-03-14" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "옥스퍼드", "en": "Oxford" }, "coordinates": { "lat": 51.75, "lng": -1.25 }, "region": "europe" },
    "title": { "ko": "스티븐 호킹", "en": "Stephen Hawking" },
    "description": { "ko": "루게릭병을 극복하고 블랙홀 복사(호킹 복사) 이론 등을 발표하여 우주론 발전에 크게 기여한 천체물리학자.", "en": "English theoretical physicist, cosmologist, and author who contributed profoundly to knowledge regarding black holes." },
    "category": "thinker", "relatedEvents": ["event_hawking_radiation"], "relatedPeople": ["person_kip_thorne"], "relatedMedia": ["media_movie_theory_of_everything"], "wikipedia": { "ko": "스티븐_호킹", "en": "Stephen_Hawking" }, "icon": "📖", "importance": 5
  },
  {
    "id": "person_carl_sagan",
    "type": "person",
    "date": { "birth": "1934-11-09", "death": "1996-12-20" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "브루클린", "en": "Brooklyn, New York" }, "coordinates": { "lat": 40.67, "lng": -73.94 }, "region": "americas" },
    "title": { "ko": "칼 세이건", "en": "Carl Sagan" },
    "description": { "ko": "보이저 계획에 참여하고 다큐멘터리 «코스모스»로 전 세계에 천문학의 경이로움을 널리 알린 천문학자 겸 대중 과학 운동가.", "en": "American astronomer, planetary scientist and science communicator who popularized science through his book and series Cosmos." },
    "category": "thinker", "relatedEvents": ["event_voyager_1", "event_cosmos_broadcast"], "relatedPeople": [], "relatedMedia": ["media_book_cosmos"], "wikipedia": { "ko": "칼_세이건", "en": "Carl_Sagan" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "person_kip_thorne",
    "type": "person",
    "date": { "birth": "1940-06-01", "death": null },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "로건", "en": "Logan, Utah" }, "coordinates": { "lat": 41.73, "lng": -111.83 }, "region": "americas" },
    "title": { "ko": "킵 손", "en": "Kip Thorne" },
    "description": { "ko": "상대성 이론과 웜홀 연구의 권위자이자 LIGO(레이저 간섭계 중력파 관측소)를 통해 중력파 발견을 이끈 노벨상 수상자. 영화 '인터스텔라'의 과학 자문.", "en": "American theoretical physicist known for his contributions to gravitational physics and astrophysics. Nobel laureate." },
    "category": "thinker", "relatedEvents": ["event_gravitational_waves"], "relatedPeople": ["person_hawking"], "relatedMedia": ["media_movie_interstellar"], "wikipedia": { "ko": "킵_손", "en": "Kip_Thorne" }, "icon": "💡", "importance": 4
  },
  {
    "id": "person_linus_torvalds",
    "type": "person",
    "date": { "birth": "1969-12-28", "death": null },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "헬싱키", "en": "Helsinki" }, "coordinates": { "lat": 60.16, "lng": 24.93 }, "region": "europe" },
    "title": { "ko": "리누스 토르발스", "en": "Linus Torvalds" },
    "description": { "ko": "무료 오픈 소스 운영 체제 커널인 리눅스(Linux)와 버전 관리 시스템 깃(Git)을 개발하여 전 세계 IT 생태계를 뒤바꾼 전설적인 개발자.", "en": "Finnish-American software engineer who is the creator and principal developer of the Linux kernel and Git." },
    "category": "thinker", "relatedEvents": ["event_linux_release"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "리누스_토르발스", "en": "Linus_Torvalds" }, "icon": "💻", "importance": 5
  },
  {
    "id": "person_grace_hopper",
    "type": "person",
    "date": { "birth": "1906-12-09", "death": "1992-01-01" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "뉴욕", "en": "New York" }, "coordinates": { "lat": 40.71, "lng": -74.00 }, "region": "americas" },
    "title": { "ko": "그레이스 호퍼", "en": "Grace Hopper" },
    "description": { "ko": "최초의 컴파일러 A-0을 개발하고 코볼(COBOL) 언어의 탄생에 기여하여 프로그램이 영어를 쓰듯 작성될 수 있도록 만든 컴퓨터 과학의 개척자.", "en": "American computer scientist and US Navy rear admiral. Developed the first computer compiler and influenced the creation of COBOL." },
    "category": "thinker", "relatedEvents": ["event_first_compiler"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "그레이스_호퍼", "en": "Grace_Hopper" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "person_john_bardeen",
    "type": "person",
    "date": { "birth": "1908-05-23", "death": "1991-01-30" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "매디슨", "en": "Madison, Wisconsin" }, "coordinates": { "lat": 43.07, "lng": -89.40 }, "region": "americas" },
    "title": { "ko": "존 바딘", "en": "John Bardeen" },
    "description": { "ko": "트랜지스터 발명과 초전도성(BCS 이론) 연구로 물리학 부문에서 노벨상을 유일하게 두 번 수상한 위대한 물리학자.", "en": "American physicist and electrical engineer, the only person to be awarded the Nobel Prize in Physics twice: for the transistor and for superconductivity." },
    "category": "thinker", "relatedEvents": ["event_transistor"], "relatedPeople": ["person_william_shockley"], "relatedMedia": [], "wikipedia": { "ko": "존_바딘", "en": "John_Bardeen" }, "icon": "💡", "importance": 5
  },
  {
    "id": "person_william_shockley",
    "type": "person",
    "date": { "birth": "1910-02-13", "death": "1989-08-12" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "런던", "en": "London" }, "coordinates": { "lat": 51.50, "lng": -0.12 }, "region": "europe" },
    "title": { "ko": "윌리엄 쇼클리", "en": "William Shockley" },
    "description": { "ko": "벨 연구소에서 바딘, 브래튼과 함께 트랜지스터를 공동 발명하여 실리콘 밸리의 정보 통신 시대를 연 장본인 중 하나.", "en": "American physicist and inventor. Co-invented the first working point-contact transistor." },
    "category": "thinker", "relatedEvents": ["event_transistor"], "relatedPeople": ["person_john_bardeen"], "relatedMedia": [], "wikipedia": { "ko": "윌리엄_쇼클리", "en": "William_Shockley" }, "icon": "⚡", "importance": 4
  },
  {
    "id": "person_jack_kilby",
    "type": "person",
    "date": { "birth": "1923-11-08", "death": "2005-06-20" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "제퍼슨시티", "en": "Jefferson City, Missouri" }, "coordinates": { "lat": 38.57, "lng": -92.17 }, "region": "americas" },
    "title": { "ko": "잭 킬비", "en": "Jack Kilby" },
    "description": { "ko": "텍사스 인스트루먼트에서 여러 개의 전자 부품을 하나로 합친 세계 최초의 집적 회로(마이크로칩)를 발명한 일렉트로닉스의 영웅.", "en": "American electrical engineer who took part in the realization of the first integrated circuit." },
    "category": "thinker", "relatedEvents": ["event_integrated_circuit"], "relatedPeople": [], "relatedMedia": [], "wikipedia": { "ko": "잭_킬비", "en": "Jack_Kilby" }, "icon": "💻", "importance": 4
  },
  {
    "id": "person_godel",
    "type": "person",
    "date": { "birth": "1906-04-28", "death": "1978-01-14" },
    "era": "contemporary",
    "birthPlace": { "name": { "ko": "브륀", "en": "Brno" }, "coordinates": { "lat": 49.19, "lng": 16.60 }, "region": "europe" },
    "title": { "ko": "쿠르트 괴델", "en": "Kurt Gödel" },
    "description": { "ko": "수학 체계의 완전성을 부정하는 '불완전성 정리'를 증명하여, 20세기 수리논리학에 원자 폭탄급 충격을 던진 수학자.", "en": "Logician, mathematician, and philosopher. Considered one of the most significant logicians in history for his incompleteness theorems." },
    "category": "thinker", "relatedEvents": ["event_incompleteness_theorem"], "relatedPeople": ["person_albert_einstein", "person_von_neumann"], "relatedMedia": [], "wikipedia": { "ko": "쿠르트_괴델", "en": "Kurt_Gödel" }, "icon": "🧮", "importance": 5
  },
  {
    "id": "person_ramanujan",
    "type": "person",
    "date": { "birth": "1887-12-22", "death": "1920-04-26" },
    "era": "contemporary", // Late modern/early contemporary
    "birthPlace": { "name": { "ko": "에로데", "en": "Erode" }, "coordinates": { "lat": 11.34, "lng": 77.71 }, "region": "asia" },
    "title": { "ko": "스리니바사 라마누잔", "en": "Srinivasa Ramanujan" },
    "description": { "ko": "정규 수학 교육을 거의 받지 않고도 직관만으로 엄청난 수의 수학 공식과 정리를 발견한 인도의 불세출 천재 수학자.", "en": "Indian mathematician who made substantial contributions to mathematical analysis, number theory, infinite series, and continued fractions." },
    "category": "thinker", "relatedEvents": [], "relatedPeople": [], "relatedMedia": ["media_movie_man_who_knew_infinity"], "wikipedia": { "ko": "스리니바사_라마누잔", "en": "Srinivasa_Ramanujan" }, "icon": "🧮", "importance": 4
  }
];

const newEvents = [
  {
    "id": "event_liquid_rocket",
    "type": "event",
    "date": { "start": "1926-03-16", "end": "1926-03-16" },
    "era": "modern",
    "location": { "name": { "ko": "오번", "en": "Auburn, Massachusetts" }, "coordinates": { "lat": 42.19, "lng": -71.83 }, "region": "americas" },
    "title": { "ko": "최초의 액체 연료 로켓 발사", "en": "First Liquid-Fueled Rocket Launch" },
    "description": { "ko": "로버트 고다드가 매사추세츠주 오번의 농장에서 세계 최초의 액체 로켓 '넬'을 12미터 상공으로 쏘아 올림.", "en": "Robert Goddard launched the first liquid-fueled rocket, establishing the basis for modern rocketry." },
    "category": "invention", "relatedPeople": ["person_goddard"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "로버트_고다드#첫_비행", "en": "Robert_H._Goddard#First_flight" }, "icon": "🚀", "importance": 5
  },
  {
    "id": "event_sputnik",
    "type": "event",
    "date": { "start": "1957-10-04", "end": "1957-10-04" },
    "era": "contemporary",
    "location": { "name": { "ko": "바이코누르 우주기지", "en": "Baikonur Cosmodrome" }, "coordinates": { "lat": 45.96, "lng": 63.30 }, "region": "asia" },
    "title": { "ko": "스푸트니크 1호 발사 (우주 시대 개막)", "en": "Sputnik 1 Launched" },
    "description": { "ko": "소련이 인류 최초의 인공위성 스푸트니크 1호를 성공적으로 발사하여 미국과 소련 간 우주 경쟁의 서막을 엶.", "en": "The Soviet Union launched the first artificial Earth satellite into an elliptical low Earth orbit." },
    "category": "experiment", "relatedPeople": [], "relatedEvents": ["event_apollo_11"], "relatedMedia": [], "wikipedia": { "ko": "스푸트니크_1호", "en": "Sputnik_1" }, "icon": "🛰️", "importance": 5
  },
  {
    "id": "event_first_human_spaceflight",
    "type": "event",
    "date": { "start": "1961-04-12", "end": "1961-04-12" },
    "era": "contemporary",
    "location": { "name": { "ko": "우주", "en": "Space (Earth Orbit)" }, "coordinates": { "lat": 45.96, "lng": 63.30 }, "region": "asia" }, // launching from Baikonur
    "title": { "ko": "최초의 유인 우주 비행", "en": "First Human Spaceflight" },
    "description": { "ko": "유리 가가린을 태운 보스토크 1호가 우주로 발사되어 108분간 지구를 돌고 무사히 귀환함.", "en": "Yuri Gagarin became the first human to journey into outer space, traveling aboard the Vostok 1 spacecraft." },
    "category": "experiment", "relatedPeople": ["person_gagarin"], "relatedEvents": ["event_sputnik"], "relatedMedia": [], "wikipedia": { "ko": "보스토크_1호", "en": "Vostok_1" }, "icon": "👨‍🚀", "importance": 5
  },
  {
    "id": "event_voyager_1",
    "type": "event",
    "date": { "start": "1977-09-05", "end": "1977-09-05" },
    "era": "contemporary",
    "location": { "name": { "ko": "케이프 커내버럴", "en": "Cape Canaveral" }, "coordinates": { "lat": 28.39, "lng": -80.60 }, "region": "americas" },
    "title": { "ko": "보이저 1호 발사", "en": "Launch of Voyager 1" },
    "description": { "ko": "목성과 토성을 탐사하기 위해 발사된 무인 우주 탐사선. 현재 태양계를 벗어나 성간 공간을 비행하며 가장 멀리 간 인공 구조물이 됨.", "en": "NASA launched Voyager 1 to study the outer Solar System. It is the most distant human-made object from Earth." },
    "category": "experiment", "relatedPeople": ["person_carl_sagan"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "보이저_1호", "en": "Voyager_1" }, "icon": "🚀", "importance": 5
  },
  {
    "id": "event_hubble_telescope",
    "type": "event",
    "date": { "start": "1990-04-24", "end": "1990-04-24" },
    "era": "contemporary",
    "location": { "name": { "ko": "지구 저궤도", "en": "Low Earth Orbit" }, "coordinates": { "lat": 0, "lng": 0 }, "region": "etc" },
    "title": { "ko": "허블 우주 망원경 발사", "en": "Hubble Space Telescope Launch" },
    "description": { "ko": "대기권의 방해 없이 우주를 선명하게 관측할 수 있는 허블 우주 망원경이 우주 왕복선 디스커버리호에 실려 지구 궤도에 올려짐.", "en": "The Hubble Space Telescope was launched into low Earth orbit, revolutionizing astronomy." },
    "category": "invention", "relatedPeople": ["person_hubble"], "relatedEvents": ["event_jwst"], "relatedMedia": [], "wikipedia": { "ko": "허블_우주_망원경", "en": "Hubble_Space_Telescope" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "event_jwst",
    "type": "event",
    "date": { "start": "2021-12-25", "end": "2021-12-25" },
    "era": "contemporary",
    "location": { "name": { "ko": "기아나 우주 센터", "en": "Guiana Space Centre" }, "coordinates": { "lat": 5.23, "lng": -52.76 }, "region": "americas" },
    "title": { "ko": "제임스 웹 우주 망원경(JWST) 발사", "en": "James Webb Space Telescope Launch" },
    "description": { "ko": "인류 역사상 가장 거대하고 성능이 뛰어난 적외선 우주 망원경이 크리스마스에 발사되어 빅뱅 직후의 은하들을 관찰하기 시작함.", "en": "The James Webb Space Telescope was successfully launched to conduct infrared astronomy." },
    "category": "invention", "relatedPeople": [], "relatedEvents": ["event_hubble_telescope"], "relatedMedia": [], "wikipedia": { "ko": "제임스_웹_우주_망원경", "en": "James_Webb_Space_Telescope" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "event_hawking_radiation",
    "type": "event",
    "date": { "start": "1974-03-01", "end": "1974-03-01" }, // Published in Nature
    "era": "contemporary",
    "location": { "name": { "ko": "케임브리지", "en": "Cambridge" }, "coordinates": { "lat": 52.20, "lng": 0.11 }, "region": "europe" },
    "title": { "ko": "호킹 복사 이론 발표", "en": "Hawking Radiation Proposed" },
    "description": { "ko": "스티븐 호킹이 양자역학을 적용하여 블랙홀도 에너지를 방출하며 결국 증발하여 사라질 수 있다는 혁명적 이론을 제출함.", "en": "Stephen Hawking showed theoretically that black holes strongly emit thermal radiation." },
    "category": "discovery", "relatedPeople": ["person_hawking"], "relatedEvents": ["event_m87_blackhole"], "relatedMedia": [], "wikipedia": { "ko": "호킹_복사", "en": "Hawking_radiation" }, "icon": "💡", "importance": 5
  },
  {
    "id": "event_m87_blackhole",
    "type": "event",
    "date": { "start": "2019-04-10", "end": "2019-04-10" },
    "era": "contemporary",
    "location": { "name": { "ko": "전 세계 (EHT)", "en": "Global (EHT Project)" }, "coordinates": { "lat": 0, "lng": 0 }, "region": "etc" },
    "title": { "ko": "인류 최초 블랙홀 사진 촬영", "en": "First Image of a Black Hole" },
    "description": { "ko": "이벤트 호라이즌 망원경(EHT) 연구진이 지구 크기의 가상 망원경을 모아 처녀자리 은하단 중심에 있는 M87 블랙홀의 그림자를 최초로 포착함.", "en": "The Event Horizon Telescope collaboration released the first ever direct image of a black hole (M87*)." },
    "category": "discovery", "relatedPeople": [], "relatedEvents": ["event_hawking_radiation"], "relatedMedia": [], "wikipedia": { "ko": "이벤트_호라이즌_망원경#M87", "en": "Event_Horizon_Telescope#Messier_87" }, "icon": "🔭", "importance": 5
  },
  {
    "id": "event_first_compiler",
    "type": "event",
    "date": { "start": "1952-01-01", "end": "1952-01-01" },
    "era": "contemporary",
    "location": { "name": { "ko": "미국", "en": "United States" }, "coordinates": { "lat": 38.90, "lng": -77.03 }, "region": "americas" },
    "title": { "ko": "최초의 컴파일러 발명 (A-0)", "en": "Invention of the First Compiler (A-0)" },
    "description": { "ko": "그레이스 호퍼가 기계어 대신 사람이 이해하기 쉬운 코드로 프로그램을 작성하고 변환하는 컴파일러를 세계 최초로 개발함.", "en": "Grace Hopper completed the A-0 system, which is considered the first compiler for an electronic computer." },
    "category": "invention", "relatedPeople": ["person_grace_hopper"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "컴파일러", "en": "Compiler" }, "icon": "💻", "importance": 4
  },
  {
    "id": "event_transistor",
    "type": "event",
    "date": { "start": "1947-12-16", "end": "1947-12-16" },
    "era": "contemporary",
    "location": { "name": { "ko": "뉴저지 머리힐 (벨 연구소)", "en": "Murray Hill, NJ (Bell Labs)" }, "coordinates": { "lat": 40.69, "lng": -74.40 }, "region": "americas" },
    "title": { "ko": "트랜지스터의 발명", "en": "Invention of the Transistor" },
    "description": { "ko": "벨 연구소의 과학자들이 최초의 점접촉 트랜지스터를 만들어내어, 거대한 진공관을 대체하고 전자 기기의 소형화를 가능케 함.", "en": "John Bardeen and Walter Brattain demonstrated the first working point-contact transistor at Bell Labs." },
    "category": "invention", "relatedPeople": ["person_john_bardeen", "person_william_shockley"], "relatedEvents": ["event_integrated_circuit"], "relatedMedia": [], "wikipedia": { "ko": "트랜지스터", "en": "Transistor" }, "icon": "⚡", "importance": 5
  },
  {
    "id": "event_integrated_circuit",
    "type": "event",
    "date": { "start": "1958-09-12", "end": "1958-09-12" },
    "era": "contemporary",
    "location": { "name": { "ko": "댈러스 (텍사스 인스트루먼트)", "en": "Dallas" }, "coordinates": { "lat": 32.77, "lng": -96.79 }, "region": "americas" },
    "title": { "ko": "집적 회로(마이크로칩)의 탄생", "en": "Invention of Integrated Circuit" },
    "description": { "ko": "잭 킬비와 로버트 노이스가 수많은 트랜지스터를 하나의 실리콘 칩으로 통합하는 집적 회로를 발명하여 컴퓨터 혁명을 주도함.", "en": "Jack Kilby demonstrated the first working integrated circuit, revolutionizing electronics and computing." },
    "category": "invention", "relatedPeople": ["person_jack_kilby"], "relatedEvents": ["event_transistor"], "relatedMedia": [], "wikipedia": { "ko": "집적_회로", "en": "Integrated_circuit" }, "icon": "💻", "importance": 5
  },
  {
    "id": "event_linux_release",
    "type": "event",
    "date": { "start": "1991-09-17", "end": "1991-09-17" },
    "era": "contemporary",
    "location": { "name": { "ko": "헬싱키", "en": "Helsinki" }, "coordinates": { "lat": 60.16, "lng": 24.93 }, "region": "europe" },
    "title": { "ko": "리눅스 커널 첫 공개", "en": "Linux Kernel Released" },
    "description": { "ko": "대학생이던 리누스 토르발스가 무료 오픈 소스 운영 체제 '리눅스'의 첫 번째 버전을 인터넷 구루들에게 공개함. 오픈 소스 운동의 최고 승리작.", "en": "Linus Torvalds released the first version of the Linux kernel to the internet." },
    "category": "publication", "relatedPeople": ["person_linus_torvalds"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "리눅스_커널", "en": "Linux_kernel" }, "icon": "💻", "importance": 4
  },
  {
    "id": "event_dartmouth_ai",
    "type": "event",
    "date": { "start": "1956-06-18", "end": "1956-08-17" },
    "era": "contemporary",
    "location": { "name": { "ko": "해노버 (다트머스 대학)", "en": "Hanover (Dartmouth)" }, "coordinates": { "lat": 43.70, "lng": -72.28 }, "region": "americas" },
    "title": { "ko": "다트머스 회의 (인공지능의 탄생)", "en": "Dartmouth Workshop on AI" },
    "description": { "ko": "존 매카시, 마빈 민스키 등의 연구자가 모인 여름 워크숍에서 '인공지능(Artificial Intelligence)'이라는 용어가 최초로 사용되며 공식 학문으로 닻을 올림.", "en": "A summer research project at Dartmouth College is widely considered to be the founding event of Artificial Intelligence." },
    "category": "experiment", "relatedPeople": [], "relatedEvents": ["event_alphago"], "relatedMedia": [], "wikipedia": { "ko": "다트머스_회의", "en": "Dartmouth_workshop" }, "icon": "💡", "importance": 5
  },
  {
    "id": "event_alphago",
    "type": "event",
    "date": { "start": "2016-03-09", "end": "2016-03-15" },
    "era": "contemporary",
    "location": { "name": { "ko": "서울", "en": "Seoul" }, "coordinates": { "lat": 37.56, "lng": 126.97 }, "region": "korea" },
    "title": { "ko": "알파고 vs 이세돌 대국", "en": "AlphaGo versus Lee Sedol" },
    "description": { "ko": "구글 딥마인드의 인공지능 알파고가 최난해한 보드게임인 바둑에서 인간 최고수 이세돌 9단을 침몰시키며 전 세계에 AI 시대의 충격을 안겨줌.", "en": "DeepMind's AlphaGo AI beat the world champion Go player Lee Sedol in a five-game match." },
    "category": "experiment", "relatedPeople": [], "relatedEvents": ["event_dartmouth_ai"], "relatedMedia": [], "wikipedia": { "ko": "알파고_대_이세돌", "en": "AlphaGo_versus_Lee_Sedol" }, "icon": "💻", "importance": 5
  },
  {
    "id": "event_incompleteness_theorem",
    "type": "event",
    "date": { "start": "1931-01-01", "end": "1931-01-01" },
    "era": "contemporary",
    "location": { "name": { "ko": "빈", "en": "Vienna" }, "coordinates": { "lat": 48.20, "lng": 16.37 }, "region": "europe" },
    "title": { "ko": "괴델의 불완전성 정리", "en": "Incompleteness Theorems Published" },
    "description": { "ko": "쿠르트 괴델이 충분히 복잡한 수학 체계는 모순이 없음을 그 체계 안에서 증명할 수 없다는 정리를 발표하여 수학의 한계를 증명함.", "en": "Kurt Gödel published his two incompleteness theorems, which are fundamental in mathematical logic." },
    "category": "publication", "relatedPeople": ["person_godel"], "relatedEvents": [], "relatedMedia": [], "wikipedia": { "ko": "괴델의_불완전성_정리", "en": "Gödel's_incompleteness_theorems" }, "icon": "🧮", "importance": 5
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
console.log('Batch 5 complete!');
