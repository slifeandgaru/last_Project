const mongoose = require('../config/connectDB')

let blacklistSchema = mongoose.Schema({
    token: String
},{
    collection: 'blacklist'
})

// tạo model
const blacklistModel = mongoose.model("blacklist", blacklistSchema);

// export
module.exports = blacklistModel;
