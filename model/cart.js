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
})

// tạo model
const cartModel = mongoose.model("cart", cartSchema);
const cart2Model = mongoose.model("cart2", cartSchema);

// export
// module.exports = cartModel 
    // cart2Model: cart2Model
module.exports = {
    cartModel: cartModel,
    cart2Model: cart2Model
}

