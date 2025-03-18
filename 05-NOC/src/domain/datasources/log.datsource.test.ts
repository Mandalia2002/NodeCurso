import { console } from "inspector";
import { LogEntitiy, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datsource";

describe('log.datasource.ts', ()=>{

    const newLog = new LogEntitiy({
        origin: 'aaaaaa',
        message: 'aaaaa',
        level: LogSeverityLevel.low
    })

     class MockLogDataSource implements LogDataSource{
        async saveLog(log: LogEntitiy): Promise<void> {
            return;
        }
        async getLog(severityLevel: LogSeverityLevel): Promise<LogEntitiy[]> {
            return [newLog]
        }
    }

    test('test abstract class',async()=>{
        const logds = new MockLogDataSource()
        expect (logds).toBeInstanceOf(MockLogDataSource)
        expect (logds).toHaveProperty('saveLog')
        expect (logds).toHaveProperty('getLog')

        await logds.saveLog(newLog)
        const logs =await logds.getLog(LogSeverityLevel.high)
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntitiy)
    })
})