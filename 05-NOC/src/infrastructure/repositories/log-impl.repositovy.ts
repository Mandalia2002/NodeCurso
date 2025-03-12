import { LogDataSource } from "../../domain/datasources/log.datsource";
import { LogEntitiy, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logdatasource : LogDataSource,
    ){}

    async saveLog(log: LogEntitiy): Promise<void> {
        return this.logdatasource.saveLog(log)
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntitiy[]> {
        return this.logdatasource.getLog(severityLevel)
    }
}