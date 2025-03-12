import { CronJob } from 'cron'

type cronTime =string | Date;
type ontick = ()=> void;

export class CronService {

    static createJob( cronTime: cronTime, onTick:ontick): CronJob {
        const job = new CronJob(cronTime,onTick)
        job.start()
        return job
    }
}