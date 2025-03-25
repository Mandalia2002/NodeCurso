import { regularExps } from "../../../config/regular-exp"

export class LoginDTO {
    private constructor(
        public email: string,
        public password: string,
    ) {}
    
    static check(object:{[key:string]:any}):[string?, LoginDTO?]{
        const{email, password}=object

        if(!email) return ['Missing Email']
        if(!password) return ['Missing Password']
        if(!regularExps.email.test(email)) return ['Email not valid']

        return [undefined, new LoginDTO(email, password)]
    }
}