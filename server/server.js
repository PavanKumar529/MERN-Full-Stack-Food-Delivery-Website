import express from "express"
import dotenv from "dotenv"
// app config
const app = express()

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000
const hostName = process.env.HOST_NAME



// demo api
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Server</h1>")
})


// Start server
app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`)
})