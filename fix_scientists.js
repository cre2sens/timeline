import fs from 'fs';
import path from 'path';

const peoplePath = path.join(process.cwd(), 'src/data/people.json');
const mediaPath = path.join(process.cwd(), 'src/data/media.json');

try {
  // 1. 사람 데이터 로드
  const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

  // 카테고리 수정 (thinker -> scientist for science history batch)
  // 과학자 데이터들은 ID가 "person_sci_" 형식인가? 이전에 추가했던 부분 확인 필요.
  // 이전에 어떻게 추가되었는지 정확히 모르지만, name이나 id를 보고 수정 가능.
  // 간단하게 100건 배치로 추가된 인물 중 'sci_' 로 시작하거나 특정 항목들을 찾아 scientist로 변경
  let scientistCount = 0;
  peopleData.forEach(person => {
    // 만약 thinker 이면서 id가 sci_ 로 시작하거나, 그 외 특정 과학자라면
    if (person.category === 'thinker' && person.id.includes('sci_')) {
      person.category = 'scientist';
      scientistCount++;
    }
  });

  // 'sci_' 외에 다른 아이디 형식이 사용되었는지 확인하기 위해 
  // 최근에 추가된 100명을 대략적으로 필터링. (기존 조선 왕들은 person_ 으로 시작)
  peopleData.forEach(person => {
    const isScientist = [
      'newton', 'einstein', 'darwin', 'curie', 'galileo', 'tesla', 'hawking', 'sagan', 'turing'
    ].some(name => person.id.toLowerCase().includes(name));
    
    if (isScientist && person.category !== 'scientist') {
      person.category = 'scientist';
      scientistCount++;
    }
  });

  console.log(`Updated ${scientistCount} people to 'scientist' category.`);

  fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

  // 2. 미디어 데이터 로드
  const mediaData = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));

  // 추가할 과학 영화/다큐/책 미디어
  const newMedia = [
    {
      "id": "media_movie_oppenheimer",
      "type": "movie",
      "title": { "ko": "오펜하이머", "en": "Oppenheimer" },
      "releaseYear": 2023,
      "director": "Christopher Nolan"
    },
    {
      "id": "media_movie_imitation_game",
      "type": "movie",
      "title": { "ko": "이미테이션 게임", "en": "The Imitation Game" },
      "releaseYear": 2014,
      "director": "Morten Tyldum"
    },
    {
      "id": "media_movie_theory_of_everything",
      "type": "movie",
      "title": { "ko": "사랑에 대한 모든 것", "en": "The Theory of Everything" },
      "releaseYear": 2014,
      "director": "James Marsh"
    },
    {
      "id": "media_movie_hidden_figures",
      "type": "movie",
      "title": { "ko": "히든 피겨스", "en": "Hidden Figures" },
      "releaseYear": 2016,
      "director": "Theodore Melfi"
    },
    {
      "id": "media_movie_radioactive",
      "type": "movie",
      "title": { "ko": "마리 퀴리", "en": "Radioactive" },
      "releaseYear": 2019,
      "director": "Marjane Satrapi"
    },
    {
      "id": "media_movie_tesla",
      "type": "movie",
      "title": { "ko": "테슬라", "en": "Tesla" },
      "releaseYear": 2020,
      "director": "Michael Almereyda"
    },
    {
      "id": "media_movie_beautiful_mind",
      "type": "movie",
      "title": { "ko": "뷰티풀 마인드", "en": "A Beautiful Mind" },
      "releaseYear": 2001,
      "director": "Ron Howard"
    },
    {
      "id": "media_docu_cosmos",
      "type": "movie",
      "title": { "ko": "코스모스 (다큐멘터리)", "en": "Cosmos: A Spacetime Odyssey" },
      "releaseYear": 2014,
      "director": "Brannon Braga"
    },
    {
      "id": "media_book_brief_history",
      "type": "novel",
      "title": { "ko": "시간의 역사", "en": "A Brief History of Time" },
      "releaseYear": 1988,
      "author": "Stephen Hawking"
    },
    {
      "id": "media_book_selfish_gene",
      "type": "novel",
      "title": { "ko": "이기적 유전자", "en": "The Selfish Gene" },
      "releaseYear": 1976,
      "author": "Richard Dawkins"
    },
    {
      "id": "media_book_origin_of_species",
      "type": "novel",
      "title": { "ko": "종의 기원", "en": "On the Origin of Species" },
      "releaseYear": 1859,
      "author": "Charles Darwin"
    }
  ];

  let addedMediaCount = 0;
  newMedia.forEach(m => {
    if (!mediaData.find(ex => ex.id === m.id)) {
      mediaData.push(m);
      addedMediaCount++;
    }
  });

  console.log(`Added ${addedMediaCount} new media items.`);
  fs.writeFileSync(mediaPath, JSON.stringify(mediaData, null, 2));

  // 3. 인물과 미디어 연결
  let linkedCount = 0;
  
  const linkMedia = (personIdMatch, mediaId) => {
    const person = peopleData.find(p => p.id.toLowerCase().includes(personIdMatch));
    if (person) {
      if (!person.relatedMedia) person.relatedMedia = [];
      if (!person.relatedMedia.includes(mediaId)) {
        person.relatedMedia.push(mediaId);
        linkedCount++;
      }
    }
  };

  linkMedia('oppenheimer', 'media_movie_oppenheimer');
  linkMedia('turing', 'media_movie_imitation_game');
  linkMedia('hawking', 'media_movie_theory_of_everything');
  linkMedia('hawking', 'media_book_brief_history');
  linkMedia('curie', 'media_movie_radioactive');
  linkMedia('tesla', 'media_movie_tesla');
  linkMedia('nash', 'media_movie_beautiful_mind');
  linkMedia('sagan', 'media_docu_cosmos');
  linkMedia('dawkins', 'media_book_selfish_gene');
  linkMedia('darwin', 'media_book_origin_of_species');
  linkMedia('katherine', 'media_movie_hidden_figures');
  linkMedia('johnson', 'media_movie_hidden_figures');

  console.log(`Linked media to ${linkedCount} people.`);
  fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));

} catch (err) {
  console.error("Error:", err);
}
