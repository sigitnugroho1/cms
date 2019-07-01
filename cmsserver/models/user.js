var mongoose = require('mongoose')
const validator = require('validator')


var Schema = mongoose.Schema


const User = new Schema({
    email: String,
    password: String,
    token: String
})




module.exports = mongoose.model('User', User)
