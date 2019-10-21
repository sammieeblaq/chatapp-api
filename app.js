const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        "message": "hello Internet"
    })
})



app.listen(port, () => console.log(`server running on port ${port}`));