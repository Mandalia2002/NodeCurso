import { envs } from '../src/config/envs'
import { Server } from '../src/presentation/server'

jest.mock('../src/presentation/server')

describe('App.ts', () => {
    test('should called Server', async () => {

        await import('../src/app')
        expect(Server).toHaveBeenCalledTimes(1)
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            publicpath: envs.PUBLIC_PATH,
            routes: expect.any(Function),
        })
        expect (Server.prototype.start).toHaveBeenCalled()
    })
})