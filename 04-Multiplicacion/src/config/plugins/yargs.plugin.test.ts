//import { argv } from 'process'
//import{yarg} from './yargs.plugin'

const runCom = async (args: string[]) => {
    process.argv = [...process.argv, ...args]
    const { yarg } = await import('./yargs.plugin')
    return yarg
}

describe('Yarg', () => {
    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })


    test('should run on default', async () => {
        const nam = await runCom(['-b', '5'])
        console.log(nam)
        expect(nam).toEqual(expect.objectContaining({
            b: 5,
            a: 10,
            s: false,
            n: 'table',
            d: './outputs',
        }))
    })

    test('should run on custom settings', async () => {
        const nam = await runCom(['-b', '8', '-a', '2', '-s'])
        console.log(nam)
        expect(nam).toEqual(expect.objectContaining({
            b: 8,
            a: 2,
            s: true,
            n: 'table',
            d: './outputs',
        }))
    })

    test('should throw an error if a or b are negative', async () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { return undefined as never }); 
        const logMock = jest.fn();
        const errorMock = jest.fn();
        console.log = logMock;
        console.error = errorMock;
        await runCom(['--b', '-20']);
        expect(mockExit).toHaveBeenCalledWith(1);
        expect(errorMock).toHaveBeenCalledWith('Error, numero negativo detectado');
        mockExit.mockRestore();
    })
})