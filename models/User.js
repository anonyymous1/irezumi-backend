const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true,
        minLength: 8
    },
    date: {
        type: Date,
        default: Date.now()
    },
    imageURL: {
        type: String,
        default: null
    }
});

module.exports = User = mongoose.model('User', userSchema)