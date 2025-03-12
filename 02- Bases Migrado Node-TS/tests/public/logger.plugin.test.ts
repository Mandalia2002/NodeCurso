import { buildlogger } from '../../src/public';
import { logger as winstonLogger } from '../../src/public/logger.plugin';

describe('Logger', () => {
    test('should return logger', () => {
        const logger = buildlogger('sandia');
        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');
    });

    test('should return a log', () => {
        const as = jest.spyOn(winstonLogger, 'log');
        const message = 'testeo sandia';
        const service = 'user-service';
        const sd = buildlogger(service);
        sd.log(message)
        expect(as).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                level: 'info',
                message,
                service,
            })
        );
    });

   /* test('should return a error log', () => {
        const asd = jest.spyOn(winstonLogger, 'error');
        const message = 'testeo sandia';
        const service = 'app.js';
        const sd = buildlogger(service);
        sd.log(message)
        expect(asd).toHaveBeenCalledWith(
            'error',
            expect.objectContaining({
                level: 'error',
                message,
                service,
                at: new Date().toISOString(),
            })
        );
    });*/
}); 
