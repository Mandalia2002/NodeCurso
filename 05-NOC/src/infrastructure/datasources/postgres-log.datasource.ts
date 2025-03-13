import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datsource";
import { LogEntitiy, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient()

const Severity ={
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDataSource implements LogDataSource{

    async saveLog(log: LogEntitiy): Promise<void> {
        const level = Severity[log.level]
        const newLog = await prismaClient.logModel.create({
            data:{
                level: level,
                message:`${log.message}`,
                origin: 'Postgres-log.datasource.ts'
            }
        })
        console.log('PostgreSQL log created', newLog)
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntitiy[]> {
        const level = Severity[severityLevel]
        const logs = await prismaClient.logModel.findMany({
            where:{
                level: level
            }
        })

        return logs.map(postgresLog=> LogEntitiy.fromObject(postgresLog))
        
    }
}