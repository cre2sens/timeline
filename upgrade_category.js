import fs from 'fs';
import path from 'path';

const peoplePath = path.join(process.cwd(), 'src/data/people.json');
const peopleData = JSON.parse(fs.readFileSync(peoplePath, 'utf8'));

// Scientists to upgrade from thinker to scientist.
const scienceIds = [
  "person_thales", "person_pythagoras", "person_archimedes", "person_euclid", 
  "person_hippocrates", "person_ptolemy", "person_jang_yeong_sil", "person_al_khwarizmi", 
  "person_ibn_sina", "person_da_vinci", "person_galileo", "person_kepler", 
  "person_william_harvey", "person_descartes", "person_huygens", 
  // From other batches
  "person_isaac_newton", "person_robert_boyle", "person_antonie_van_leeuwenhoek",
  "person_edmond_halley", "person_benjamin_franklin", "person_carl_linnaeus",
  "person_antoine_lavoisier", "person_edward_jenner", "person_william_herschel",
  "person_michael_faraday", "person_charles_darwin", "person_louis_pasteur",
  "person_gregor_mendel", "person_dmitri_mendeleev", "person_james_clerk_maxwell",
  "person_marie_curie", "person_albert_einstein", "person_nikola_tesla",
  "person_niels_bohr", "person_max_planck", "person_erwin_schrodinger",
  "person_werner_heisenberg", "person_richard_feynman", "person_stephen_hawking",
  "person_carl_sagan", "person_alan_turing", "person_john_von_neumann",
  "person_katherine_johnson", "person_rosalind_franklin", "person_jane_goodall",
  "person_tim_berners_lee", "person_ada_lovelace", "person_mary_anning",
  "person_alexander_fleming", "person_jonas_salk", "person_thomas_edison",
  "person_guglielmo_marconi", "person_wright_brothers", "person_enrico_fermi",
  "person_j_robert_oppenheimer", "person_edwin_hubble", "person_georges_lemaitre",
  "person_subrahmanyan_chandrasekhar", "person_kip_thorne", "person_roger_penrose"
];

let updatedCount = 0;
peopleData.forEach(p => {
  if (p.category === 'thinker' && scienceIds.some(sid => p.id === sid || p.id.includes(sid.replace('person_', '')))) {
    p.category = 'scientist';
    updatedCount++;
  } else if (p.category === 'thinker') {
     const isSci = ['newton', 'einstein', 'darwin', 'curie', 'galileo', 'tesla', 'hawking', 'sagan', 'turing', 'oppenheimer', 'johnson', 'feynman', 'maxwell', 'kepler', 'copernicus', 'pascal', 'mendel', 'pasteur', 'franklin', 'lovelace', 'babbage', 'nash', 'hubble', 'bohr', 'planck', 'faraday', 'rutherford', 'lavoisier', 'mendeleev', 'huygens', 'euler', 'gauss', 'riemann', 'fibonacci', 'ptolemy', 'aristarchus', 'eratosthenes', 'archimedes', 'hippocrates', 'euclid', 'pythagoras', 'thales'].some(name => p.id.toLowerCase().includes(name));
     if (isSci) {
        p.category = 'scientist';
        updatedCount++;
     }
  }
});

console.log(`Upgraded ${updatedCount} people from thinker to scientist.`);
fs.writeFileSync(peoplePath, JSON.stringify(peopleData, null, 2));
