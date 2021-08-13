const express = require('express')
const app = express()
var port = 3000
const router = require('./router/index')
const bodyParser = require('body-parser')
const path = require('path')
const manager = require("./router/managerRouter")
const staff = require("./router/staffRouter")
const product = require("./router/productRouter")
const user = require("./router/userRouter")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/managerRouter", manager)
app.use("/staffRouter", staff)
app.use("/productRouter", product)
app.use("/userRouter", user)

//read file
app.use('/public',express.static( __dirname + "/public"))
//html

app.get('/floda', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/home.html'))
})

app.get('/floda/gioi-thieu', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/gioithieu.html'))
})

app.get('/floda/lien-he', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/lienhe.html'))
})

app.get('/floda/cua-hang', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/store.html'))
})

app.get('/floda/san-pham', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/product.html'))
})
app.get('/floda/wishlist', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/wishlist.html'))
})
app.get('/floda/gio-hang', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/shopping-cart.html'))
})
app.get('/floda/thanh-toan', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/payment.html'))
})

app.get('/create', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/managerRegister.html'))
})
app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/mLogin.html'))
})

app.get('/staffWS', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/WorkSpace/staffWS.html'))
})
app.get('/managerWS', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/WorkSpace/managerWS.html'))
})
app.get('/controlBill', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/WorkSpace/controlBill.html'))
})

app.get('/userRegister', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/userRegister.html'))
})

app.get('/userdetail', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/userdetail.html'))
})

app.get('/userHistory', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/userHistory.html'))
})


app.listen(process.env.PORT || 3000);
