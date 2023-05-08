const express = require('express')
const app = express()
const router = require('./router/index')
const bodyParser = require('body-parser')
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//read file
app.use('/public', express.static(path.join(__dirname, "/public")))
//html
app.get('/floda', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/home.html'))
})*
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

app.listen(process.env.PORT || 3003)