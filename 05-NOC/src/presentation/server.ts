import { EmailService, CronService } from './index';
import { LogSeverityLevel, CheckService, SendEmailLogs, CheckServiceMulti } from '../domain';
import { FileSystemDataSource, MongoLogDS, PostgresLogDataSource, LogRepositoryImpl} from '../infrastructure';

const fsRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)
const mongoRepository = new LogRepositoryImpl(
    new MongoLogDS()
)

const postgresRepository = new LogRepositoryImpl(
    new PostgresLogDataSource()
)

const emailS = new EmailService();

export class Server {
    public static async start() {
        console.log('aaaaaaaaaaaaaaaaaaaa')
        //User Case de Email Sender
        //new SendEmailLogs(emailS, fileSystemRepository).execute('gct.sofia.perez@gmail.com');

        /*
        emailS.sendEmailWithFileSystemlog('gct.sofia.perez@gmail.com')*/
        //Email Sender

        
        // const logs= await fileSystemRepository.getLog(LogSeverityLevel.low)
        // console.log(logs)

        //NOC
        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                new CheckServiceMulti(
                    [fsRepository, mongoRepository, postgresRepository],
                    ()=>console.log( 'success' ),
                    (error) => console.log(error),
                ).execute('http://google.com')
            }
        );
        
    }
}

Server.start