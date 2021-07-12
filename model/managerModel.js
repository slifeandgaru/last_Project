const mongoose = require('../config/connectDB')

const managerSchema = mongoose.Schema({
    account: String,
    name: String,
    password: String,
    email: String,
    address: String,
    phone: String,
    role: String
},{
    collection: 'manager'
})

const managerModel = mongoose.model("manager", managerSchema)

module.exports = managerModel