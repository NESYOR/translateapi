const country_lang = require('../constants/country_languages.js');
const fs = require('fs');


country_wise={}

country_lang.forEach(element => {
    country_wise[element['country']]=element['languages']    
});

// convert JSON object to string
const data = JSON.stringify(country_wise);


// write JSON string to a file
fs.writeFile('countryindexed.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});

console.log(country_wise);