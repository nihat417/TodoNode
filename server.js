const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

const app =express();
app.use(express.json());


mongoose
.connect(
    "mongodb+srv://akreminihat:NihatAdmin12!@cluster0.btnsypk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",)
    .then(()=>{console.log('connected mongodb atlas')})
    .catch((error)=>{console.log('Error:',error)});

app.use('/todos',todoRoutes);



app.listen(4000,()=>{console.log("server running on 4000 port")})