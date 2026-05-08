const fs = require('fs');

const userEventsRaw = [
    { continent: '아프리카 및 서아시아', year: '약 41억 년 전', title: '인류 최초의 생명체 탄생', location: '바다' },
    { continent: '아프리카 및 서아시아', year: '약 400만 년 전', title: '오스트랄로피테쿠스 등장', location: '아프리카' },
    { continent: '아프리카 및 서아시아', year: '기원전 1만 년 무렵', title: '농경과 목축의 시작', location: '서아시아' },
    { continent: '아프리카 및 서아시아', year: '기원전 5000년 무렵', title: '나일강 유역 농경 생활 시작', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '기원전 3500년 무렵', title: '수메르인 최초의 도시 국가 탄생', location: '메소포타미아' },
    { continent: '아프리카 및 서아시아', year: '기원전 3100년 무렵', title: '상하 이집트 통일', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '기원전 1800년 무렵', title: '함무라비 법전 편찬', location: '바빌로니아 왕국' },
    { continent: '아프리카 및 서아시아', year: '기원전 1500년 무렵', title: '히타이트, 아시리아 등 여러 왕국 등장', location: '서아시아' },
    { continent: '아프리카 및 서아시아', year: '기원전 1200년 무렵', title: '역사 기록이 남지 않은 암흑시대 시작', location: '서아시아' },
    { continent: '아프리카 및 서아시아', year: '기원전 6세기 무렵', title: '아케메네스 왕조 페르시아 건국', location: '페르시아 제국' },
    { continent: '아프리카 및 서아시아', year: '632~661년', title: '정통 칼리프 시대', location: '아라비아 반도' },
    { continent: '아프리카 및 서아시아', year: '661~750년', title: '우마이야 왕조 세워짐', location: '아라비아 반도' },
    { continent: '아프리카 및 서아시아', year: '1869년', title: '수에즈 운하 개통', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '1882년', title: '영국의 이집트 점령 시작', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '1898년', title: '파쇼다 사건 발발', location: '아프리카 파쇼다' },
    { continent: '아프리카 및 서아시아', year: '1948년', title: '이스라엘 건국', location: '팔레스타인' },
    { continent: '아프리카 및 서아시아', year: '1948년', title: '제1차 중동 전쟁', location: '이스라엘 및 주변국' },
    { continent: '아프리카 및 서아시아', year: '1956년', title: '제2차 중동 전쟁', location: '이집트 시나이반도' },
    { continent: '아프리카 및 서아시아', year: '1967년', title: '제3차 중동 전쟁', location: '이스라엘, 시리아 등' },
    { continent: '아프리카 및 서아시아', year: '1973년', title: '제4차 중동 전쟁', location: '이스라엘 및 아랍 국가' },
    { continent: '아시아', year: '기원전 7000~6000년 무렵', title: '황허강 등 신석기 문화 발생', location: '중국' },
    { continent: '아시아', year: '기원전 2500년 무렵', title: '인더스 문명 발생', location: '인더스강 유역' },
    { continent: '아시아', year: '기원전 2000년 무렵', title: '중국 최고 고대 왕조 하나라 성립', location: '중국 황허강' },
    { continent: '아시아', year: '기원전 1046년', title: '주나라에 의한 상나라 멸망', location: '중국' },
    { continent: '아시아', year: '기원전 1000년 무렵', title: '아리아인 갠지스강 진출 및 브라만교 형성', location: '인도' },
    { continent: '아시아', year: '기원전 770년 무렵', title: '춘추 시대 시작', location: '중국 낙읍' },
    { continent: '아시아', year: '4세기 무렵', title: '야마토 정권 통일', location: '일본' },
    { continent: '아시아', year: '618년', title: '수나라 멸망', location: '중국' },
    { continent: '아시아', year: '710년', title: '수도를 헤이조쿄로 천도', location: '일본' },
    { continent: '아시아', year: '1405~1433년', title: '정화의 대규모 남해 원정', location: '중국 및 동남아시아' },
    { continent: '아시아', year: '1616년 이후', title: '누르하치의 후금 건국', location: '중국 만주' },
    { continent: '아시아', year: '1653년', title: '하멜 일행 표류', location: '조선 제주도' },
    { continent: '아시아', year: '1854년', title: '페리 제독에 의한 강제 개항', location: '일본' },
    { continent: '아시아', year: '1857년', title: '세포이 항쟁 발발', location: '인도' },
    { continent: '아시아', year: '1904년', title: '러일 전쟁', location: '동북아시아' },
    { continent: '아시아', year: '1910년', title: '일본의 조선 국권 피탈', location: '조선' },
    { continent: '아시아', year: '1911년 10월', title: '신해혁명 발발', location: '중국 후베이성' },
    { continent: '아시아', year: '1919년 5월 4일', title: '5·4 운동', location: '중국' },
    { continent: '아시아', year: '1931년', title: '만주 사변 발발', location: '중국 만주' },
    { continent: '아시아', year: '1964년', title: '통킹만 사건 및 베트남 전쟁', location: '베트남' },
    { continent: '아시아', year: '1966~1976년', title: '문화 대혁명', location: '중국' },
    { continent: '아시아', year: '1971년', title: '미국과 중국의 핑퐁 외교', location: '중국' },
    { continent: '유럽', year: '기원전 500년대 무렵', title: '로마 공화정 시작', location: '로마' },
    { continent: '유럽', year: '기원전 492년', title: '제1차 페르시아의 그리스 침공', location: '그리스 트라키아' },
    { continent: '유럽', year: '기원전 490년', title: '마라톤 전투 승리', location: '그리스 아테네' },
    { continent: '유럽', year: '기원전 3세기 중엽~146년', title: '로마와 카르타고의 포에니 전쟁', location: '지중해 일대' },
    { continent: '유럽', year: '476년', title: '서로마 제국 멸망', location: '로마' },
    { continent: '유럽', year: '1096~1270년', title: '십자군 전쟁', location: '예루살렘 등' },
    { continent: '유럽', year: '14세기', title: '흑사병 유행', location: '유럽 전역' },
    { continent: '유럽', year: '1453년', title: '동로마 제국 멸망', location: '콘스탄티노플' },
    { continent: '유럽', year: '1492년 8월 3일', title: '콜럼버스 출항', location: '에스파냐' },
    { continent: '유럽', year: '1497년', title: '바스쿠 다가마 인도 항로 개척 출항', location: '포르투갈' },
    { continent: '유럽', year: '1519~1522년', title: '마젤란 탐험대 세계 일주 성공', location: '에스파냐 출발' },
    { continent: '유럽', year: '1618년', title: '30년 전쟁 발발', location: '신성 로마 제국 등' },
    { continent: '유럽', year: '1648년', title: '베스트팔렌 조약 체결', location: '베스트팔렌' },
    { continent: '유럽', year: '1733년', title: '존 케이의 플라잉 셔틀 발명', location: '영국' },
    { continent: '유럽', year: '1769년', title: '제임스 와트 증기 기관 개량', location: '영국' },
    { continent: '유럽', year: '1789년', title: '바스티유 감옥 습격 (프랑스 대혁명 시작)', location: '프랑스 파리' },
    { continent: '유럽', year: '1793년', title: '루이 16세 처형', location: '프랑스' },
    { continent: '유럽', year: '1804년', title: '나폴레옹 황제 즉위', location: '프랑스' },
    { continent: '유럽', year: '1814년', title: '조지 스티븐슨 증기 기관차 발명', location: '영국' },
    { continent: '유럽', year: '1830년', title: '7월 혁명', location: '프랑스' },
    { continent: '유럽', year: '1848년', title: '2월 혁명', location: '프랑스' },
    { continent: '유럽', year: '1914년 6월 28일', title: '사라예보 사건 발발', location: '보스니아 사라예보' },
    { continent: '유럽', year: '1914~1918년', title: '제1차 세계 대전', location: '유럽 전역' },
    { continent: '유럽', year: '1917년 11월', title: '레닌의 사회주의 혁명', location: '러시아' },
    { continent: '유럽', year: '1922년', title: '소비에트 연방 수립', location: '러시아' },
    { continent: '유럽', year: '1939년', title: '제2차 세계 대전 발발', location: '폴란드 등 유럽 전역' },
    { continent: '유럽', year: '1944년 6월 6일', title: '노르망디 상륙 작전', location: '프랑스 노르망디' },
    { continent: '유럽', year: '1945년 4월 30일 무렵', title: '히틀러 자살 및 독일 항복', location: '독일 베를린' },
    { continent: '유럽', year: '1957년', title: '최초 인공위성 스푸트니크 호 발사', location: '소련' },
    { continent: '유럽', year: '1968년 5월', title: '68 혁명 발발', location: '프랑스 파리' },
    { continent: '유럽', year: '1989년', title: '베를린 장벽 붕괴', location: '독일' },
    { continent: '유럽', year: '1991년', title: '소련 공식 해체', location: '러시아' },
    { continent: '아메리카', year: '기원전 2500년 무렵', title: '아메리카 대륙 농경 및 목축 시작', location: '메소아메리카 일대' },
    { continent: '아메리카', year: '기원전 900년 무렵', title: '차빈 문명 탄생', location: '안데스산맥' },
    { continent: '아메리카', year: '기원전 500년 무렵', title: '사포텍 문명 발달', location: '멕시코 오악사카' },
    { continent: '아메리카', year: '1520년', title: '코르테스의 아스테카 제국 공격', location: '멕시코' },
    { continent: '아메리카', year: '1533년', title: '피사로의 잉카 문명 정복', location: '페루' },
    { continent: '아메리카', year: '1545년', title: '볼리비아 포토시 은광 발견', location: '볼리비아 포토시' },
    { continent: '아메리카', year: '1608년', title: '프랑스의 퀘벡 식민지 건설', location: '북아메리카 퀘벡' },
    { continent: '아메리카', year: '1773년', title: '보스턴 차 사건', location: '미국 보스턴' },
    { continent: '아메리카', year: '1774년 9월', title: '제1차 대륙 회의 개최', location: '미국 필라델피아' },
    { continent: '아메리카', year: '1775년 4월', title: '렉싱턴 전투 발발', location: '미국 보스턴 외곽' },
    { continent: '아메리카', year: '1776년', title: '미국 독립 선언', location: '미국' },
    { continent: '아메리카', year: '1781년', title: '요크타운 전투 승리', location: '미국' },
    { continent: '아메리카', year: '1783년', title: '미국 독립 승인', location: '미국' },
    { continent: '아메리카', year: '1787년', title: '미국 독립 선언 헌법 제정', location: '미국' },
    { continent: '아메리카', year: '1789년 4월 30일', title: '조지 워싱턴 초대 대통령 취임', location: '미국 뉴욕' },
    { continent: '아메리카', year: '1803년', title: '루이지애나 매입', location: '미국' },
    { continent: '아메리카', year: '1804년', title: '라틴아메리카 최초 흑인 공화국 독립', location: '아이티' },
    { continent: '아메리카', year: '1807년', title: '로버트 풀턴의 증기선 발명', location: '미국' },
    { continent: '아메리카', year: '1823년', title: '먼로 선언', location: '미국' },
    { continent: '아메리카', year: '1830년대', title: '원주민 강제 이주법 본격화', location: '미국' },
    { continent: '아메리카', year: '1861~1865년', title: '남북 전쟁', location: '미국' },
    { continent: '아메리카', year: '1863년', title: '링컨 노예 해방 선언', location: '미국' },
    { continent: '아메리카', year: '1869년', title: '미국 대륙 횡단 철도 완성', location: '미국' },
    { continent: '아메리카', year: '1903년', title: '라이트 형제 비행기 최초 비행 성공', location: '미국' },
    { continent: '아메리카', year: '1929년', title: '주가 폭락으로 대공황 시작', location: '미국' },
    { continent: '아메리카', year: '1962년', title: '쿠바 미사일 위기', location: '쿠바' }
];

