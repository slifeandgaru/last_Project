const express = require('express')
const app = express()
var port = 3000
const router = require('./router/index')
const bodyParser = require('body-parser')
const path = require('path')
const manager = require("./router/managerRouter")
const load = require("./router/staffRouter")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/managerRouter", manager)
app.use("/load", load)
//read file
app.use(express.static( __dirname + "/public"))
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
app.get('/create', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/managerRegister.html'))
})
app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/mLogin.html'))
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/staffWorkSpace/staffWS.html'))
})
app.get('/floda/cua-hang', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/store.html'))
})
app.get('/floda/san-pham', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/product.html'))
})

app.listen(3000)