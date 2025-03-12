import {getAge} from '../../src/public';

describe('getAge', () => {
    test('should return the age of a person', () => {
        const so = getAge('2002-08-10');
        expect(so).toBe(22);
    });
    test('should be a number', () => {
        const so = getAge('2002-08-10');
        expect(typeof so).toBe('number');
    });
    test('should return an error if birthdate is not a valid date', () => {
        const as = ''
        expect(getAge(as)).toBe('birthdate is required');
    });
});