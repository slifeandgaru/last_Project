const mongoose = require('../config/connectDB')

let wishlistSchema = mongoose.Schema({
    userId: String,
    wishlist: [{
        productId: {
            type: String,
            ref: 'profuct'
        }
    }]
}, {
    collection: 'wishlist'
})

// tạo model
const wishlistModel = mongoose.model("wishlist", wishlistSchema);

// export
module.exports = wishlistModel;
