import express from "express";
import dotenv from  "dotenv";
import databaseconnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";
dotenv.config({
    path:".env"
})

databaseconnection();
const app = express();


//middlewares

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());
const corsoption = {
    origin: "http://localhost:3000",
    credentials: true 
}

app.use(cors(corsoption));

//Api

app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.get("/home",(req,res) => {
    res.status(200).json({
        message: "helo frontend"
    })
} )

app.listen(process.env.PORT, ()=>{
    console.log("sdfafd");
})