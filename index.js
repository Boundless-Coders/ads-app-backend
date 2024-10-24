
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import advertRouter from './routes/advert.js';
import userRouter from './routes/user.js';

//connect to database
await mongoose.connect(process.env.MONGO_URI)
//create an express app
const app = express();



app.use(express.json());

app.use(cors())
app.use(advertRouter);
app.use(userRouter);
//listen for incoming requests
app.listen(6060, () => {
    console.log('App is listening on port 6060');
});