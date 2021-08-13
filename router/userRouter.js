const userModel = require('../model/userModel')
const billModel = require('../model/bill')
const cartModel = require('../model/cart')
const productModel = require('../model/productModel')
const express = require('express');
const multer = require('multer');
const checkAuth = require('../middlewave/middlewave')
// const ejs = require('ejs');
const jwt = require('jsonwebtoken')
// (fs)
// const fs = require('fs');

const router = express.Router();
const path = require('path')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post("/", checkAuth.checkUser, (req, res) => {
    let username = req.body.username
    let account = req.body.account
    // let password = req.body.password
    let gender = req.body.gender
    let birthDate = req.body.birthDate
    let phone = req.body.phone

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            userModel.create({ username, account, password: hash, gender, birthDate, phone })
                .then((data) => {
                    res.json({
                        error: false,
                        message: "create successful",
                        data: data
                    })
                }).catch((err) => {
                    res.json({
                        error: true,
                        message: "create fail " + err
                    })
                })
        });
    });
})

router.post("/login", (req, res) => {
    // try {
    let account = req.body.account
    let password = req.body.password
    // console.log(role);
    userModel.findOne({ account })
        .then((data) => {
            console.log(data);
            if (data == null) {
                res.json({
                    error: true,
                    message: "tai khoan khong chinh xac"
                })
            }
            if (data) {
                bcrypt.compare(password, data.password, function (err, result) {
                    if (result) {
                        console.log(result);
                        let token = jwt.sign({ id: data._id }, 'user')
                        // let decoed = jwt.verify(token, 'Admin')
                        // console.log(decoed.id);
                        res.json({
                            token: token,
                            error: false,
                            message: 'đăng nhập thành công',
                            value: data.role
                        })
                    } else {
                        res.json({
                            error: true,
                            message: "sai mat khau"
                        })
                    }
                })
            }

        }).catch((err) => {
            res.json({
                error: true,
                message: "loi o catch " + err
            })
        })
}
    // catch (error) {
    //     return res.json({
    //         error: true,
    //         message: "loi o try catch " + err
    //     })
    // }
    // }


)

router.get("/loaduser/:id", checkAuth.checkToken, (req, res) => {
    try {
        let token = req.params.id
        let decoed = jwt.verify(token, 'user')
        // console.log(token);
        managertModel.findOne({ _id: decoed.id })
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

    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + error
        })
    }

})


router.get("/load_user_information/:id", checkAuth.checkToken, (req, res) => {
    try {
        let token = req.params.id
        let decoed = jwt.verify(token, 'user')
        // console.log(token);
        userModel.findOne({ _id: decoed.id })
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

    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + error
        })
    }
})


router.post("/change_user_name", (req, res) => {
    try {
        let username = req.body.username
        let token = req.body.token
        let decoed = jwt.verify(token, 'user')
        // console.log(token);
        userModel.updateOne({ _id: decoed.id }, { username: username })
            .then((data) => {
                res.json({
                    error: false,
                    message: "Thay đổi thành công",
                    value: data
                })
            }).catch((err) => {
                res.json({
                    error: true,
                    message: "không thành công"
                })
            })

    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + error
        })
    }
})


router.post("/change_phone_number", checkAuth.checkPhoneNumber, (req, res) => {
    try {
        let phone = req.body.phone
        let token = req.body.token
        let decoed = jwt.verify(token, 'user')
        // console.log(token);
        userModel.updateOne({ _id: decoed.id }, { phone: phone })
            .then((data) => {
                res.json({
                    error: false,
                    message: "Thay đổi thành công",
                    value: data
                })
            }).catch((err) => {
                res.json({
                    error: true,
                    message: "không thành công"
                })
            })

    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + error
        })
    }
})


router.post("/change_address", (req, res) => {
    try {
        let address = req.body.address
        let token = req.body.token
        let decoed = jwt.verify(token, 'user')
        // console.log(token);
        userModel.updateOne({ _id: decoed.id }, { address: address })
            .then((data) => {
                res.json({
                    error: false,
                    message: "Thay đổi thành công",
                    value: data
                })
            }).catch((err) => {
                res.json({
                    error: true,
                    message: "không thành công"
                })
            })

    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + error
        })
    }
})


router.post("/change_email", checkAuth.checkGmail, (req, res) => {
    try {
        let email = req.body.email
        let token = req.body.token
        let decoed = jwt.verify(token, 'user')
        // console.log(token);
        userModel.updateOne({ _id: decoed.id }, { email: email })
            .then((data) => {
                res.json({
                    error: false,
                    message: "Thay đổi thành công",
                    value: data
                })
            }).catch((err) => {
                res.json({
                    error: true,
                    message: "không thành công"
                })
            })

    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + error
        })
    }
})


router.post("/change_password", checkAuth.check_old_password, (req, res) => {
    try {
        let token = req.body.token
        let decoed = jwt.verify(token, 'user')
        // console.log(token);
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.new_password, salt, function (err, hash) {
                // Store hash in your password DB.
                userModel.updateOne({ _id: decoed.id }, { password: hash })
                    .then((data) => {
                        res.json({
                            error: false,
                            message: "Thay đổi thành công",
                            value: data
                        })
                    }).catch((err) => {
                        res.json({
                            error: true,
                            message: "không thành công"
                        })
                    })
            });
        });


    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + error
        })
    }
})

router.post("/show_history", async (req, res) => {
    let token = req.body.token
    let decoed = jwt.verify(token, 'user')
    let bill = []
    let cart = []
    let product = []
    try {
        let find_user = await userModel.findOne({
            _id: decoed.id
        })
        for (let i = 0; i < find_user.listBill.length; i++) {
            // console.log(find_user.listBill[i].idBill);
            let find_bill = await billModel.findOne({
                _id: find_user.listBill[i].idBill
            })
            bill.push(find_user)
            // console.log(find_bill.cartId);
            let find_cart = await cartModel.cart2Model.findOne({
                _id: find_bill.cartId
            })
            cart.push(find_cart)
            for (let y = 0; y < find_cart.listProduct.length; y++) {
                let find_product = await productModel.findOne({
                    _id: find_cart.listProduct[y].idProduct
                })
                product.push(find_product)
            }
        }

        res.json({
            error: false,
            message: "load thành công",
            value: bill,
            value1: cart,
            value2: product
        })
    } catch (error) {
        res.json(error)
    }

})

router.post("/find_product", async (req, res) =>{
    let idProduct = req.body.idProduct

    let find_product = await productModel.findOne({
        _id: idProduct
    })

    res.json({
        value: find_product
    })
})

module.exports = router