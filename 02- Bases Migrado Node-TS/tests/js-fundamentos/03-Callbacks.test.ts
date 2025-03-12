import { getUserbyId } from "../../src/js-fundamentos/03-Callbacks";

describe('js-fundamentos/03-Callbacks.ts', () => {
    test('getUserById should return an error if user does not exist', () => {
        getUserbyId(3, (err, user) => {
            expect(err).toBe(`User not found 3`);
            expect(user).toBeUndefined();
        });
    });

    test('getUserById should return a user if it exist', () => {
        getUserbyId(2, (undefined, user) => {
            expect(user).toBe(user);
        });
    });
});