import { LogDataSource } from "../../domain/datasources/log.datsource";
import { LogEntitiy, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo";

export class MongoLogDS implements LogDataSource{

    async saveLog(log: LogEntitiy): Promise<void> {
        const newLog= await LogModel.create(log)
        console.log('Mongo log created', newLog.id)
    }
    
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntitiy[]> {
        const logs= await LogModel.find({
            level: severityLevel
        })
        return logs.map(mongolog=> LogEntitiy.fromObject(mongolog));
    }
}