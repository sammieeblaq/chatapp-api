const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketio(server); 

const router = require("./router");
const { addUser, getUser, getUsersInRoom, removeUser } = require("./users");

io.on("connection", socket => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);
    })

    socket.on("disconnect", () => {
        console.log("User has disconnected");
    })
});

app.use(router);

server.listen(port, () => console.log(`Server started on port ${port}`))