import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin"
import { LogModel, MongoDB } from "../../data/mongo"
import { MongoLogDS } from "./mongo-log.datasource"
import { LogEntitiy, LogSeverityLevel } from "../../domain"

describe('mongo-log', () => {

    const lds = new MongoLogDS()

    const log = new LogEntitiy({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts'
    })

    beforeAll(async () => {
        await MongoDB.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoURL: envs.MONGO_URL
        })
    })

    afterAll(async () => {
        await LogModel.deleteMany()
        mongoose.connection.close()
    })
    test('create the log', async () => {

        const logSpy = jest.spyOn(console, 'log')

        await lds.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith("Mongo log created", expect.any(String))
    })

    test('get the log', async () => {
        await lds.saveLog(log)

        const log1 = await lds.getLog(LogSeverityLevel.medium)


        expect(log1.length).toBe(2)
        expect(log1[0].level).toBe(LogSeverityLevel.medium)
    })
})


