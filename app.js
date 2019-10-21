const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;



// For the socketio server
const http = require("http")
const server = http.createServer(app);
const io = require("socket.io")(server);



app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))



server.listen(port, () => console.log(`server running on port ${port}`));