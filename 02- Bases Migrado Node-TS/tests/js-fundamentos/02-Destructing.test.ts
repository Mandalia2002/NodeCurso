import {chara} from '../../src/js-fundamentos/02-Destructuring';

describe('js-fundamentos/02-Destructuring', () => {
  test('should be the same', () => {
    expect(chara[0]).toBe('Albedo'),
    expect(chara[1]).toBe('Artem'),
    expect(chara[2]).toBe('Zayne');
    expect(chara[3]).toBe('Boothill');
  });
});