const mongoose = require('../config/connectDB')

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    address: String
},{
    collection: 'user'
})

let userModel = mongoose.model("user", userSchema)

module.exports = userModel