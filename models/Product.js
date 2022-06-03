const mongoose = require('mongoose');

// Define Product Schema
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    }
});

// Export Product Schema
module.exports = Product = mongoose.model('product',ProductSchema);