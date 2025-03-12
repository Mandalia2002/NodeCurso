import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface sendEmailOptions{
    to: string | string [],
    subject: string,
    htmlBody: string,
    attachments: Attachment[];
}

interface Attachment{
    filename: string;
    path: string;
}

export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    })

    async sendEmail(options: sendEmailOptions):Promise<boolean>{
        const {to, subject, htmlBody,attachments=[]}=options
        try{
            const sentInfo =await this.transporter.sendMail({
                to: to,
                subject: subject,
                html:htmlBody,
                attachments: attachments
            });

            console.log(sentInfo)

            return true;
        }catch(error){
            return false;
        }
    }

    async sendEmailWithFileSystemlog(to: string | string[]){
        const subject = 'Logs'
        const htmlBody = `
            <h1>ᛚᚨ ᛚᚢᚾᚨ ᚾᚢᛖᚨ ᛖᛊᛏᚨ ᛈᚱᛟᚷᚱᛖᛊᚨᚾᛞᛟ</h1>
            <h3>ᛖᛊᛏᚨ ᚾᚢᛖᚨ ᛁᛞᛖ ᛊᛖᚱᚨ ᛚᚨ ᚾᚢᛖᚨ ᛗᚢᛖᚱᛏᛖ ᛞᛖ ᛏᚢ ᛊᛖᚱ᛫ ᛞᛖᛊᛈᛁᛖᚱᛏᚨ ᛈᛟᚱᚠᚨᛟᚱ</h3>
            `
        const attachments:Attachment[]=[
            {filename: 'logs-all.log',path: './logs/logs-all.log'},
            {filename: 'logs-all.log',path: './logs/logs-high.log'},
            {filename: 'logs-all.log',path: './logs/logs-medium.log'},
        ]
        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }

}