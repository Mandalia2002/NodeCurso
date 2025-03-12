
//import './app'
import { Server } from './presentation/server-app'

describe('app', () => {

    test('should be true', async () => {

        const servermock = jest.fn()
        Server.run = servermock;
        process.argv = ['node', 'app.ts', '-b', '10', '-a', '5', '-s', '-d', './test', '-n', 'test']

        await import('./app');

        expect(servermock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            destination: './test',
            name: 'test'
        });
    })
})