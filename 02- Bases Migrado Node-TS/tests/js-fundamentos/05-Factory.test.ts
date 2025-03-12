import {SpecialmakePerson} from '../../src/js-fundamentos/05-Factory';

describe('Factory', () => {

    const v4 = () => '1234';
    const getAge = () => 10;

    test('SpecialmakePerson should return a function', () => {
        const makePerson = SpecialmakePerson({v4, getAge});
        expect(typeof makePerson).toBe('function');
    });

    test('SpecialmakePerson should return a person', () => {
        const makePerson = SpecialmakePerson({v4, getAge});
        const person = makePerson({name: 'Sofia', birthdate: '2002-08-10'});
        expect(person).toEqual({
            id: '1234',
            name: 'Sofia',
            birthdate: '2002-08-10',
            age: 10,
        });
    });
});