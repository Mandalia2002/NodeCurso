import fs from 'fs'
import path from 'path'
import { FileSystemDataSource } from './file-system.datasource'
import { LogEntitiy, LogSeverityLevel } from '../../domain'

describe('file-system', () => {

    const log = path.join(__dirname, '../../../logs')

    beforeEach(() => {
        fs.rmSync(log, { recursive: true, force: true })
    })

    test('create logs if they do not exist', () => {
        new FileSystemDataSource()
        const files = fs.readdirSync(log)

        expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"])
    })

    test('save log low', () => {
        const lds = new FileSystemDataSource()
        const log1 = new LogEntitiy({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })
        lds.saveLog(log1)
        const all = fs.readFileSync(`${log}/logs-all.log`, 'utf-8')

        expect(all).toContain(JSON.stringify(log1))
    })

    test('save log medium', () => {
        const lds = new FileSystemDataSource()
        const log1 = new LogEntitiy({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })
        lds.saveLog(log1)
        const all = fs.readFileSync(`${log}/logs-all.log`, 'utf-8')
        const medi = fs.readFileSync(`${log}/logs-medium.log`, 'utf-8')

        expect(all).toContain(JSON.stringify(log1))
        expect(medi).toContain(JSON.stringify(log1))
    })

    test('save log high', () => {
        const lds = new FileSystemDataSource()
        const log1 = new LogEntitiy({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })
        lds.saveLog(log1)
        const all = fs.readFileSync(`${log}/logs-all.log`, 'utf-8')
        const high = fs.readFileSync(`${log}/logs-high.log`, 'utf-8')

        expect(all).toContain(JSON.stringify(log1))
        expect(high).toContain(JSON.stringify(log1))
    })

    test('return logs', async () => {
        const lds = new FileSystemDataSource()
        const low = new LogEntitiy({
            message: 'test l',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })

        const medi = new LogEntitiy({
            message: 'test m',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        const high = new LogEntitiy({
            message: 'test h',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        await lds.saveLog(low)
        await lds.saveLog(medi)
        await lds.saveLog(high)

        const lows = await lds.getLog(LogSeverityLevel.low)
        const mediu = await lds.getLog(LogSeverityLevel.medium)
        const highs = await lds.getLog(LogSeverityLevel.high)

        expect(lows).toEqual(expect.arrayContaining([lows, medi, high]))
        expect(mediu).toEqual(expect.arrayContaining([medi]))
        expect(highs).toEqual(expect.arrayContaining([high]))
    })

    test('return logs medium', async () => {
        const lds = new FileSystemDataSource()

        const medi = new LogEntitiy({
            message: 'test m',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        await lds.saveLog(medi)

        const mediu = await lds.getLog(LogSeverityLevel.medium)

        expect(mediu).toEqual(expect.arrayContaining([medi]))
    })

    test('return logs high', async () => {
        const lds = new FileSystemDataSource()

        const high = new LogEntitiy({
            message: 'test h',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        await lds.saveLog(high)

        const highs = await lds.getLog(LogSeverityLevel.high)

        expect(highs).toEqual(expect.arrayContaining([high]))
    })

    test('error inexistent', () => {
        new FileSystemDataSource()
        new FileSystemDataSource()

    })


    test('severity', async () => {
        const lds = new FileSystemDataSource()
        const custom = 'MEGA_HIGH' as LogSeverityLevel

        try {
            await lds.getLog(custom)
            expect(true).toBeFalsy()
        } catch (error) {
            const errorStri = `${error}`
            console.log(errorStri)
            expect(errorStri).toContain(`${custom} not implement`)
        }
    })
})

