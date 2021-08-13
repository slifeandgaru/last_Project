const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://slifeandgaru:Truong0989@cluster0.1amwm.mongodb.net/floda?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
    
})


module.exports = mongoose