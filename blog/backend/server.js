import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/posts.js'
import { router as categoryRouter } from './routes/categories.js';
import cors from 'cors';


const app = express();
const PORT = 5000;

//middle ware
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//connect to mongo db
mongoose.connect('mongodb://localhost:27017/mern-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('mongodb connected');
})
.catch((err)=>{
    console.log('db error',err)
});

// use routes
app.use('/api/posts', router);
app.use('/api/categories',categoryRouter);

app.listen(PORT,()=>console.log('server running on port '+ PORT));
