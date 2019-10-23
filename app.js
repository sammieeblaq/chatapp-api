const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

const { addUser, removeUser, getUser, getUserInRoom } = require("./users");



// Import the routes
const router = require("./router");



// For the socketio server
const http = require("http")
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    // To join room
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);

        // Admin generated messages
        socket.emit("message", { user: "admin", text: `${user.name}, welcome to the${user.room}`})
        // Send a message to everyone but the sender
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined!!`})

        // For a user joining another room
        socket.join(user.room);
        callback();
    });

    // Events for user generated messages
    socket.on("sendMessage", )
    
    socket.on("disconnect", () => {
        console.log("User had left");
    })
})



app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(router);



server.listen(port, () => console.log(`server running on port ${port}`));