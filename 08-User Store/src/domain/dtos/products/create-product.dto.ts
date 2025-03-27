import { Validators } from "../../../config/validators"

export class CreateProDTO{
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string
    ){}
    static create(object:{[key:string]:any}):[string?, CreateProDTO?]{
            const{name, available,price,description,user,category}=object
            let availableBoolean = available
    
            if(!name) return ['Missing Name', ]
            if(typeof available !== 'boolean') {
                availableBoolean= (available==='true')
            }
            if(!price) return ['Missing price', ]
            if(price < 0) return ['Invalid price', ]
            if(!description) return ['Missing description', ]
            if(!Validators.isMongoId(user)) return['Invalid User Id']
            if(!Validators.isMongoId(category)) return['Invalid Category Id']
    
            return [undefined, new CreateProDTO(name, available,price,description,user,category)]
        }
}