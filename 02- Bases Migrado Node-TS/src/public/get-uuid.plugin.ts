import {v4 as uuidv4} from 'uuid';

export const v4 = () =>{
    return uuidv4();
}

module.exports={
    v4,
}