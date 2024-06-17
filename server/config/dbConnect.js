import mongoose from "mongoose";

async function dbConnect() {
    try {

        // mongoose connection
        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to db");
        });

        // mongoose error
        mongoose.connection.on("error", (err) => {
            console.log(err.message);
        });

        // mongoose disconnected
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose connection is disconnected");
        });
        // db connection
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);


    } catch (err) {
        console.log(err);
        return;
    }
}

// Handle SIGINT (Ctrl + C)
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default dbConnect;
