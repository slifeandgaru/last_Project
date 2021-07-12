const mongoose = require('../config/connectDB')

let cartSchema = mongoose.Schema({
    userId: [{
        type: String,
        ref: 'user'
    }],
    listProduct: {
        idProduct:{
            type: String,
            ref: 'product'
        },
        amount: String
    }
},{
    collection: 'cart'
})

// tạo model
const cartModel = mongoose.model("cart", cartSchema);

// export
module.exports = cartModel;

