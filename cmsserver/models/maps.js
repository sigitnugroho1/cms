const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let maps = new Schema({
    title: String,
    lat: Number,
    lng: Number
})



module.exports = mongoose.model('Maps', maps);