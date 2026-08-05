/* eslint-disable */
// @ts-nocheck

// ============================================================
// tanglishToTamil.tsx
// PURPOSE: Offline Tanglish (Tamil typed in English letters)
//          -> Tamil transliteration + ranked suggestions.
//
// No network calls: everything here is rule based plus a small
// dictionary, so the letters keep working on an offline machine.
//
// getTamilSuggestions("vanakkam")
//   -> ["வணக்கம்", "வநக்கம்", ... , "vanakkam"]
//
// The raw English word is ALWAYS returned as the last option so
// English names (Adinn, Gayathri) are one keystroke away.
// ============================================================

// ---------- Tamil building blocks ----------

const PULLI = "்"; // virama / dot above

// [tanglish, independent vowel, vowel sign]
const VOWELS = [
  ["ai", "ஐ", "ை"],
  ["au", "ஔ", "ௌ"],
  ["ow", "ஔ", "ௌ"],
  ["aa", "ஆ", "ா"],
  ["ae", "ஏ", "ே"],
  ["ee", "ஈ", "ீ"],
  ["ii", "ஈ", "ீ"],
  ["oo", "ஊ", "ூ"],
  ["uu", "ஊ", "ூ"],
  ["oa", "ஓ", "ோ"],
  ["a", "அ", ""],
  ["i", "இ", "ி"],
  ["u", "உ", "ு"],
  ["e", "எ", "ெ"],
  ["o", "ஒ", "ொ"],
];

// [tanglish, tamil consonant]
const CONSONANTS = [
  ["ksh", "க்ஷ"],
  ["sri", "ஸ்ரீ"],
  ["zh", "ழ"],
  ["ng", "ங"],
  ["nj", "ஞ"],
  ["ny", "ஞ"],
  ["ch", "ச"],
  ["sh", "ஷ"],
  ["th", "த"],
  ["dh", "த"],
  ["ph", "ப"],
  ["bh", "ப"],
  ["gh", "க"],
  ["kh", "க"],

  // Capitals are the usual Tanglish way of asking for the hard forms
  ["N", "ண"],
  ["L", "ள"],
  ["R", "ற"],
  ["T", "ட"],
  ["D", "ட"],

  ["k", "க"],
  ["g", "க"],
  ["c", "ச"],
  ["s", "ச"],
  ["j", "ஜ"],
  ["t", "ட"],
  ["d", "ட"],
  ["n", "ந"],
  ["p", "ப"],
  ["b", "ப"],
  ["m", "ம"],
  ["y", "ய"],
  ["r", "ர"],
  ["l", "ல"],
  ["v", "வ"],
  ["w", "வ"],
  ["h", "ஹ"],
  ["f", "ஃப"],
  ["x", "க்ஸ"],
  ["q", "க"],
  ["z", "ஸ"],
];

// Longest tokens must be tested first
const SORTED_VOWELS = [...VOWELS].sort((a, b) => b[0].length - a[0].length);
const SORTED_CONSONANTS = [...CONSONANTS].sort(
  (a, b) => b[0].length - a[0].length
);

// ---------- Small dictionary ----------
// Words that the plain rules cannot get right (mostly the
// ன/ண/ந, ல/ள/ழ and ர/ற choices), weighted towards the
// vocabulary used in these HR letters.

