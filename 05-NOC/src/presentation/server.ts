import { EmailService } from './email/email.service';

/*const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)*/

export class Server {
    public static start() {
        console.log('aaaaaaaaaaaaaaaaaaaa')
        //const emailS = new EmailService();
        //emailS.sendEmailWithFileSystemlog('gct.sofia.perez@gmail.com')
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