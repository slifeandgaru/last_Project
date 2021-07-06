const mongoose = require('../config/connectDB')

let productSchema = mongoose.Schema({
    productname: String,
    price: String,
    discount: String,
    classify: String,
    description: String,
    amount: String,
    listPicture:[{
        type: String
    }]
},{
    collection: 'product'
})

// tạo model
const productModel = mongoose.model("product", productSchema);

// export
module.exports = productModel;

