import { PrismaClient } from "@prisma/client"
import { LogEntitiy, LogSeverityLevel } from "../../domain"
import { PostgresLogDataSource } from "./postgres-log.datasource"
import { LogModel } from "../../data/mongo"


describe('postgreSQL-log', () => {

    beforeAll(async () => {
        await prism.$connect()
    })

    const prism = new PrismaClient()
    const lds = new PostgresLogDataSource()

    const log = new LogEntitiy({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'Postgres-log.datasource.test.ts'
    })


    afterAll(async () => {
        prism.$disconnect()
    })
    test('save log', async () => {

        const logSpy = jest.spyOn(console, 'log')

        await lds.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith("PostgreSQL log created", expect.any(String))
    })

    test('get log', async () => {

        await lds.saveLog(log)

        const log1 = await lds.getLog(LogSeverityLevel.medium)

        expect(log1.length).toBe(2)
        expect(log1[0].level).toBe(LogSeverityLevel.medium)
    })
})


