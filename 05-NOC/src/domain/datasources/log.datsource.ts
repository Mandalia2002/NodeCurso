import { LogEntitiy, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
    abstract saveLog(log: LogEntitiy):Promise<void>
    abstract getLog(severityLevel: LogSeverityLevel):Promise<LogEntitiy[]>
}