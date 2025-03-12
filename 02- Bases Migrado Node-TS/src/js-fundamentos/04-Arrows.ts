interface user{
    id: number,
    name: string
}

const people: user[] = [
    {
        id: 1,
        name: 'sandia',
    },
    {
        id: 2,
        name: 'asdfsdf',
    }
];


export const arr = (id:number, callback:(err?:string, user?:user) => void) => {
    var user
    user = people.find((user)=>{
        return user.id===id;
    });
    if(!user) {
        return callback('User not Found ${id}')
    }
    return callback(undefined,user);
}



/*function getUserbyId(id, callback) {
    const user = people.find(function (user) {
        return user.id === id;
    });
    if (!user) {
        return callback('User not found ${id}');
    }
    return callback(null, user);
}


*/
/*FUncionaa AAAAAAAAAAAAAA */