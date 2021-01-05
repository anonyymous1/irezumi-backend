const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//User Schema
const favoriteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    url:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true,
    },
    imageURL: {
        type: String,
        default: null
    }
});

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
    },
    favorites:[favoriteSchema]
});

module.exports = User = mongoose.model('User', userSchema)