import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    title:{type: String, required: true},
    author:{type: String, required: true},
    publishYear:{type: Number, required: true},
},
    {
        timestamps:true,
    }

);

export const Bookdb = mongoose.model('Bookdb',BookSchema);