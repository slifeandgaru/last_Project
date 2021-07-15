const mongoose = require('../config/connectDB')

let cartSchema = mongoose.Schema({
    userId: String,
    listProduct: [{
        idProduct:{
            type: String,
            ref: 'product'
        },
        amount: String
    }],
    status: String
},{
    collection: 'cart'
})

// tạo model
const cartDoneModel = mongoose.model("cartDone", cartSchema);

// export
module.exports = cartDoneModel;
