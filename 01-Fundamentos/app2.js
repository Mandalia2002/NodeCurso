/*Cambia la palabra de React por Angular*/
const fs = require('fs');

const data =fs.readFileSync('readme.md','utf-8');

const newData = data.replace(/React/ig, 'Angular');

fs.writeFileSync('readmea.md', newData);

console.log(data);