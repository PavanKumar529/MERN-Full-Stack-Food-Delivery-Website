import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbConnect from "./config/dbConnect.js";  // Notice the .js extension
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

// import "dotenv/config.js"

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
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))

app.use("/api/user", userRouter)





// demo api
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Server</h1>")
})


// Start server
app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`)
})