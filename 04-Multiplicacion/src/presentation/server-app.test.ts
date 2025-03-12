import { Server } from "../presentation/server-app";
import { Create } from "../domain/use-cases/create-table.usecase";
import { Save } from "../domain/use-cases/save-file.usecase";

describe('Server', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    const options = {
        base: 5,
        limit: 20,
        showTable: true,
        name: 'sandia',
        destination: './tiburon',
    }

    test('Creating server instance', () => {
        const Serverapp = new Server();
        expect(Serverapp).toBeInstanceOf(Server);
        expect(typeof Server.run).toBe('function');
    })

    /*
    test('Runs with options', () => {
        const logspy =jest.spyOn(console,'log')
        const create =jest.spyOn(Create.prototype,'execute')
        const save =jest.spyOn(Save.prototype,'execute')

        Server.run(options)
        expect(logspy).toHaveBeenCalledTimes(3)
        expect(logspy).toHaveBeenCalledWith('Server is running...')
        expect(logspy).toHaveBeenLastCalledWith('Archivo creado')

        expect(create).toHaveBeenCalledTimes(1)
        expect(create).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        })

        expect(save).toHaveBeenCalledTimes(1)
        expect(save).toHaveBeenCalledWith({
            content: expect.any(String),
            destination: options.destination,
            name: options.name
        })
    })*/


    test('sds', () => {
        const errormod = jest.fn();
        const logmod = jest.fn();
        const createmod = jest.fn().mockReturnValue('1 x 2 = 2')
        const savemod = jest.fn();

        console.error=errormod
        console.log=logmod
        Create.prototype.execute=createmod
        Save.prototype.execute=savemod

        Server.run(options)

        expect(logmod).toHaveBeenCalledWith('Server is running...')
        expect(createmod).toHaveBeenLastCalledWith({"base": options.base, "limit": options.limit,})
        expect(savemod).toHaveBeenCalledWith({"content": "1 x 2 = 2","destination": options.destination, "name": options.name,})
        expect(errormod).not.toBeCalledWith();
    })


})