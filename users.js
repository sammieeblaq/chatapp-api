const users = [];

// Function to add users
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    // To find if there's an existing user
    const existingUser = users.find(user => user.room === room && user.name === name);
    if (existingUser)
        return { error: "Username is taken" }
    // If no existing User
    const user = { id, name, room };
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    // If user with index exists
    if (index !== -1)
        return users.splice(index, 1)[0];
}

const getUser = (id) => users.find(user => user.id === id);

const getUsersInRoom = (room) => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };