//?--------------------------------------------------------------- 01-Template

/*const template = require('./js-fundamentos/01-template'); //1

//const { emailTemplate } = require('./js-fundamentos/01-template'); //2

//console.log(emailTemplate);

//console.log(template.emailTemplate); //1.1
//console.log(emailTemplate); */ //2.2

//?------------------------------------------------------------ 02-Destructuring

//console.log('el tiburoncin esta perdido en las estrellas');
//require('./js-fundamentos/02-Destructuring');


//?------------------------------------------------------------- 03-Callbacks

/*const {getUserbyId}=require('./js-fundamentos/03-Callbacks');



getUserbyId(1, function(error, user){
    if(error){
        throw new error('user not found', id);
    }

    console.log(user);
});*/

//?------------------------------------------------------------- 04-Arrows

/*const { arr } = require('./js-fundamentos/04-Arrows');

const id = 1;

arr(id, function (error, user) {
    if (error) {
        throw new error('user not found', id);
    }

    console.log(user);
});*/

//?-------------------------------------------------------- 05-Factory

/*const {SpecialmakePerson} = require('./js-fundamentos/05-Factory');
const {v4, getAge} = require('./public');

const makePerson = SpecialmakePerson ({v4, getAge});

const obj1 = { name: 'Sofia', birthdate: '2002-08-10' }

const as = makePerson( obj1 )

console.log(as)*/

//?-------------------------------- 06-Promises

/*const getPokemonbyID =require('./js-fundamentos/06-Promises')
const getPokemonbyID2 = require('./js-fundamentos/06-Promises')

getPokemonbyID(63, (pokemon) => {
    console.log(pokemon)
});

getPokemonbyID2(63)
    .then((pokemon) => console.log({ pokemon }))
    .catch((err) => console.log('intente de nuevo'))
    .finally(() => console.log('Finalmente'));
    */

//?-------------------------------- 07-Async

/*const getPokemonbyID3 = require('./js-fundamentos/06-Promises')

getPokemonbyID3(63)
    .then((pokemon) => console.log({ pokemon }))
    //.catch((err) => console.log('intente de nuevo'))
    .finally(() => console.log('Finalmente'));*/

//?-------------------------------- 08-FetchAPI

/*const {getPokemonbyID4 }= require('./js-fundamentos/06-Promises')

getPokemonbyID4(63)
    .then((pokemon) => console.log({ pokemon }))
    //.catch((err) => console.log('intente de nuevo'))
    .finally(() => console.log('Finalmente'));*/

//?-------------------------------- 09-Logger

const {buildlogger} = require('./public');
const logger = buildlogger ('app.js');


logger.log("Hola Mundo");
logger.error("Malo aaaaaa");

