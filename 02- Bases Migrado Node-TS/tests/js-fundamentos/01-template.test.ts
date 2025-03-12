import { emailTemplate } from '../../src/js-fundamentos/01-template';

describe('js-fundamentos/01-template', () => {
    test('should return a greeting', () => {
        expect(emailTemplate).toContain("hola, ");
    });
});