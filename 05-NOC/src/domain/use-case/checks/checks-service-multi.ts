import { LogEntitiy, LogSeverityLevel, options } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase{
    execute(url:string):Promise<boolean>
}

type SuccessCallback =(()=> void) | undefined;
type ErrorCallback = ((error: String) => void) | undefined;


export class CheckServiceMulti implements CheckServiceMultipleUseCase{
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly SuccessCallback: SuccessCallback,
        private readonly ErrorCallback: ErrorCallback
    ){}

    private calllogs (log: LogEntitiy){
        this.logRepository.forEach(logRepository => {
            logRepository.saveLog(log)
        })
    }

    async execute(url:string):Promise<boolean>{
        try{
            const req = await fetch(url)
            if( !req.ok){
                throw new Error (`Error on check service ${url}`)
            } 

            const nam =new LogEntitiy({message:`Service ${url} working, `, level: LogSeverityLevel.low, origin:'checks-service.ts'})
            this.calllogs(nam)
            this.SuccessCallback && this.SuccessCallback

            return true
        }catch(error){
            const errorM = `${url} is not ok.  ${error}`
            const nam =new LogEntitiy({message: errorM, level: LogSeverityLevel.high, origin:'checks-service.ts'})
            this.calllogs(nam)
            this.ErrorCallback  && this.ErrorCallback(errorM)
            return false
        }
    }
}