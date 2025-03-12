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

function getUserbyId(id, callback) {
    const user = people.find(function (user) {
        return user.id === id;
    });
    if (!user) {
        return callback('User not found ${id}');
    }
    return callback (null, user);
}

module.exports = {
    getUserbyId
}