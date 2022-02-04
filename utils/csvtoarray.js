// const csv = require('csv-parser');


//   const fs = require('fs')
// fs.readFile('array.txt', 'utf8', function (err, data) {
//   var dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
//   console.log(dataArray);
// })


var fs = require('fs');

var data = fs.readFileSync('array.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => parseInt(e.trim()))); // split each line to array

console.log(data);