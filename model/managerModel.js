const mongoose = require('../config/connectDB')

let managerSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    address: String,
    phone: Number,
    role: String
},{
    colletion: "manager"
})

let managerModel = mongoose.model("manager", managerSchema)

module.exports = managerModel