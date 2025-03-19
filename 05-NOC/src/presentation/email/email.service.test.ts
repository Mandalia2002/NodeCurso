import { EmailService, sendEmailOptions } from "./email.service"
import nodemailer from 'nodemailer'

describe('email-service', () => {
    const mocksend = jest.fn()

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mocksend
    })

    const eS = new EmailService()

    const correo= 'gct.sofia.perez@gmail.com'

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('send email', async () => {

        const opt: sendEmailOptions = {
            to: correo,
            subject: 'aaaa',
            htmlBody: '<p>aaaa</p>',
            attachments: []
        }

        await eS.sendEmail(opt)
        expect(mocksend).toHaveBeenCalledWith({
            "to": correo,
            "subject": 'aaaa',
            "htmlBody": '<p>aaaa</p>',
            "attachments": expect.any(Array),
        })
    })

    test('send email with attachments', async () => {

        await eS.sendEmailWithFileSystemlog(correo)

        expect(mocksend).toHaveBeenCalledWith({
            to: correo,
            subject: "Logs",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                {filename: 'logs-all.log',path: './logs/logs-all.log'},
                {filename: 'logs-high.log',path: './logs/logs-high.log'},
                {filename: 'logs-medium.log',path: './logs/logs-medium.log'},
            ])
        })
    })
})