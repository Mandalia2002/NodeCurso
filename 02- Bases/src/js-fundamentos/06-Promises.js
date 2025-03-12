
const getPokemonbyID = (id, callback) => { //Normal con fetch 
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    fetch(url).then((response) => {

        response.json().then((pokemon) => {
            //console.log(pokemon.name)
            callback(pokemon.name);
        });

    });
}

const getPokemonbyID2 = (id) => { //Con Promesa
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return fetch(url)
        .then((response) => response.json())
        //.then( () => { throw new Error ('No existente') } )
        .then((pokemon) => pokemon.name);
}

const getPokemonbyID3 = async (id) => { //Con Promesa Asyncrona
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const response = await fetch(url);
    const pokemon = await response.json();

    //return Promise.resolve(10);

    //throw new Error ('Pokemon no existe');


    return pokemon.name;

    /* return fetch(url)
         .then((response) => response.json())
         //.then( () => { throw new Error ('No existente') } )
         .then((pokemon) => pokemon.name);*/

}


const { http } = require('../public');
const getPokemonbyID4 = async (id) => { //Con Promesa Asyncrona FetchAPI
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const pokemon = await http.get(url);
    // const response = await fetch (url);
    // const pokemon = await response.json();

    //return Promise.resolve(10);

    //throw new Error ('Pokemon no existe');


    return pokemon.name;

    /* return fetch(url)
         .then((response) => response.json())
         //.then( () => { throw new Error ('No existente') } )
         .then((pokemon) => pokemon.name);*/

}

module.exports = getPokemonbyID4;
