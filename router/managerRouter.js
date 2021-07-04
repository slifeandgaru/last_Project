const managertModel = require('../Model/managerModel')
const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewave/middlewave')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/", checkAuth.checkAuth, checkAuth.checkGmail, (req, res) => {
    let account = req.body.account
    let name = req.body.name
    let email = req.body.email
    let address = req.body.address
    let phone = req.body.phone
    let role = "staff"

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            managertModel.create({ account, name, password: hash, email, address, phone, role })
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
    try {
        let account = req.body.account
        let password = req.body.password
        let role = req.body.role
        // console.log(role);
        managertModel.findOne({ account, role })
            .then((data) => {
                // console.log(data);
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
                            let token = jwt.sign({ id: data._id }, 'Admin')
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
    } catch (error) {
        return res.json({
            error: true,
            message: "loi o try catch " + err
        })
    }

})



module.exports = router