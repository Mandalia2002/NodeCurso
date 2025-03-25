import { bcryptmanager, envs, jsonwebtokenmanager } from "../../config";
import { userModel } from "../../data/mongo";
import { CustomError, RegisterDTO, UserIdentity, LoginDTO } from "../../domain";
import { EmailService } from "./email.service";


export class AuthService {
    constructor(
        private readonly emailService: EmailService
    ) { }

    public async registerUser(register: RegisterDTO) {
        const exist = await userModel.findOne({ email: register.email })
        if (exist) throw CustomError.badrequest('Email already exists')
        try {
            const user = new userModel(register)

            user.password = bcryptmanager.hash(register.password)

            await user.save()

            this.sendEmailValidate(user.email)

            const { password, ...rest } = UserIdentity.fromObject(user)

            return {
                user: rest,
                token: 'ABC'
            }
        } catch (error) {
            throw CustomError.internalserver(`${error}`)
        }
    }

    public async loginUser(login: LoginDTO) {
        const exist = await userModel.findOne({ email: login.email })
        if (!exist) throw CustomError.badrequest('User doesn´t exists')

        const check = bcryptmanager.compare(login.password, exist.password)
        if (check == false) throw CustomError.badrequest('Incorrect Password')

        const { password, ...rest } = UserIdentity.fromObject(exist)

        const token = await jsonwebtokenmanager.generate({ id: exist.id })
        if (!token) throw CustomError.internalserver('Error creating the token')

        return {
            user: rest,
            token: token
        }
    }

    private sendEmailValidate = async (email: string) => {
        const token = await jsonwebtokenmanager.generate({ email })
        if (!token) throw CustomError.internalserver('Error getting token')

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`

        const html = `<h1>Buenas!!</h1>
        <h1>Porfavor valida tu correo</h1>
        <a href="${link}">Valida tu correo :3 :${email}</a>`

        const options = {
            to: email,
            subject: 'Validacion Correo',
            htmlBody: html
        }

        const isSet = await this.emailService.sendEmail(options)
        if (!isSet) return CustomError.internalserver('Error sending email')

        return true
    }

    public validateEmail = async (token: string) => {
        const payload = await jsonwebtokenmanager.validate(token)
        if (!payload) throw CustomError.unathorized('Token not valid')

        const { email } = payload as { email: string }
        if (!email) throw CustomError.internalserver('Email not in token')

        const user = await userModel.findOne({ email })
        if (!user) throw CustomError.internalserver('User doesnt exists')

        user.valid=true
        await user.save()

        return true
    }
}