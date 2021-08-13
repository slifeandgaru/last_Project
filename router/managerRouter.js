const managertModel = require('../model/managerModel')
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

        managertModel.findOne({ account, role })
            .then((data) => {
                // console.log(data.role);
                if (data == null) {
                    res.json({
                        error: true,
                        message: "tai khoan khong chinh xac"
                    })
                }
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
            }).catch((err) => {
                res.json({
                    error: true,
                    message: "Tên đăng nhạp hoặc mật khẩu không chính xác"
                })
            })
    } catch (error) {
        return res.json({
            error: true,
            message: "Lỗi hệ thống"
        })
    }

})

router.get("/refresh_Staff", (req, res) => {
    // let skip = req.params.skip
    managertModel.find()
        // .skip(parseInt(skip))
        .then((data) => {
            console.log(data);
            res.json({
                error: false,
                message: "ok",
                value: data
            })
        }).catch((err) => {
            console.log(err);
        })
})


router.put("/updateManager", checkAuth.checkGmail, (req, res) => {
    let id = req.body.id
    let account = req.body.account
    let name = req.body.name
    let email = req.body.email
    let address = req.body.address
    let phone = req.body.phone

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            managertModel.updateOne({
                _id: id
            }, {
                account: account,
                name: name,
                email: email,
                address: address,
                phone: phone
            })
                .then((data) => {
                    res.json({
                        error: false,
                        message: "update successful",
                        data: data
                    })
                }).catch((err) => {
                    res.json({
                        error: true,
                        message: "update fail " + err
                    })
                })
        });
    });
})

router.delete("/removeManager", checkAuth.checkRole, (req, res)=>{
    let id = req.body.id

    managertModel.deleteOne({
        _id: id
    })
    .then((data)=>{
        console.log(data);
    }).catch((err) =>{
        console.log(err);
    })
    
})

router.get("/get_staff_information/:staffId", async (req, res) =>{
    let staffId = req.params.staffId
    let decoed = jwt.verify(staffId, 'Admin').id

    let get_staff = await managertModel.findOne({_id: decoed})

    res.json({
        value: get_staff
    })

})


module.exports = router