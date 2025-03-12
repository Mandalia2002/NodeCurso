interface user {
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

export function getUserbyId(id: number, callback: (err?: string, user?: user) => void) {
    const user = people.find(function (user) {
        return user.id === id;
    });
    if (!user) {
        return callback(`User not found ${id}`);
    }
    return callback(undefined, user);
}