import express from 'express';

const router = express.Router();
import Category from '../models/Category.js';
import Post from '../models/Post.js';

//const Post = require('../models/Post');


// get all posts
router.get('/',async(req,res)=>{
    try {
        const posts = await Post.find();
        res.json(posts);
        console.log(posts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//get a single post by id
router.get('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:'post not found by id'});
        }else{
            res.json(post);
            
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//creating a new post
 router.post('/',async(req,res)=>{
    const post = new Post(req.body);

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
 });

 //update end point
 router.put('/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          author: req.body.author,
          image: req.body.image,
          updatedAt: Date.now(),
        },
        { new: true } // This option ensures the updated post is returned
      );
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found by id to update' });
      }
  
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// deleting post
router.delete('/:id',(req,res)=>{
    Post.findByIdAndDelete(req.params.id)
  .then(deletedUser => res.json({message:'post deleted'}))
  .catch(err => {
    res.status(500).json({ message: err.message });
    console.error('Error deleting user:', err);
    });
});

//fetch post by category id
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if category exists
    const categoryExist = await Category.findById(categoryId);
    if (!categoryExist) {
      return res.status(404).json({ message: 'Invalid category ID' });
    }

    // Fetch posts in the given category
    const posts = await Post.find({ category: categoryId }).populate('category');
    res.status(200).json(posts);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
//module.exports = router;
