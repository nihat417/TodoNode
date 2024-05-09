require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const DATABASE_URL = process.env.DATABASE_URL;

const app =express();
app.use(express.json());


mongoose
.connect(DATABASE_URL)
    .then(()=>{console.log('connected mongodb atlas')})
    .catch((error)=>{console.log('Error:',error)});

app.use('/todos',todoRoutes);
app.use('/auth',authRoutes);


app.listen(4000,()=>{console.log("server running on 4000 port")})