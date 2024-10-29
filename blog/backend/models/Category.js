import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },  // unique is part of the options for this field
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});



const Category = mongoose.model('Category',CategorySchema);
export default Category;