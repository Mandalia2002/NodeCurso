import {getPokemonbyID4} from '../../src/js-fundamentos/06-Promises';

describe('06-Promises', () => {

    test('getPokemonbyID4 should return a pokemon', async () => {
        const pokemon = await getPokemonbyID4(1);
        expect(pokemon).toBe(String);
    });

    test('getPokemonbyID4 returns an error if the pokemon doesnt exists', async () => {
        const pokemon = await getPokemonbyID4(1000000000000);
        expect(pokemon).toBe('Pokemon no existe ${id}');
    });
});