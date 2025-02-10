import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({});
import cookieParser from 'cookie-parser'
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from "./routes/application.route.js";
// app config
const app =  express()
const port = process.env.PORT || 4000


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

// api endpoint
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.get('/',(req,res)=>{
res.send('api working great on nodejs')
})
connectDB();
app.listen(port,()=>console.log("server started",port))