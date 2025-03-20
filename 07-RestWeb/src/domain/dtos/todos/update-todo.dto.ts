
export class UpdateDTOS{

    private constructor(
        public readonly id: number,
         public readonly text?: string,
         public readonly created?: Date
     ){
     }

     get values(){
        const returnObj:{[key:string]:any}={}
        if(this.text)returnObj.text=this.text
        if(this.created)returnObj.created=this.created

        return returnObj
     }
 
     static create(props: {[key:string]:any}):[string?, UpdateDTOS?]{
 
         const {id, text, created}=props;
         let newCreated= created;
 
         if (!id || isNaN(Number(id))) {
            return ['ID Argument is not an number']
        }

         if ( created){
            newCreated = new Date(created)
            if( newCreated.toString()==='Invalid Date'){
                return ['created must be a valid date']
            }

         }


         return [undefined, new UpdateDTOS(id, text, newCreated)]
     }
 }