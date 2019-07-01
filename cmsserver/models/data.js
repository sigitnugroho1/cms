const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let data = new Schema({
    letter: String,
    frequency: Number
})



module.exports = mongoose.model('Data', data);