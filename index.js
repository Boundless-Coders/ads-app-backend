
// const express = require('express');
import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './routes/todo.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors'

// connect to database
await mongoose.connect(process.env.MONGO_URI);

// create an express app
const app = express();

// use middlewares
app.use(cors())
app.use(express.json())

//  Use routes
app.use(todoRouter);
app.use(userRouter);


// Listen for incoming request
app.listen(3000, () => {
    console.log('app is listening on port 3000')
});