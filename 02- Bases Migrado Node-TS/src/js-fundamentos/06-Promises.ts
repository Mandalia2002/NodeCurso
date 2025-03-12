const { httpClient } = require('../public/http-client');

/*export const getPokemonbyID = (id:number|string, callback:any) => { //Normal con fetch 
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    fetch(url).then((response) => {

        response.json().then((pokemon) => {
            //console.log(pokemon.name)
            callback(pokemon.name);
        });

    });
}

export const getPokemonbyID2 = (id:number) => { //Con Promesa
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return fetch(url)
        .then((response) => response.json())
        //.then( () => { throw new Error ('No existente') } )
        .then((pokemon) => pokemon.name);
}

export const getPokemonbyID3 = async (id:number) => { //Con Promesa Asyncrona
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


export const getPokemonbyID4 = async (id: number | string): Promise<string> => { //Con Promesa Asyncrona FetchAPI

    // const response = await fetch (url);
    // const pokemon = await response.json();

    //return Promise.resolve(10);
    try {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        const pokemon = await httpClient.get(url);
        return pokemon.name;
    } catch (e) {
        throw new Error(`Pokemon no existe, id: ${id}`);	
    }

    /* return fetch(url)
         .then((response) => response.json())
         //.then( () => { throw new Error ('No existente') } )
         .then((pokemon) => pokemon.name);*/

}
