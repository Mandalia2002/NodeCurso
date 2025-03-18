import { LogEntitiy, LogSeverityLevel } from "./log.entity"

describe('Entity', () => {

    const log1 ={
        message: 'Service http://google.com working, ',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts'
    }

    test('create entity instance', () => {
        const log5= new LogEntitiy(log1)

        expect(log5).toBeInstanceOf(LogEntitiy)
        expect(log5.message).toBe('Service http://google.com working, ')
        expect(log5.level).toBe(LogSeverityLevel.low)
        expect(log5.origin).toBe('log.entity.test.ts')
        expect(log5.created).toBeInstanceOf(Date)
    })

    test('create JSON instance', () => {
        const as = `{"message":"Service http://google.com working, ","level":"low","created":"2025-03-13T21:58:20.330Z","origin":"log.entity.test.ts"}`
        const log = LogEntitiy.fromJson(as)

        expect(log).toBeInstanceOf(LogEntitiy)
        expect(log.message).toBe('Service http://google.com working, ')
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe('log.entity.test.ts')
        expect(log.created).toBeInstanceOf(Date)
    })

    test('create fromObject instance', () => {
        const log2 = LogEntitiy.fromObject(log1)

        expect(log2).toBeInstanceOf(LogEntitiy)
        expect(log2.message).toBe(log1.message)
        expect(log2.level).toBe(log1.level)
        expect(log2.origin).toBe(log1.origin)
        expect(log2.created).toBeInstanceOf(Date)
    })
})