import { LogEntitiy, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
    abstract saveLog(log: LogEntitiy):Promise<void>
    abstract getLog(severityLevel: LogSeverityLevel):Promise<LogEntitiy[]>
}