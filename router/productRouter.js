const productModel = require('../Model/productModel')
const managertModel = require('../Model/managerModel')
const cartModel = require('../model/cart')
// const cart2Model = require('../model/cart')
const cartDoneModel = require('../model/cartDone')
const billModel = require('../model/bill')
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

    cartModel.cartModel.findOne({ userId: userId })
        .then((data) => {
            console.log(data);
            if (data == null) {
                cartModel.cartModel.create({
                    userId,
                    listProduct: {
                        idProduct,
                        amount
                    }
                })
                    .then((data) => {
                        console.log("tao moi");
                        console.log(data);
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                cartModel.cartModel.updateOne({
                    userId: userId
                }, {
                    $push: {
                        listProduct: {
                            idProduct,
                            amount: amount
                        }
                    }
                })
                    .then((data) => {
                        console.log("update");
                        console.log(data);
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        }).catch((err) => {
            console.log(err);
        })
})

router.post("/load_cart", async (req, res) => {
    let userId = req.body.userId
    var findProduct = []
    let decoed = jwt.verify(userId, 'user')
    // console.log(decoed.id)
    var findone = await cartModel.cartModel.findOne({ userId: decoed.id })
    // console.log(findone);
    if (findone.listProduct == null) {
        console.log("null dm");
    } else {
        for (let i = 0; i < findone.listProduct.length; i++) {
            var findPro = await productModel.findOne({
                _id: findone.listProduct[i].idProduct
            })
            findProduct.push(findPro)
            // console.log(findPro);
        }
    }
    res.json({
        error: false,
        message: "some thing",
        value: findone,
        value2: findProduct
    })
})


router.delete("/remove_cart/:id/:number", async (req, res) => {
    var id = req.params.id
    var number = req.params.number
    let decoed = jwt.verify(id, 'user')
    console.log(number);
    var remove = await cartModel.cartModel.updateOne({
        _id: decoed.id
    }, {
        $pull: { listProduct: { _id: number } }
    })
    res.json({
        error: false,
        message: "remove done",
        value: remove,
    })
})

router.post("/create_bill", (req, res) => {
    var lastname = req.body.lastname
    var surname = req.body.surname
    var address = req.body.address
    var city = req.body.city
    var phone = req.body.phone
    var email = req.body.email
    var cartId = req.body.cartId
    var totalPrice = req.body.totalPrice

    billModel.create({ lastname, surname, address, city, phone, email, cartId, totalPrice })
        .then((data) => {
            cartModel.cartModel.findOne({
                _id: cartId
            }, function (err, result) {
                let swap = new (cartModel.cart2Model)(result.toJSON())
                result.remove()
                swap.save()
                console.log(result);
            })
        }).catch((err) => {
            console.log(err);
        })
})


module.exports = router