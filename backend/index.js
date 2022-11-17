const express = require('express')
const app = express()
const cors = require('cors');


app.use(express.static('client'))

require('dotenv').config()
async function startServer() {

    try {
        app.use(cors({}));
        // Add body parser
        app.use(express.json())
        // Add routes
        require("./routes")(app)
        app.listen(5000, () => { console.log("server started on port 5000") })
    } catch (err) {
        console.log(err)
    }
}

startServer()