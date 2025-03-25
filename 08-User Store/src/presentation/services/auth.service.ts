import { bcryptmanager } from "../../config";
import { userModel } from "../../data/mongo";
import { CustomError, RegisterDTO, UserIdentity } from "../../domain";
import { LoginDTO } from "../../domain/dtos/auth/login-user.dto";


export class AuthService {
    constructor() { }

    public async registerUser(register: RegisterDTO) {
        const exist = await userModel.findOne({ email: register.email })
        if (exist) throw CustomError.badrequest('Email already exists')
        try {
            const user = new userModel(register)

            user.password = bcryptmanager.hash(register.password)

            await user.save()

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
        console.log('aaaa')
        const exist = await userModel.findOne({ email: login.email })
        if (!exist) throw CustomError.badrequest('User doesn´t exists')

        const passnow= bcryptmanager.hash(exist.password)

        console.log(passnow)

        const check = bcryptmanager.compare(login.password, passnow)
        if (check == false) throw CustomError.badrequest('Incorrect Password')

        try {
            
            const { password, ...rest } = UserIdentity.fromObject(exist)

            return {
                user: rest,
                token: 'ABC'
            }
        } catch (error) {
            throw CustomError.internalserver(`${error}`)
        }
    }
}