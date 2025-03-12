const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service'},
     transports:[
        new winston.transports.File({ filename: 'error.log' , level: 'error'}),
        new winston.transports.File({filename: 'combined_logs'}),
     ],
});

//console.log();

module.exports= function buildlogger(service){
    return {
        log: (message) =>{
            logger.log('info', message, service);
        }
    }
}