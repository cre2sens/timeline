const fs = require('fs');

const eventsPath = 'c:/coding/timeline/src/data/events.json';
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const newEventsRaw = [
    { continent: '아프리카 및 서아시아', year: '약 41억 년 전', title: '인류 최초의 생명체 탄생', location: '바다' },
    { continent: '아프리카 및 서아시아', year: '약 400만 년 전', title: '오스트랄로피테쿠스 등장', location: '아프리카' },
    { continent: '아프리카 및 서아시아', year: '기원전 1만 년 무렵', title: '농경과 목축의 시작', location: '서아시아' },
    { continent: '아프리카 및 서아시아', year: '기원전 5000년 무렵', title: '나일강 유역 농경 생활 시작', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '기원전 3500년 무렵', title: '수메르인 최초의 도시 국가 탄생', location: '메소포타미아' },
    { continent: '아프리카 및 서아시아', year: '기원전 3100년 무렵', title: '상하 이집트 통일', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '기원전 1500년 무렵', title: '히타이트, 아시리아 등 여러 왕국 등장', location: '서아시아' },
    { continent: '아프리카 및 서아시아', year: '기원전 1200년 무렵', title: '역사 기록이 남지 않은 암흑시대 시작', location: '서아시아' },
    { continent: '아프리카 및 서아시아', year: '기원전 6세기 무렵', title: '아케메네스 왕조 페르시아 건국', location: '페르시아 제국' },
    { continent: '아프리카 및 서아시아', year: '661~750년', title: '우마이야 왕조 세워짐', location: '아라비아 반도' },
    { continent: '아프리카 및 서아시아', year: '1869년', title: '수에즈 운하 개통', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '1882년', title: '영국의 이집트 점령 시작', location: '이집트' },
    { continent: '아프리카 및 서아시아', year: '1948년', title: '이스라엘 건국', location: '팔레스타인' },
    { continent: '아프리카 및 서아시아', year: '1948년', title: '제1차 중동 전쟁', location: '이스라엘 및 주변국' },
    { continent: '아프리카 및 서아시아', year: '1956년', title: '제2차 중동 전쟁', location: '이집트 시나이반도' },
    { continent: '아프리카 및 서아시아', year: '1967년', title: '제3차 중동 전쟁', location: '이스라엘, 시리아 등' },
    { continent: '아프리카 및 서아시아', year: '1973년', title: '제4차 중동 전쟁', location: '이스라엘 및 아랍 국가' },
    { continent: '아시아', year: '기원전 7000~6000년 무렵', title: '황허강 등 신석기 문화 발생', location: '중국' },
    { continent: '아시아', year: '기원전 2000년 무렵', title: '중국 최고 고대 왕조 하나라 성립', location: '중국 황허강' },
    { continent: '아시아', year: '기원전 1046년', title: '주나라에 의한 상나라 멸망', location: '중국' },
    { continent: '아시아', year: '기원전 1000년 무렵', title: '아리아인 갠지스강 진출 및 브라만교 형성', location: '인도' },
    { continent: '아시아', year: '기원전 770년 무렵', title: '춘추 시대 시작', location: '중국 낙읍' },
    { continent: '아시아', year: '4세기 무렵', title: '야마토 정권 통일', location: '일본' },
    { continent: '아시아', year: '618년', title: '수나라 멸망', location: '중국' },
    { continent: '아시아', year: '710년', title: '수도를 헤이조쿄로 천도', location: '일본' },
    { continent: '아시아', year: '1616년 이후', title: '누르하치의 후금 건국', location: '중국 만주' },
    { continent: '아시아', year: '1653년', title: '하멜 일행 표류', location: '조선 제주도' },
    { continent: '아시아', year: '1854년', title: '페리 제독에 의한 강제 개항', location: '일본' },
    { continent: '아시아', year: '1971년', title: '미국과 중국의 핑퐁 외교', location: '중국' },
    { continent: '유럽', year: '기원전 490년', title: '마라톤 전투 승리', location: '그리스 아테네' },
    { continent: '유럽', year: '1497년', title: '바스쿠 다가마 인도 항로 개척 출항', location: '포르투갈' },
    { continent: '유럽', year: '1733년', title: '존 케이의 플라잉 셔틀 발명', location: '영국' },
    { continent: '유럽', year: '1769년', title: '제임스 와트 증기 기관 개량', location: '영국' },
    { continent: '유럽', year: '1793년', title: '루이 16세 처형', location: '프랑스' },
    { continent: '유럽', year: '1814년', title: '조지 스티븐슨 증기 기관차 발명', location: '영국' },
    { continent: '유럽', year: '1944년 6월 6일', title: '노르망디 상륙 작전', location: '프랑스 노르망디' },
    { continent: '유럽', year: '1945년 4월 30일 무렵', title: '히틀러 자살 및 독일 항복', location: '독일 베를린' },
    { continent: '유럽', year: '1957년', title: '최초 인공위성 스푸트니크 호 발사', location: '소련' },
    { continent: '유럽', year: '1968년 5월', title: '68 혁명 발발', location: '프랑스 파리' },
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
    { continent: '아메리카', year: '1781년', title: '요크타운 전투 승리', location: '미국' },
    { continent: '아메리카', year: '1787년', title: '미국 독립 선언 헌법 제정', location: '미국' },
    { continent: '아메리카', year: '1789년 4월 30일', title: '조지 워싱턴 초대 대통령 취임', location: '미국 뉴욕' },
    { continent: '아메리카', year: '1803년', title: '루이지애나 매입', location: '미국' },
    { continent: '아메리카', year: '1804년', title: '라틴아메리카 최초 흑인 공화국 독립', location: '아이티' },
    { continent: '아메리카', year: '1807년', title: '로버트 풀턴의 증기선 발명', location: '미국' },
    { continent: '아메리카', year: '1823년', title: '먼로 선언', location: '미국' },
    { continent: '아메리카', year: '1830년대', title: '원주민 강제 이주법 본격화', location: '미국' },
    { continent: '아메리카', year: '1863년', title: '링컨 노예 해방 선언', location: '미국' },
    { continent: '아메리카', year: '1869년', title: '미국 대륙 횡단 철도 완성', location: '미국' },
    { continent: '아메리카', year: '1903년', title: '라이트 형제 비행기 최초 비행 성공', location: '미국' }
];

