import { SendEmailLogs } from '../domain/use-case/email/send-logs';
import { FileSystemDataSource } from '../infrastructure/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log-impl.repositovy';
import { EmailService } from './email/email.service';

const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)

const emailS = new EmailService();

export class Server {
    public static start() {
        console.log('aaaaaaaaaaaaaaaaaaaa')
        //User Case de Email Sender
        //new SendEmailLogs(emailS, fileSystemRepository).execute('gct.sofia.perez@gmail.com');

        /*
        emailS.sendEmailWithFileSystemlog('gct.sofia.perez@gmail.com')*/
        //Email Sender

        //NOC
        /*CronService.createJob(
            '*5 * * * * *',
            ()=>{
                new CheckService(
                    fileSystemRepository,
                    ()=>console.log( 'success' ),
                    (error) => console.log(error),
                ).execute('http://google.com')
            }
        );
        */
    }
}

Server.start