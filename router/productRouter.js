const productModel = require('../Model/productModel')
const managertModel = require('../Model/managerModel')
const cartModel = require('../model/cart')
const express = require('express');
const multer = require('multer');
// const ejs = require('ejs');
const jwt = require('jsonwebtoken')
// (fs)

const router = express.Router();
const path = require('path')

router.get('/cua-hang/:classify', (req, res) => {
    let classify = req.query.classify
    console.log(classify);
})

router.get("/load_product/:id", (req, res) => {
    let id = req.params.id
    // let decoed = jwt.verify(product, 'Admin')
    // console.log(decoed);
    productModel.findOne({ _id: id })
        .then((data) => {
            res.json({
                error: false,
                message: "load thành công",
                value: data
            })
        }).catch((err) => {
            res.json({
                error: true,
                message: "load không thành công"
            })
        })

})

router.post("/add_to_cart/:userId/:idProduct", (req, res) => {
    let token = req.params.userId
    let idProduct = req.params.idProduct
    let amount = req.body.amount
    let decoed = jwt.verify(token, 'user')
    let userId = decoed.id
    console.log(userId)
    console.log(amount)

    cartModel.create({
        userId,
        listProduct: {
            idProduct,
            amount
        }
    })
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err)
        })
})

module.exports = router