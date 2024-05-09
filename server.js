const express = require('express');
const mongoose = require('mongoose');
const todoModules = require('./routes/todoRoutes');

const app =express();
app.use(express.json());




app.listen(4000,()=>{console.log("server running on 4000 port")})