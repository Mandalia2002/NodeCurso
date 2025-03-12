 import {v4} from '../../src/public';

 describe('Get UUID', () => {
    test('Get UUID not null', () => {
       const as=v4();
       expect(as).not.toBeNull();
    });
    test('Get UUID should be a number', () => {
        const as=v4();
        expect(typeof as).toBe('string');
        expect(as.length).toBe(36);
     });
     test('Get UUID shouldt be repeated', () => {
      const as=v4();
      const as2=v4();
      expect(as).not.toEqual(as2);
   });
 }); 
