import { envs } from "./envs.plugin"


describe('envs', () => {

    test('aa', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_MAIL: 'madelineabadeer1020@gmail.com',
            MAILER_SECRET_KEY: 'nrnyfhqhfdcarkak',
            MAILER_SERVICE: 'gmail',
            PROD: false,
            MONGO_URL: 'mongodb://mandalia_s:098765@localhost:27017/?authMechanism=DEFAULT',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'mandalia_s',
            MONGO_PASS: '098765'
        })
    })

    test('if env not found, return error', async()=>{
        jest.resetModules()
        process.env.PORT='aaaaaa'
        try{
            await import('./envs.plugin')
            expect(true).toBe(false)
        }catch(error){
            expect (`${error}`).toContain('"PORT" should be a valid integer')
        }
        
        
    })
})