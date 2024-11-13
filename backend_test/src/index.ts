import express from "express";
import { connectDB } from "../services/database.service"
import { movieRouter } from "../routes/movie";
import { userRouter } from "../routes/user";

const app = express()

connectDB()
    .then(() => {
        app.use("/movies", movieRouter);
        app.use("/users", userRouter);

    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });


app.listen(process.env.PORT, () =>
    console.log(`Server running!`)
)

export default connectDB;
