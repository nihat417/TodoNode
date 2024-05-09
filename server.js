require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const DATABASE_URL = process.env.DATABASE_URL;
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');

const app =express();
const cpNum = os.cpus().length;


app.use(express.json());
app.use(cors());


if(cluster.isMaster){
    for (let index = 0; index < cpNum; index++) {
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker with pid ${worker.process.pid} died`);
        cluster.fork();
    });
}else{
    app.listen(4000,()=>{
        console.log(`server running on ${process.pid} @ 4000`);
    });
}



mongoose
.connect(DATABASE_URL)
    .then(()=>{console.log('connected mongodb atlas')})
    .catch((error)=>{console.log('Error:',error)});

app.use('/todos',todoRoutes);
app.use('/auth',authRoutes);


// app.listen(4000,()=>{console.log("server running on 4000 port")})