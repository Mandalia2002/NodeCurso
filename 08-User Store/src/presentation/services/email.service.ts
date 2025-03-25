import nodemailer, { Transporter } from 'nodemailer';
import { envs } from '../../config';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter: Transporter

    constructor(
        mailer_service: string,
        mailer_mail: string,
        mailer_secret: string
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailer_service,
            auth: {
                user: mailer_mail,
                pass: mailer_secret,
            }
        });
    }


    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;


        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });

            // console.log( sentInformation );

            return true;
        } catch (error) {
            return false;
        }

    }

}