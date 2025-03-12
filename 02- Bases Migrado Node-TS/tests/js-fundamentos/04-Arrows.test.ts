import { arr } from "../../src/js-fundamentos/04-Arrows";

describe('js-fundamentos/04-Arrows.ts', () => {
    test('arr should return an error if user does not exist', () => {
        arr(3, (err, user) => {
            expect(err).toBe(`User not Found ${3}`);
            expect(user).toBeUndefined();
        });
    });

    test('arr should return a user if it exist', () => {
        arr(2, (undefined, user) => {
            expect(user).toBe(user);
        });
    });
});