const mongoose = require('../config/connectDB')

let userSchema = mongoose.Schema({
    username: String,
    account:String,
    password: String,
    gender: String,
    phone: String,
    birthDate:String,
    address: String,
    email: String,
    avatar: String,
    cartID: String,
    listBill: [{
        idBill:{
            type: String,
            ref: 'bill'
        }
    }]
},{
    collection: 'user'
})

// tạo model
const userModel = mongoose.model("user", userSchema);

// export
module.exports = userModel;

