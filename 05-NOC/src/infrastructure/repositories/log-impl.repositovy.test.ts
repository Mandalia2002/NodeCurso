import { LogDataSource, LogEntitiy, LogRepository, LogSeverityLevel } from "../../domain"
import { LogRepositoryImpl } from "./log-impl.repositovy"

describe('log-impl', () => {

    const mocki: LogRepository = {
            saveLog: jest.fn(),
            getLog: jest.fn()
        }

    const log = new LogEntitiy({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts'
    })

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    const repo = new LogRepositoryImpl(mocki)

    test('savelog', async () => {

       await repo.saveLog(log)

       expect(mocki.saveLog).toHaveBeenCalledWith(log)
    })
    test('getlog', async () => {
        await repo.getLog(LogSeverityLevel.medium)

        expect(mocki.getLog).toHaveBeenCalledWith(LogSeverityLevel.medium)
    })
})