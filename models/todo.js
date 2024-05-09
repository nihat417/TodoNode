const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title :{type:String,required:true},
    desc:{type:String,required:true}
});

const todo = mongoose.model('Todo',todoSchema);
module.exports = todo;