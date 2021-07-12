const userModel = require('../Model/userModel')
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
    // let password = req.body.password
    let gender = req.body.gender
    let birthDate = req.body.birthDate
    let phone = req.body.phone

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            userModel.create({ username, password: hash, gender, birthDate, phone})
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
        let username = req.body.username
        let password = req.body.password
        // console.log(role);
        userModel.findOne({ username })
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

module.exports = router