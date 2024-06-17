import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect.js";  // Notice the .js extension

// app config
const app = express()

app.use(express.json())


// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000
const hostName = process.env.HOST_NAME


// Database Connection
dbConnect()








// demo api
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Server</h1>")
})


// Start server
app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`)
})