import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import UserRoute from "./routes/userRoute.js";


const app= express();
//middleware
app.use(express.json());//json datar jonno
app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.urlencoded({extended: true})); //form datar jonno

app.get("/", (req, res)=>{
    
    res.send("Our project started");
})
//routes
app.use("/api/users", UserRoute);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Backend Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

//mongodb connect
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected");
}).catch((err)=>console.log(err))

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});