const coordMap = {
    '바다': { lat: 0, lng: 0 },
    '아프리카': { lat: 0, lng: 20 },
    '서아시아': { lat: 32, lng: 40 },
    '이집트': { lat: 30, lng: 31 },
    '메소포타미아': { lat: 33, lng: 44 },
    '페르시아 제국': { lat: 32, lng: 53 },
    '아라비아 반도': { lat: 24, lng: 45 },
    '팔레스타인': { lat: 31.5, lng: 35 },
    '이스라엘 및 주변국': { lat: 31.5, lng: 35 },
    '이집트 시나이반도': { lat: 29.5, lng: 33.8 },
    '이스라엘, 시리아 등': { lat: 33, lng: 36 },
    '중국': { lat: 35, lng: 105 },
    '인더스강 유역': { lat: 27, lng: 68 },
    '중국 황허강': { lat: 36, lng: 110 },
    '인도': { lat: 20, lng: 78 },
    '중국 낙읍': { lat: 34.6, lng: 112.4 },
    '일본': { lat: 36, lng: 138 },
    '중국 만주': { lat: 43, lng: 125 },
    '조선 제주도': { lat: 33.5, lng: 126.5 },
    '그리스 아테네': { lat: 37.9, lng: 23.7 },
    '포르투갈': { lat: 38.7, lng: -9.1 },
    '영국': { lat: 55, lng: -3 },
    '프랑스': { lat: 46, lng: 2 },
    '프랑스 노르망디': { lat: 49.1, lng: -0.3 },
    '독일 베를린': { lat: 52.5, lng: 13.4 },
    '소련': { lat: 60, lng: 90 },
    '러시아': { lat: 61, lng: 105 },
    '프랑스 파리': { lat: 48.8, lng: 2.3 },
    '메소아메리카 일대': { lat: 19, lng: -99 },
    '안데스산맥': { lat: -15, lng: -75 },
    '멕시코 오악사카': { lat: 17, lng: -96.7 },
    '멕시코': { lat: 23, lng: -102 },
    '페루': { lat: -9, lng: -75 },
    '볼리비아 포토시': { lat: -19.5, lng: -65.7 },
    '북아메리카 퀘벡': { lat: 52, lng: -71 },
    '미국 보스턴': { lat: 42.3, lng: -71 },
    '미국 필라델피아': { lat: 39.9, lng: -75.1 },
    '미국 보스턴 외곽': { lat: 42.4, lng: -71.2 },
    '미국': { lat: 37, lng: -95 },
    '미국 뉴욕': { lat: 40.7, lng: -74 },
    '아이티': { lat: 18.9, lng: -72.2 }
};

