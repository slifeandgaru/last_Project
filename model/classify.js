const mongoose = require('../config/connectDB')

let classifySchema = mongoose.Schema({
    classifyname: String
},{
    collection: 'classify'
})

// tạo model
const classifyModel = mongoose.model("classify", classifySchema);

// export
module.exports = classifyModel;

