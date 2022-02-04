
const Pool = require('pg').Pool

const {translate} = require('bing-translate-api');

const languages_list=require('./constants/languages_list');

const language_similarity_matrix=require('./constants/similarity_matrix.js');

const LANGS = require('./constants/langs.js');

const config = require('./config/config');

const pool = new Pool(config.DBHost);

  const createUser = (resulted,res) => {
    const { text,userLang,translation } = resulted
  
    pool.query('INSERT INTO translations (text,lang,trans_text,trans_lang) VALUES ($1, $2, $3, $4)', 
    [text,userLang,translation,resulted['language']['to']], (error,result) => {
      if (error) {
        throw error
      }
      console.log('Translated Successfully');
      res.send(resulted);
    })
  }

const searchText = (query,req,res) => {

  const {text,from,to} = query;

pool.query(`select * from translations where text='${text}' and lang='${from}' and trans_lang='${to}' 
UNION select * from translations where trans_text='${text}' and lang='${to}' and trans_lang='${from}' `, (error,results)=>{
    if (error) { 
        throw error
    }
    if (results.rows.length){
      console.log("db hit");
      res.send(results.rows);
    }
    else{
      translate(text,from,to,true).then(result=>{
        console.log("in the translate",text,to);
        createUser(result,res);
        smartCache(query);
    }).catch(err=>{res.send(err,"Error")});
    }
    
    
    })
}
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}


const smartCache = (query)=>{

  console.log("==============IN SMART CACHE===================");
  
  const {text,from,to} = query;

  index=languages_list.indexOf(LANGS[to]);
  
  lang_arr=[];
  
  c=0;

  
  for(var i=0;i<language_similarity_matrix[index].length ;i++){
    if(language_similarity_matrix[index][i]==1 && c<3){
      lang_arr.push(languages_list[i]);
      c++;
    }
  }


  lang_arr.forEach(element => {
    to_lang=getKeyByValue(LANGS,element)
    console.log("TO_LANG",to_lang);
pool.query(`select * from translations where text='${text}' and lang='${from}' and trans_lang='${to_lang}' 
UNION select * from translations where trans_text='${text}' and lang='${to_lang}' and trans_lang='${from}' `, (error,results)=>{
    if (error) { 
        throw error
    }
    if (results.rows.length!=0){
      console.log("caching "+results.rows.length+" languages");
    }
    else{
      console.log("Smart Caching now")
      translate(text,from,getKeyByValue(LANGS,element),true).then(result=>{
        cacheLang(result);    
    }).catch(err=>{res.send(err,"Error")});
    }
    
    //console.log("rows are",results.rows);
    
    })
  });

}
const cacheLang = (resulted) => {
  const { text,userLang,translation } = resulted

  pool.query('INSERT INTO translations (text,lang,trans_text,trans_lang) VALUES ($1, $2, $3, $4)', 
  [text,userLang,translation,resulted['language']['to']], (error,result) => {
    if (error) {
      throw error
    }
   // console.log(resulted);
  })
}
  module.exports = {
    smartCache,
    createUser,
    searchText
  }