const regionMap = {
    '아프리카 및 서아시아': 'middleEast',
    '아시아': 'eastAsia',
    '유럽': 'europe',
    '아메리카': 'america'
};

function parseYear(yearStr) {
    let start = "";
    let end = "";
    
    if (yearStr.includes('41억 년 전')) {
        start = "-4100000000-01-01";
        end = "-4100000000-01-01";
    } else if (yearStr.includes('400만 년 전')) {
        start = "-4000000-01-01";
        end = "-4000000-01-01";
    } else if (yearStr.includes('기원전 1만 년')) {
        start = "-10000-01-01";
        end = "-10000-01-01";
    } else if (yearStr.includes('기원전')) {
        let match = yearStr.match(/기원전\s*(\d+)년/);
        if (match) {
            let y = match[1].padStart(4, '0');
            start = `-${y}-01-01`;
            end = `-${y}-01-01`;
        } else {
            let matchCentury = yearStr.match(/기원전\s*(\d+)세기/);
            if (matchCentury) {
                let y = (parseInt(matchCentury[1]) * 100).toString().padStart(4, '0');
                start = `-${y}-01-01`;
                end = `-${y}-01-01`;
            } else {
                // Fallback for ranges like 7000~6000
                let matchRange = yearStr.match(/기원전\s*(\d+)~(\d+)년/);
                if (matchRange) {
                    start = `-${matchRange[1].padStart(4, '0')}-01-01`;
                    end = `-${matchRange[2].padStart(4, '0')}-01-01`;
                }
            }
        }
    } else if (yearStr.includes('~')) {
        let match = yearStr.match(/(\d+)~(\d+)년/);
        if (match) {
            start = `${match[1].padStart(4, '0')}-01-01`;
            end = `${match[2].padStart(4, '0')}-01-01`;
        }
    } else {
        let match = yearStr.match(/(\d+)년/);
        if (match) {
            let y = match[1].padStart(4, '0');
            start = `${y}-01-01`;
            end = `${y}-01-01`;
        }
    }
    
    return { start, end };
}

function getEra(startYear) {
    if (startYear.startsWith('-')) {
        let y = parseInt(startYear);
        if (y < -3000) return 'ancient'; // Prehistoric
        return 'ancient';
    }
    let y = parseInt(startYear);
    if (y < 1453) return 'medieval';
    if (y < 1800) return 'earlyModern';
    if (y < 1945) return 'modern';
    return 'contemporary';
}

const preparedEvents = newEventsRaw.map((e, index) => {
    const dates = parseYear(e.year);
    const coords = coordMap[e.location] || { lat: 0, lng: 0 };
    const era = getEra(dates.start);
    const category = (e.title.includes('전쟁') || e.title.includes('침공') || e.title.includes('항쟁') || e.title.includes('공격')) ? 'war' : 'politics';
    
    return {
        id: `event_new_${Date.now()}_${index}`,
        type: "event",
        date: {
            start: dates.start,
            end: dates.end
        },
        era: era,
        location: {
            name: {
                ko: e.location,
                en: ""
            },
            coordinates: coords,
            region: regionMap[e.continent] || "unknown"
        },
        title: {
            ko: e.title,
            en: ""
        },
        description: {
            ko: `${e.year} ${e.location}에서 발생한 ${e.title}`,
            en: ""
        },
        category: category,
        relatedPeople: [],
        relatedEvents: [],
        relatedMedia: [],
        wikipedia: {
            ko: e.title,
            en: ""
        },
        icon: category === 'war' ? '⚔️' : '📜',
        importance: 3
    };
});

const updatedEvents = [...events, ...preparedEvents];
fs.writeFileSync(eventsPath, JSON.stringify(updatedEvents, null, 2), 'utf8');

console.log(`Successfully added ${preparedEvents.length} new events to events.json.`);
