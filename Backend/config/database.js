import mongoose from "mongoose"
import dotenv from  "dotenv";

dotenv.config({
    path:"../config/.env"
})
const databaseconnection = () => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected")
    }).catch((err) =>{
        console.log(err);
    })
}

export default databaseconnection;