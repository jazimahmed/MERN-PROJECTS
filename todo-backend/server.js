const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

//let todos = [];
//connecting mongo db
mongoose.connect('mongodb://localhost:27017/mern-app')
    .then(()=>{
        console.log('db connected');
    })
    .catch((err)=>{
        console.log(err);
    })

//schema
const todoSchema = new mongoose.Schema({
    title:  {
        required:true,
        type: String
    },
    description: String
}) 
//model
const todoModel = mongoose.model('todo',todoSchema);

app.post('/todos',async (req, res) => {
    const {title,description} = req.body;
    // const newtodo = {
    //     id : todos.length + 1,
    //     title,
    //     description

    // };
    // todos.push(newtodo);
    // console.log(newtodo);
    // 
    try{
        const newTodo = new todoModel({title,description});
        await newTodo.save();
        res.status(201).json(newTodo);
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }

});

app.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
});

app.get('/items/:id', (req, res) => {
  // Your code here
});

app.put('/todos/:id', async (req, res) => {
    const {title,description} = req.body;
    const id = req.params.id;
    console.log(title,description,id);
    try{
    const updatedTodo = await todoModel.findByIdAndUpdate(id,{title,description},{ new: true });
    if(!updatedTodo){
        return res.status(404).json({message:"todo not found"});
    }
    res.json(updatedTodo);}
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
});

app.delete('/todos/:id', async(req, res) => {
    try{const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end()}
    catch{
        console.log(error);
        res.status(500).json({message:error.message});
    }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
