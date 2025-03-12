import { EmailService } from "../../../presentation/email/email.service"
import { LogEntitiy, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase{
    execute: (to:string | string [])=> Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase{
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ){}
    async execute (to:string |string[]){
        try{
            const sent = await this.emailService.sendEmailWithFileSystemlog(to)
            if(!sent){
                throw new Error('Email log not sent');
            }

            const log =new LogEntitiy({
                message: `Log email sent`,
                level: LogSeverityLevel.high,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog(log);

            return true
        }catch (error){
            const log =new LogEntitiy({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog(log);
            return false
        }
    }
}