export enum LogSeverityLevel{
    low="low",
    medium='medium',
    high='high'
}

export interface options{
    level: LogSeverityLevel;
    message: string;
    created?: Date;
    origin: string;
}


export class LogEntitiy{
    public level: LogSeverityLevel;
    public message: string;
    public created: Date;
    public origin: string;

    constructor (options : options){
        const {message, level, created =new Date(), origin} = options;
        this.message= message
        this.level=level
        this.created= created
        this.origin= origin
    }

    static fromJson = (json:string):LogEntitiy =>{
        const{message, level, created, origin} = JSON.parse(json)

        const log = new LogEntitiy({
            message, 
            level, 
            created: new Date(created),
            origin
        })
        return log;
    }

    static fromObject = (object:{[key:string]: any}):LogEntitiy=>{
        const{message,level,created,origin}=object
        const log = new LogEntitiy({
            message,
            level,
            created,
            origin
        })
        return log;
    }
}