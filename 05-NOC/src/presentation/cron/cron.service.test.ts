import { CronService } from "./cron.service"

describe('cron',()=>{

    const bucktick = jest.fn()

    test('create a job',()=>{
        const job= CronService.createJob('* * * * *', bucktick)
        setTimeout(()=>{
            expect(bucktick).toBeCalledTimes(2)
            job.stop();
            done();
        },2000)
    })
})

function done() {
    throw new Error("Function not implemented.")
}
