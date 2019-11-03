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

		socket.emit("message", { user: "admin", text: `${user.room}, welcome to the room ${user.room}`});
		socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined`});

		socket.join(user.room);

		callback();
	});
	
	// Waiting on sendMessage from the frontend to the backend
	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit("message", { user: user.name, text: message });
		callback();
	});

    socket.on("disconnect", () => {
        console.log("User has disconnected");
    })
});

app.use(router);

server.listen(port, () => console.log(`Server started on port ${port}`))