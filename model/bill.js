const mongoose = require('../config/connectDB')

let billSchema = mongoose.Schema({
    lastname: String,
    surname: String,
    address: String,
    city: String,
    phone: String,
    email: String,
    cartId: {
        type: String,
        ref: "cart"
    },
    totalPrice: String
},{
    collection: 'bill'
})

// tạo model
const billModel = mongoose.model("bill", billSchema);

// export
module.exports = billModel;

