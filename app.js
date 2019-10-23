const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

// Import the routes
const router = require("./router");



// For the socketio server
const http = require("http")
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("We have a new connection");

    socket.on("join", ({ name, room }) => {
        console.log(name, room);
    })
    
    socket.on("disconnect", () => {
        console.log("User had left");
    })
})



app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(router);



server.listen(port, () => console.log(`server running on port ${port}`));