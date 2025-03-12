//const {v4: uuidv4}= require('uuid')
//const getAge = require ('get-age') Libreria de terceros
//const {getAge}= require ('../public/get-age.plugin')
//const {v4} =require('../public/get-uuid.plugin') //Plugins realizados en modulos


//const { getAge, v4 } = require('../public') //Intermediario de plugins (permite tener todo en una sola linea de codigo)

interface sd {
    v4: () => string,
    getAge: (birthdate: string) => number
}

interface obj {
    name: string,
    birthdate: string
}


const obj = { name: 'Artem', birthdate: '2021-04-10' }
const obj1 = { name: 'Sofia', birthdate: '2002-08-10' }
/*
const makePerson = ({ name, birthdate }) => { //Funcion Normal :3
    return {
        id: new Date().getTime(),
        name: name,
        birthdate: birthdate,
        age: new Date().getFullYear() - new Date(birthdate).getFullYear(), //No es correcto xd
    }
}

const john = makePerson(obj);
console.log(john)

const makePerson2 = ({ name, birthdate }) => { //Funcion con Libreria de Terceros
    return {
        id: uuidv4(),
        name: name,
        birthdate: birthdate,
        age: getAge(birthdate),
    }
}

const sandia = makePerson2(obj);
console.log(sandia)

const makePerson3 = ({ name, birthdate }) => { //Funcion con Plugin
    return {
        id: uuidv4(),
        name: name,
        birthdate: birthdate,
        age: getAge(birthdate),
    }
}

const tiburon = makePerson3(obj);
console.log(tiburon)

const makePerson4 = ({ name, birthdate }) => { //Funcion con Plugin #2 UUID
    return {
        id: v4(),
        name: name,
        birthdate: birthdate,
        age: getAge(birthdate),
    }
}

const teto = makePerson4(obj1);
console.log(teto)
*/
export const SpecialmakePerson = ({v4, getAge}: sd) => { //Funcion FACTORY 
    return ({ name, birthdate }: obj) => { 
        return {
            id: v4(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
    }
}