const express = require('express')
const app = express()
var port = 3000
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
})
app.get('/floda/gioi-thieu', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/gioithieu.html'))
})
app.get('/floda/lien-he', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/lienhe.html'))
})

app.listen(3000)