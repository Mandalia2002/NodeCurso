const people = [
    {
        id: 1,
        name: 'sandia',
    },
    {
        id: 2,
        name: 'asdfsdf',
    }
];


const arr = (id, callback) => {
    var user
    user = people.find((user)=>{
        return user.id===id;
    });
    if(!user) {
        return callback('User not Found ${id}')
    }
    return callback(null,user);
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

module.exports = {
    arr
}

/*FUncionaa AAAAAAAAAAAAAA */