const DICTIONARY = {
  // document vocabulary
  velai: "வேலை",
  niyamana: "நியமன",
  niyamanam: "நியமனம்",
  opputhal: "ஒப்புதல்",
  matrum: "மற்றும்",
  urudhimozhi: "உறுதிமொழி",
  uruthimozhi: "உறுதிமொழி",
  naan: "நான்",
  merkanda: "மேற்கண்ட",
  vivarangalil: "விவரங்களில்",
  vivarangal: "விவரங்கள்",
  kurippidappattulla: "குறிப்பிடப்பட்டுள்ள",
  paniyalar: "பணியாளர்",
  paniyalargal: "பணியாளர்கள்",
  niruvanam: "நிறுவனம்",
  niruvanathil: "நிறுவனத்தில்",
  niruvanathin: "நிறுவனத்தின்",
  valangappattulla: "வழங்கப்பட்டுள்ள",
  paniyai: "பணியை",
  paniyil: "பணியில்",
  etrukkondu: "ஏற்றுக்கொண்டு",
  servatharku: "சேர்வதற்கு",
  enathu: "எனது",
  muzhumaiyana: "முழுமையான",
  muzhumaiyaga: "முழுமையாக",
  muzhu: "முழு",
  sammatham: "சம்மதம்",
  sammathathai: "சம்மதத்தை",
  sammathathudan: "சம்மதத்துடன்",
  ithan: "இதன்",
  moolam: "மூலம்",
  therivithu: "தெரிவித்து",
  kolgiren: "கொள்கிறேன்",
  vidhimuraigal: "விதிமுறைகள்",
  vidhimuraigalai: "விதிமுறைகளை",
  kolgaigal: "கொள்கைகள்",
  kolgaigalai: "கொள்கைகளை",
  nadaimuraigal: "நடைமுறைகள்",
  ozhungu: "ஒழுங்கு",
  vidhigalai: "விதிகளை",
  kadaipidippen: "கடைப்பிடிப்பேன்",
  avvappothu: "அவ்வப்போது",
  veliyidum: "வெளியிடும்",
  puthiya: "புதிய",
  thiruthangal: "திருத்தங்கள்",
  sutrarikkaigal: "சுற்றறிக்கைகள்",
  pinpatra: "பின்பற்ற",
  pinpatruven: "பின்பற்றுவேன்",
  oppukkolgiren: "ஒப்புக்கொள்கிறேன்",
  enakku: "எனக்கு",
  oppadaikkappadum: "ஒப்படைக்கப்படும்",
  sothukkal: "சொத்துக்கள்",
  karuvigal: "கருவிகள்",
  aavanangal: "ஆவணங்கள்",
  ragasiya: "ரகசிய",
  thagavalgal: "தகவல்கள்",
  thagavalgalai: "தகவல்களை",
  paathukappathu: "பாதுகாப்பது",
  paathukappu: "பாதுகாப்பு",
  poruppagum: "பொறுப்பாகும்",
  poruppu: "பொறுப்பு",
  panineram: "பணிநேரம்",
  ozhukkam: "ஒழுக்கம்",
  thozhilmurai: "தொழில்முறை",
  nadatthai: "நடத்தை",
  aagiyavatrai: "ஆகியவற்றை",
  meeruvathu: "மீறுவது",
  nadavadikkai: "நடவடிக்கை",
  nadavadikkaikku: "நடவடிக்கைக்கு",
  utpattathaga: "உட்பட்டதாக",
  irukkum: "இருக்கும்",
  enbathai: "என்பதை",
  purinthukolgiren: "புரிந்துகொள்கிறேன்",
  purinthukondu: "புரிந்துகொண்டு",
  arivippu: "அறிவிப்பு",
  nibandhanaigal: "நிபந்தனைகள்",
  nibandhanaigalaiyum: "நிபந்தனைகளையும்",
  padithu: "படித்து",
  etrukkolgiren: "ஏற்றுக்கொள்கிறேன்",
  anaithu: "அனைத்து",

  // words the plain rules cannot reach (two ambiguities at once)
  tamil: "தமிழ்",
  thamizh: "தமிழ்",
  thanni: "தண்ணி",
  kelvi: "கேள்வி",
  appa: "அப்பா",
  amma: "அம்மா",
  kanavu: "கனவு",
  manam: "மனம்",
  panam: "பணம்",
  kann: "கண்",
  pen: "பெண்",
  aan: "ஆண்",
  ellam: "எல்லாம்",
  kaalam: "காலம்",
  ulagam: "உலகம்",
  vaazhthu: "வாழ்த்து",
  vazhi: "வழி",
  mudivu: "முடிவு",
  thodarbu: "தொடர்பு",
  seyalpadu: "செயல்படு",

  // ---- personal names ----
  // Only one spelling is needed per name: the fuzzy index below
  // matches "Karthiyayini", "Kaarthiyaayini", "Karthiyaayini" etc.
  karthiyayini: "கார்த்தியாயினி",
  karthik: "கார்த்திக்",
  karthikeyan: "கார்த்திகேயன்",
  gayathri: "காயத்ரி",
  saravanan: "சரவணன்",
  meena: "மீனா",
  lakshmi: "லட்சுமி",
  murugan: "முருகன்",
  sathish: "சதீஷ்",
  vignesh: "விக்னேஷ்",
  varshini: "வர்ஷினி",
  nandhini: "நந்தினி",
  revathi: "ரேவதி",
  thangam: "தங்கம்",
  selvi: "செல்வி",
  bharathi: "பாரதி",
  ramesh: "ரமேஷ்",
  suresh: "சுரேஷ்",
  rajesh: "ராஜேஷ்",
  priya: "பிரியா",
  divya: "திவ்யா",
  kavitha: "கவிதா",
  anitha: "அனிதா",
  deepa: "தீபா",
  praveen: "பிரவீன்",
  vijay: "விஜய்",
  ajith: "அஜித்",
  ranjith: "ரஞ்சித்",
  sundar: "சுந்தர்",
  kannan: "கண்ணன்",
  palani: "பழனி",
  chitra: "சித்ரா",
  malar: "மலர்",
  tamilselvi: "தமிழ்செல்வி",
  arun: "அருண்",
  balaji: "பாலாஜி",
  dinesh: "தினேஷ்",
  ganesh: "கணேஷ்",
  hari: "ஹரி",
  harini: "ஹரிணி",
  jayanthi: "ஜெயந்தி",
  janani: "ஜனனி",
  kamala: "கமலா",
  latha: "லதா",
  mani: "மணி",
  manikandan: "மணிகண்டன்",
  nirmala: "நிர்மலா",
  raja: "ராஜா",
  sasi: "சசி",
  uma: "உமா",
  valli: "வள்ளி",
  muthu: "முத்து",
  senthil: "செந்தில்",
  prabhu: "பிரபு",
  vasanth: "வசந்த்",
  yuvaraj: "யுவராஜ்",
  abinaya: "அபிநயா",
  keerthana: "கீர்த்தனா",
  sowmya: "சௌம்யா",
  sathya: "சத்யா",
  vimala: "விமலா",
  devi: "தேவி",
  soundarapandian: "சௌந்தரபாண்டியன்",
  veerasanjay: "வீரசஞ்சய்",

  // ---- designations ----
  melalar: "மேலாளர்",
  pothumelalar: "பொது மேலாளர்",
  muthamelalar: "மூத்த மேலாளர்",
  niruvagi: "நிர்வாகி",
  muthaniruvagi: "மூத்த நிர்வாகி",
  kanakkalar: "கணக்காளர்",
  vadivamaippalar: "வடிவமைப்பாளர்",
  muthavadivamaippalar: "மூத்த வடிவமைப்பாளர்",
  vitpanaiyalar: "விற்பனையாளர்",
  seyalalar: "செயலாளர்",
  udhaviyalar: "உதவியாளர்",
  pathivalar: "பதிவாளர்",
  aaraichiyalar: "ஆராய்ச்சியாளர்",
  payirchiyalar: "பயிற்சியாளர்",
  aaloli: "ஆலோசகர்",
  aalosagar: "ஆலோசகர்",
  kanini: "கணினி",
  thalaimai: "தலைமை",
  udhavi: "உதவி",
  mutha: "மூத்த",

  // everyday / office words
  vanakkam: "வணக்கம்",
  nandri: "நன்றி",
  peyar: "பெயர்",
  pathavi: "பதவி",
  thethi: "தேதி",
  naal: "நாள்",
  maatham: "மாதம்",
  aandu: "ஆண்டு",
  indru: "இன்று",
  naalai: "நாளை",
  kaiyeluthu: "கையெழுத்து",
  kaiyoppam: "கையொப்பம்",
  aluvalagam: "அலுவலகம்",
  melalar: "மேலாளர்",
  thurai: "துறை",
  kilai: "கிளை",
  sambalam: "சம்பளம்",
  viduppu: "விடுப்பு",
  palan: "பலன்",
  thiru: "திரு",
  thirumathi: "திருமதி",
  selvi: "செல்வி",
  ungal: "உங்கள்",
  engal: "எங்கள்",
  avar: "அவர்",
  ivar: "இவர்",
  nalvazhthukkal: "நல்வாழ்த்துக்கள்",
  seyalar: "செயலர்",
  managar: "மேலாளர்",
  kanakku: "கணக்கு",
  vangi: "வங்கி",
  mudhalalai: "முதலாளி",
  oppantham: "ஒப்பந்தம்",
  seythi: "செய்தி",
  vilakkam: "விளக்கம்",
  patri: "பற்றி",
  enna: "என்ன",
  epadi: "எப்படி",
  eppothu: "எப்போது",
};

