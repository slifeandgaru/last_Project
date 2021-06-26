const mongoose = require('../config/connectDB')

let billSchema = mongoose.Schema({
    userId: [{
        type: String,
        ref: 'user'
    }],
    listProduct: [{
        idProduct:{
            type: String,
            ref: 'product'
        },
        amount: String
    }],
    totalPrice: String
},{
    collection: 'bill'
})

// tạo model
const billModel = mongoose.model("bill", billSchema);

// export
module.exports = billModel;

