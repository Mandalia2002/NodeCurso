import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-logs";
import { LogEntitiy } from "../../entities/log.entity";

describe('logs', () => {

    const msend = {
        sendEmailWithFileSystemLog: jest.fn().mockReturnValue(true)
    }

    const mocki: LogRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const send = new SendEmailLogs(
        msend as any,
        mocki
    )

    // beforeEach(()=>{
    //     jest.clearAllMocks();
    // })

    test('correct', async () => {

        const result = await send.execute("gct.sofia.perez@gmail.com")

        expect(result).toBe(true)
        expect(msend.sendEmailWithFileSystemLog).toBeCalledTimes(1)
        expect(mocki.saveLog).toBeCalledWith(expect.any(LogEntitiy))
        expect(mocki.saveLog).toBeCalledWith({
            create: expect.any(Date),
            level: "low",
            message: `Log email sent`,
            origin: 'send-logs.ts'
        })
    })

    test('incorrect', async () => {

        msend.sendEmailWithFileSystemLog.mockReturnValue(false)

        const result = await send.execute("aaaa@google.com")

        expect(result).toBe(false)
        expect(msend.sendEmailWithFileSystemLog).toBeCalledTimes(1)
        expect(mocki.saveLog).toBeCalledWith(expect.any(LogEntitiy))
        expect(mocki.saveLog).toBeCalledWith({
            create: expect.any(Date),
            level: "high",
            message: `Error: Email log not sent`,
            origin: 'send-logs.ts'
        })
    })

})