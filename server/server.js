import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbConnect from "./config/dbConnect.js";  // Notice the .js extension
import fooRouter from "./routes/foodRoute.js";


// Load environment variables from .env file
dotenv.config();

// Database Connection
dbConnect()

// app config
const app = express()

app.use(express.json()) // Add this line to parse JSON bodies

app.use(cors())

const PORT = process.env.PORT || 4000
const hostName = process.env.HOST_NAME
 




// api endpoints
app.use("/api/food", fooRouter)
app.use("/images", express.static("uploads"))


// demo api
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Server</h1>")
})


// Start server
app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`)
})