const manualExcludes = [
    '바스티유 감옥 습격 (프랑스 대혁명 시작)', // 프랑스 혁명
    '7월 혁명', // 프랑스 7월 혁명
    '2월 혁명', // 프랑스 2월 혁명
    '레닌의 사회주의 혁명', // 러시아 혁명 (볼셰비키 혁명)
    '제1차 페르시아의 그리스 침공', // 페르시아 전쟁
    '주가 폭락으로 대공황 시작', // 세계 경제 대공황
    '30년 전쟁 발발', // 베스트팔렌 조약 (30년 전쟁 종결)
    '베스트팔렌 조약 체결', // 베스트팔렌 조약 (30년 전쟁 종결)
    '미국 독립 승인', // 미국 독립 선언서 발표
    '함무라비 법전 편찬', // DB에 있음
    '인더스 문명 발생', // DB에 있음
    '파쇼다 사건 발발', // DB에 있음
    '정통 칼리프 시대', // DB에 있음 (정통 칼리프 시대 개막)
    '세포이 항쟁 발발', // DB에 있음
    '러일 전쟁', // DB에 있음
    '일본의 조선 국권 피탈', // DB에 있음 (조선)
    '신해혁명 발발', // DB에 있음 (신해혁명)
    '5·4 운동', // DB에 있음
    '만주 사변 발발', // DB에 있음 (만주 사변)
    '통킹만 사건 및 베트남 전쟁', // DB에 있음
    '문화 대혁명', // DB에 있음
    '로마 공화정 시작', // 로마 제정 수립과 유사하여 제외할까? 일단 유지.
    '로마와 카르타고의 포에니 전쟁', // 포에니 전쟁
    '서로마 제국 멸망', // 서로마 멸망
    '십자군 전쟁', // 십자군 전쟁
    '흑사병 유행', // 흑사병
    '동로마 제국 멸망', // 비잔티움 제국 멸망
    '나폴레옹 황제 즉위', // 나폴레옹 황제 즉위
    '사라예보 사건 발발', // 사라예보 사건
    '제1차 세계 대전', // 제1차 세계대전
    '소비에트 연방 수립', // 소비에트 연방
    '제2차 세계 대전 발발', // 제2차 세계대전
    '베를린 장벽 붕괴', // 베를린 장벽 붕괴
    '미국 독립 선언', // 미국 독립 선언서 발표
    '남북 전쟁', // 미국 남북 전쟁 발발
    '쿠바 미사일 위기', // 쿠바 미사일 위기
    '콜럼버스 출항', // 콜럼버스 아메리카 도달 (의미 동일)
    '마젤란 탐험대 세계 일주 성공', // 마젤란 함대 세계 일주 완료
    '정화의 대규모 남해 원정' // 명나라 건국과 정화의 원정
];

const finalNewEvents = userEventsRaw.filter(e => !manualExcludes.includes(e.title));

console.log('| 대륙 | 연도 | 사건명 | 지명 |');
console.log('| :--- | :--- | :--- | :--- |');
finalNewEvents.forEach(e => {
    console.log(`| ${e.continent} | ${e.year} | ${e.title} | ${e.location} |`);
});
