const mongoose = require('../config/connectDB')

let productSchema = mongoose.Schema({
    productID: String,
    proName: String,
    type: String,
    price: Number,
    color: String
},{
    colletion: "product"
})

let productModel = mongoose.model("product", productSchema)

module.exports = productModel