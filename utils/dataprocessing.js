const country_lang = require('./country_languages.js');

const indexed_country = require('./countryindexed.js');

const LANGS = {
  'auto-detect': 'Auto-detect',
  af: 'Afrikaans',
  am: 'Amharic',
  ar: 'Arabic',
  as: 'Assamese',
  az: 'Azerbaijani',
  bg: 'Bulgarian',
  bn: 'Bangla',
  bs: 'Bosnian',
  ca: 'Catalan',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  en: 'English',
  es: 'Spanish',
  et: 'Estonian',
  fa: 'Persian',
  fi: 'Finnish',
  fil: 'Filipino',
  fj: 'Fijian',
  fr: 'French',
  'fr-CA': 'French (Canada)',
  ga: 'Irish',
  gu: 'Gujarati',
  he: 'Hebrew',
  hi: 'Hindi',
  hr: 'Croatian',
  ht: 'Haitian Creole',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  iu: 'Inuktitut',
  ja: 'Japanese',
  kk: 'Kazakh',
  km: 'Khmer',
  kmr: 'Kurdish (Northern)',
  kn: 'Kannada',
  ko: 'Korean',
  ku: 'Kurdish (Central)',
  lo: 'Lao',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mg: 'Malagasy',
  mi: 'Maori',
  ml: 'Malayalam',
  mr: 'Marathi',
  ms: 'Malay',
  mt: 'Maltese',
  mww: 'Hmong Daw',
  my: 'Myanmar',
  nb: 'Norwegian',
  ne: 'Nepali',
  nl: 'Dutch',
  or: 'Odia',
  otq: 'Querétaro Otomi',
  pa: 'Punjabi',
  pl: 'Polish',
  prs: 'Dari',
  ps: 'Pashto',
  pt: 'Portuguese (Brazil)',
  'pt-PT': 'Portuguese (Portugal)',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sl: 'Slovenian',
  sm: 'Samoan',
  sq: 'Albanian',
  'sr-Cyrl': 'Serbian (Cyrillic)',
  'sr-Latn': 'Serbian (Latin)',
  sv: 'Swedish',
  sw: 'Swahili',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  ti: 'Tigrinya',
  'tlh-Latn': 'Klingon (Latin)',
  'tlh-Piqd': 'Klingon (pIqaD)',
  to: 'Tongan',
  tr: 'Turkish',
  ty: 'Tahitian',
  uk: 'Ukrainian',
  ur: 'Urdu',
  vi: 'Vietnamese',
  yua: 'Yucatec Maya',
  yue: 'Cantonese (Traditional)',
  'zh-Hans': 'Chinese Simplified',
  'zh-Hant': 'Chinese Traditional'
}

lang_keys=Object.keys(LANGS);

languages=[]

for (const k in lang_keys) {
  if (Object.hasOwnProperty.call(lang_keys, k)) {
    languages.push(LANGS[lang_keys[k]]);
  }
}
console.log(languages)
n=languages.length;

sparse_similarity_matrix=Array(n).fill(Array(n).fill(0))

tmpmat=Array(n).fill(0);

country_filter=[]

lang_by_coun={}

for (const i in lang_keys) {

  if (Object.hasOwnProperty.call(lang_keys, i)) {

    country_filter=[]

    for (const j in country_lang) {

      if (Object.hasOwnProperty.call(country_lang, j)) {
        
        if(country_lang[j]['languages'].includes(LANGS[lang_keys[i]])){
          
          if(!country_filter.includes(country_lang[j]['country'])){
            country_filter.push(country_lang[j]['country'])
          }
        }
        
      }
    }

    lang_by_coun[LANGS[lang_keys[i]]]=country_filter
  }

}

 filteredArray=[]
console.log(languages.length);
//console.log(lang_by_coun);
//console.log(Object.keys(indexed_country));
for (const key in lang_by_coun) {
  if (Object.hasOwnProperty.call(lang_by_coun, key)) {
    lang_by_coun[key].forEach(element => {
      // console.log(key);
      // console.log('element',element);
     // console.log(indexed_country[element.trim()]);
       filteredArray=filteredArray.concat( indexed_country[element.trim()].filter(value => languages.includes(value)));
      
    });
    indi=languages.indexOf(key);
      
     //console.log("key is ",key);
     //console.log("index of key",indi);
      filteredArray.forEach(element => {
    //    console.log("index of languages ",languages.indexOf(element));
        tmpmat[languages.indexOf(element)]=1;
        
      });
      sparse_similarity_matrix[indi]=tmpmat;
       
  //    console.log("language",key);
  }
//  console.log("filtered Array: ",filteredArray);
  tmpmat=Array(n).fill(0);
  filteredArray=[];
}

//console.log(sparse_similarity_matrix[70]);
//console.log("Language",sparse_similarity_matrix[70],languages[70]);
console.log("Similarity");
for (let i = 0; i < sparse_similarity_matrix.length; i++) {
  
  if(sparse_similarity_matrix[70][i]==1){
//    console.log(languages[i]);
  }
  
}

var fs = require('fs');

var file = fs.createWriteStream('array.csv');
file.on('error', function(err) { /* error handling */ });
sparse_similarity_matrix.forEach(function(v) { file.write(v.join(', ') + '\n'); });
file.end();

const LANGS_CAN_CORRECT = [
  'da',
  'en',
  'nl',
  'fi',
  'fr',
  'fr-CA',
  'de',
  'it',
  'ja',
  'ko',
  'no',
  'pl',
  'pt',
  'pt-PT',
  'ru',
  'es',
  'sv',
  'tr',
  'zh-Hant',
  'zh-Hans'
]

