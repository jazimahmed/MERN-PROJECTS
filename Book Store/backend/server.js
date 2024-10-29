import express  from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { router } from "./routes/allRoutes.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

//connect to mongo db
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>{
    console.log('mongodb connected on mongodb://localhost:27017/mern-app');
})
.catch((err)=>{
    console.log('db error',err)
});

//using routers
app.use('/BookStore', router);

app.listen(PORT,()=>{
    console.log('server connected to port '+PORT);
});