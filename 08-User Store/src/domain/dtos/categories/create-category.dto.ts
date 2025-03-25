
export class CreateCatDTO{
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ){}
    static create(object:{[key:string]:any}):[string?, CreateCatDTO?]{
            const{name, available}=object
            let availableBoolean = available
    
            if(!name) return ['Missing Name', ]
            if(typeof available !== 'boolean') {
                availableBoolean= (available==='true')
            }
    
            return [undefined, new CreateCatDTO(name, available)]
        }
}