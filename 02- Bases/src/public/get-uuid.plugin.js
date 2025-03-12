const {v4: uuidv4} = require('uuid');

const v4 = () =>{
    return uuidv4();
}

module.exports={
    v4,
}