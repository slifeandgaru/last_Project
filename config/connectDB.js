const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://truongnx28062000:Ivw4449zUqhswUoS@cluster0.0qv4t8g.mongodb.net/Last_Project?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

module.exports = mongoose