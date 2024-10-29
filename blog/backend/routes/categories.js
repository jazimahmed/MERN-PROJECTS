import express from 'express';
const router = express.Router();
import Category from '../models/Category.js';


// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get a single category by id
router.get('/:id',async(req,res)=>{
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({message:'category not found by id'});
        }else{
            res.json(category);
            
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//create new category
router.post('/',async(req,res)=>{
    const category = new Category(req.body);

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
 });
// Update category by ID
router.put('/:id', async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          slug: req.body.slug,
          description: req.body.description,
          updatedAt: Date.now(), // Automatically updating the 'updatedAt' timestamp
        },
        { new: true } // Ensures the updated document is returned
      );
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found to update' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// deleting post
router.delete('/:id',(req,res)=>{
    Category.findByIdAndDelete(req.params.id)
  .then(deletedUser => res.json({message:'category deleted'}))
  .catch(err => {
    res.status(500).json({ message: err.message });
    console.error('Error deleting category:', err);
    });
});
export { router };

  
