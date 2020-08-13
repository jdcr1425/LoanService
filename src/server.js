require('./config/enviroment');

const express = require("express");

const cors = require("cors");

const db = require("./config/database")

const app = express();


app.use(express.json())

app.set('port', process.env.PORT || 3000);

app.use(cors());

//Routes
require("./router")(app);




app.listen(app.get('port'), () => {
    console.log(`App running on port ${app.get("port")}`)
});