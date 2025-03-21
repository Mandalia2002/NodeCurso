export class TodoEntity{
    constructor(
        public id: number,
        public text?: string,
        public created?: Date|null
    ){}

    get isCreated(){
        return !!this.created;
    }

    public static from(object:{[key: string]: any}):TodoEntity{
        const {id, text, created}= object;
        if (!id) throw 'Id is required'
        if (!text) throw 'Text is required'

        let newCreated
        if(created){
            newCreated =new Date(created)
            if(isNaN(newCreated.getTime())){
                throw 'Created is not a valid date'
            }
        } 
       return new TodoEntity(
            id, text, created
        )
    }
}