const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Last_Project',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

module.exports = mongoose