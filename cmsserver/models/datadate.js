const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let datadate = new Schema({
    letter: Date,
    frequency: Number
})



module.exports = mongoose.model('Datadate', datadate);