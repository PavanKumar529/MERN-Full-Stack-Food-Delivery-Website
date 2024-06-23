import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbConnect from "./config/dbConnect.js";  // Notice the .js extension
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

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
const hostName = process.env.HOST_NAME || "127.0.0.4"
 




// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// console.log("PORT:", process.env.PORT);
// console.log("HOST_NAME:", process.env.HOST_NAME);
// console.log("DB_URL:", process.env.DB_URL);
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
// console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);


// demo api
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am API from Sever</h1>")
})


// Start server
app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`)
})