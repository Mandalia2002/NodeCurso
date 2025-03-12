import winston from 'winston'

const {combine, timestamp, json} = winston.format;

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    /*format: combine(
        timestamp(),
        json(),
    ),*/
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

console.log();

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

export function buildlogger(service: string) {
    return {
        log: (message: string) => {
            logger.log('info', { message, service });
        },
        error: (message: string) => {
            logger.error('error', {
                message,
                service,
                at: new Date().toISOString()
            });
    }
    }
}