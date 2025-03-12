/*Encontrar cuantas veces sale React en el documento*/
/*Mi intento :c */
const fs = require('fs');

const data =fs.readFileSync('readme.md','utf-8');

const df = data.split(' ');

const nam = data.split(' ').length;
const rea = data.split('React').length;

const as = nam - rea;

/*---------- */
/*Respuesta */

const sd = df.filter((word) => word.toLowerCase().includes('react')).length; //51, cercano pero no optimo
const gh = data.match(/react/gi ?? []).length; //62, exacto

console.log(nam)
console.log(as)
console.log('--------')
console.log(nam)
console.log(sd)
console.log(gh)