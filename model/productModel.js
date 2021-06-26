const mongoose = require('../config/connectDB')

let productSchema = mongoose.Schema({
    productname: String,
    price: String,
    classifyID: String,
    description: String,
    amount: String,
    listPicture:[]
},{
    collection: 'product'
})

// tạo model
const productModel = mongoose.model("product", productSchema);

// export
module.exports = productModel;

