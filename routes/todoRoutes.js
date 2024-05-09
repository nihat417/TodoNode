const express = require('express');
const router = express.Router();
const todo = require("../models/todo");

router.get('/',async (req,res)=>{
    try {
        const todos = await todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

router.get('/:id',async (req,res)=>{
    try {
        const todoS = await todo.findById(req.params.id);
        res.json(todoS)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});


router.post('/',async (req,res)=>{
    const todos = new todo({
        title:req.body.title,
        desc:req.body.desc
    });
    try {
        const newtodos = await todos.save();
        res.status(201).json({newtodos});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});


router.delete('/:id',async (req,res)=>{
    await todo.findByIdAndDelete(req.params.id);
    res.json({message:'todo deleted'});
})


module.exports = router;