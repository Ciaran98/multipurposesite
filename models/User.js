const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});
// Export User Schema
module.exports = User = mongoose.model('user',UserSchema);