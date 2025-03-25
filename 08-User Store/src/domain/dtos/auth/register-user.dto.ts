import { regularExps } from "../../../config/regular-exp"

export class RegisterDTO {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}
    static create(object:{[key:string]:any}):[string?, RegisterDTO?]{
        const{name, email, password}=object

        if(!name) return ['Missing Name', ]
        if(!email) return ['Missing Email', ]
        if(!password) return ['Missing Password', ]
        if(!regularExps.email.test(email)) return ['Email not valid']
        if(password.length<6) return ['Password too short']

        return [undefined, new RegisterDTO(name, email, password)]
    }
}