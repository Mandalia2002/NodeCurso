import { LogDataSource } from "../../domain/datasources/log.datsource";
import { LogEntitiy, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource {

    private readonly logpath = 'logs/'
    private readonly alllogspath = 'logs/logs-all.log'
    private readonly mediumlogpath = 'logs/logs-medium.log'
    private readonly highlogpath = 'logs/logs-high.log'

    constructor() {
        this.createLogsFiles()
    }

    private createLogsFiles() {
        if (!fs.existsSync(this.logpath)) {
            fs.mkdirSync(this.logpath)
        }
        [
            this.alllogspath,
            this.mediumlogpath,
            this.highlogpath
        ].forEach(path => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, '')
        })
    }


    async saveLog(newlog: LogEntitiy): Promise<void> {
        const logAsJSON = `${JSON.stringify(newlog)} \n`

        fs.appendFileSync(this.alllogspath, logAsJSON)

        if (newlog.level === LogSeverityLevel.low) return;
        if (newlog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumlogpath, logAsJSON)
        } else {
            fs.appendFileSync(this.highlogpath, logAsJSON)
        }

    }

    private getLogsFromFile = (path: string): LogEntitiy[] => {
        const content = fs.readFileSync(path, 'utf-8')
        const stringLogs = content.split('\n').map(LogEntitiy.fromJson)
        return stringLogs;
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntitiy[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.alllogspath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumlogpath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highlogpath);
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }

}