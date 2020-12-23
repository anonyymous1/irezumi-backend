const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const tattooShopSchema = new Schema({
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

module.exports = Tattoo = mongoose.model('Tattoo', tattooShopSchema)