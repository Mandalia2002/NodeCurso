import { LogRepository } from "../../repository/log.repository"
import { CheckService } from "./checks-service"

describe('', () => {

    const mes = {
        CheckService: jest.fn().mockReturnValue(true)
    }

    const mocki: LogRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const suCal = jest.fn()
    const erCal = jest.fn()

    const checkS = new CheckService(mocki, suCal, erCal);

    beforeAll(() => {
        jest.clearAllMocks()
    })

    test('Success callback', async () => {

        const as = await checkS.execute('https://google.com')

        expect(as).toBe(true)
        expect(suCal).not.toHaveBeenCalled
        expect(erCal).not.toHaveBeenCalled
    })

    test('False callback', async () => {

        const as = await checkS.execute('https://gobjkbujogle.com')

        expect(as).toBe(false)
        expect(suCal).toHaveBeenCalled
        expect(erCal).toHaveBeenCalled
    })

   /* test('Error callback', async () => {
        const sel = new CheckService(
            mocki,
            suCal,
            erCal
        )
        
        const as = await sel.execute('www.google.com')

        expect(as).toBe(false)
        expect(mes.CheckService).toContain('Error on check service')
        expect(suCal).not.toHaveBeenCalled
        expect(erCal).not.toHaveBeenCalled
    })*/
})