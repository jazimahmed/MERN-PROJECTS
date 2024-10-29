import express from "express";
const router = express.Router();
import  {Bookdb}  from "../models/mainModel.js";

//home route
router.get('/',(req,res)=>{
    console.log('accessed home route');
});

//get all books
router.get('/AllBooks',async(req,res)=>{
    try {
        const books = await Bookdb.find();
        res.status(201).json({
            count : books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
});

//route for saving book to db
router.post('/CreateBook',async(req,res)=>{
    try {
        if(!req.body.title ||!req.body.author || !req.body.publishYear){
            return res.status(400).json({message:'sent all required fields : title, author. publishyear'});
    
        }

    
    //save new book
    const { title, author, publishYear } = req.body;

    const newBook = await Bookdb.create({ title, author, publishYear });
    res.status(201).json(newBook);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

//get a single post by id
router.get('/GetBook/:id',async(req,res)=>{
    try {
        const book = await Bookdb.findById(req.params.id);
        if(!book){
            return res.status(404).json({message:'book not found by id'});
        }else{
            res.json(book);
            
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
//update end point
router.put('/UpdateBook/:id', async (req, res) => {
    try {
      const post = await Bookdb.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          author: req.body.author,
          publishYear:req.body.publishYear
        },
        { new: true } // This option ensures the updated post is returned
      );
  
      if (!post) {
        return res.status(404).json({ message: 'book not found by id to update' });
      }
  
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // deleting post
router.delete('/DeleteBook/:id',(req,res)=>{
    Bookdb.findByIdAndDelete(req.params.id)
  .then(deletedUser => res.json({message:'book deleted'}))
  .catch(err => {
    res.status(500).json({ message: err.message });
    console.error('Error deleting book:', err);
    });
});

export { router };