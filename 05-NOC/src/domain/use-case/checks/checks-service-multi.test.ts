import { CheckServiceMulti } from "./checks-service-multi"

describe('', () => {

    const mocki = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const mocki2 = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const suCal = jest.fn()
    const erCal = jest.fn()

    const checkS = new CheckServiceMulti([mocki, mocki2], suCal, erCal);

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

    /*test('Error callback', async () => {

        const as = await checkS.execute('dsdskj')

        expect(suCal).not.toHaveBeenCalled
        expect(erCal).not.toHaveBeenCalled
    })*/
})