// ---------- Fuzzy dictionary index ----------
// English spellings of Tamil names drop long vowels and doubled
// consonants almost at random: Karthiyayini / Kaarthiyaayini /
// Karthiyaayini are all the same name. Squash every spelling down
// to one skeleton so a single dictionary entry catches them all.

const fuzzyKey = (word) => {
  return String(word || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    // digraphs first
    .replace(/zh/g, "l")
    .replace(/th/g, "t")
    .replace(/dh/g, "t")
    .replace(/ph/g, "p")
    .replace(/bh/g, "p")
    .replace(/gh/g, "k")
    .replace(/kh/g, "k")
    .replace(/ch/g, "s")
    .replace(/sh/g, "s")
    // long vowels collapse to short
    .replace(/aa/g, "a")
    .replace(/ee/g, "i")
    .replace(/ii/g, "i")
    .replace(/oo/g, "u")
    .replace(/uu/g, "u")
    // voiced / voiceless pairs are not distinguished in Tamil
    .replace(/[gk]/g, "k")
    .replace(/[bp]/g, "p")
    .replace(/[dt]/g, "t")
    .replace(/[cs]/g, "s")
    .replace(/[vw]/g, "v")
    .replace(/h/g, "")
    // finally, any doubled letter becomes single
    .replace(/(.)\1+/g, "$1");
};

const FUZZY_INDEX = (() => {
  const index = {};

  Object.keys(DICTIONARY).forEach((entry) => {
    const key = fuzzyKey(entry);

    if (!key) return;
    if (!index[key]) index[key] = [];

    if (!index[key].includes(DICTIONARY[entry])) {
      index[key].push(DICTIONARY[entry]);
    }
  });

  return index;
})();

// ---------- Core transliteration ----------

// "Name" -> "name" but "vaNakkam" keeps its capital N, because the
// capital is how the writer asks for ண. An all caps word is treated
// as plain lower case.
const normaliseWord = (word) => {
  if (word.length > 1 && word === word.toUpperCase()) {
    return word.toLowerCase();
  }

  return word.charAt(0).toLowerCase() + word.slice(1);
};

const matchToken = (table, text, index) => {
  for (let i = 0; i < table.length; i++) {
    const token = table[i][0];

    if (text.startsWith(token, index)) {
      return table[i];
    }
  }

  return null;
};

// A Tamil word never begins with these letters, so whatever the
// rules produced for the very first letter has to soften.
// (This is what turns "tamil" into தமிழ் instead of டமிழ்.)
const WORD_INITIAL_SOFTENING = {
  "ட": "த",
  "ண": "ந",
  "ற": "ர",
  "ழ": "ல",
  "ள": "ல",
  "ன": "ந",
};

// Decide which n-sound is meant from what follows it
const resolveNasal = (text, index) => {
  const rest = text.slice(index + 1);

  if (!rest) return "ன"; // word final -> ன
  if (rest.startsWith("th") || rest.startsWith("dh")) return "ந";
  if (rest.startsWith("ch") || rest.startsWith("j")) return "ஞ";
  if (/^[gk]/.test(rest)) return "ங";
  if (/^[tdTD]/.test(rest)) return "ண";
  if (rest.startsWith("n")) return "ன"; // "enna" -> என்ன

  return "ந";
};

/**
 * Transliterate one Tanglish word.
 * `overrides` forces a specific Tamil letter for a single-letter
 * token, e.g. { n: "ண", l: "ழ" }. That is how the alternate
 * suggestions are produced.
 */
export const transliterateWord = (rawWord, overrides = {}) => {
  if (!rawWord) return "";

  const word = normaliseWord(rawWord);

  let out = "";
  let index = 0;
  let atWordStart = true;
  let previousConsonantToken = null;
  let previousConsonantLetter = null;

  while (index < word.length) {
    const consonant = matchToken(SORTED_CONSONANTS, word, index);

    if (consonant) {
      const [token] = consonant;
      let letter = consonant[1];

      // A doubled consonant keeps whatever the first one resolved to
      if (token === previousConsonantToken && previousConsonantLetter) {
        letter = previousConsonantLetter;
      } else if (overrides[token]) {
        letter = overrides[token];
      } else if (token === "n") {
        letter = resolveNasal(word, index);
      }

      // Nothing emitted yet means this is the first letter of the word.
      // Loanwords (டாக்டர், டீ) are the exception, so the caller can
      // ask for the hard reading instead.
      if (
        out === "" &&
        overrides.__initial !== "hard" &&
        WORD_INITIAL_SOFTENING[letter]
      ) {
        letter = WORD_INITIAL_SOFTENING[letter];
      }

      index += token.length;

      const vowel = matchToken(SORTED_VOWELS, word, index);

      if (vowel) {
        out += letter + vowel[2];
        index += vowel[0].length;
      } else {
        out += letter + PULLI;
      }

      previousConsonantToken = token;
      previousConsonantLetter = letter;
      atWordStart = false;
      continue;
    }

    const vowel = matchToken(SORTED_VOWELS, word, index);

    if (vowel) {
      out += vowel[1]; // independent form
      index += vowel[0].length;
      previousConsonantToken = null;
      previousConsonantLetter = null;
      atWordStart = false;
      continue;
    }

    // Anything we do not understand (digits, punctuation) passes through
    out += word.charAt(index);
    index += 1;
    previousConsonantToken = null;
    previousConsonantLetter = null;
  }

  return out;
};

// The alternate readings worth offering, in the order people
// usually want them.
const VARIANT_SETS = [
  // loanwords that really do start hard: doctor -> டாக்டர்
  // (collapses into the primary for native words, so it costs nothing)
  { __initial: "hard" },
  { n: "ண" },
  { l: "ள" },
  { l: "ழ" },
  { r: "ற" },
  { n: "ன" },
  { t: "த", d: "த" },
  { s: "ஸ" },
  { n: "ண", l: "ள" },
  { n: "ன", r: "ற" },
];

/**
 * Ranked Tamil candidates for a Tanglish word.
 * Dictionary hits first, then the rule based reading, then the
 * common alternate readings, and finally the untouched English word.
 */
export const getTamilSuggestions = (rawWord, limit = 6) => {
  const word = String(rawWord || "").trim();

  if (!word) return [];

  const results = [];

  const push = (candidate) => {
    if (!candidate) return;
    if (results.includes(candidate)) return;
    results.push(candidate);
  };

  const key = word.toLowerCase();

  // 1. exact dictionary hit
  if (DICTIONARY[key]) {
    push(DICTIONARY[key]);
  }

  // 2. same word spelled differently ("Karthiyayini" -> கார்த்தியாயினி)
  const fuzzyHits = FUZZY_INDEX[fuzzyKey(word)];

  if (fuzzyHits) {
    fuzzyHits.forEach(push);
  }

  // 3. plain rule based reading.
  //    This comes before the prefix hits, otherwise a complete short
  //    word ("kai") gets buried under longer words that merely start
  //    with it ("kaiyoppam").
  push(transliterateWord(word));

  // 4. dictionary words that start with what has been typed so far
  if (key.length >= 2) {
    const prefixHits = Object.keys(DICTIONARY)
      .filter((entry) => entry !== key && entry.startsWith(key))
      .sort((a, b) => a.length - b.length)
      .slice(0, 3);

    prefixHits.forEach((entry) => push(DICTIONARY[entry]));
  }

  // 4. common alternate readings
  VARIANT_SETS.forEach((overrides) => {
    if (results.length >= limit) return;
    push(transliterateWord(word, overrides));
  });

  const trimmed = results.slice(0, limit);

  // 5. the English word itself, always available
  if (!trimmed.includes(word)) {
    trimmed.push(word);
  }

  return trimmed;
};

/**
 * Transliterate a whole sentence in one go (used by the
 * "convert everything" button). Dictionary first, rules after.
 */
export const transliterateSentence = (text) => {
  return String(text || "").replace(/[A-Za-z]+/g, (word) => {
    const key = word.toLowerCase();

    if (DICTIONARY[key]) {
      return DICTIONARY[key];
    }

    return transliterateWord(word);
  });
};

export default getTamilSuggestions;
