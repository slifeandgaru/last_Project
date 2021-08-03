const managertModel = require('../Model/managerModel')
const userModel = require('../Model/userModel')
const blacklistModel = require('../Model/blacklist')
const productModel = require('../Model/productModel')
const manager = require("../router/managerRouter");
const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    var account = req.body.account

    managertModel.findOne({ account })
        .then((data) => {
            if (data) {
                res.json("tài khoản đã tồn tại")
            } else {
                next()
            }
        }).catch((err) => {
            console.log(err);
        })
}
function checkUser(req, res, next) {
    var username = req.body.username

    userModel.findOne({ username })
        .then((data) => {
            if (data) {
                res.json("tài khoản đã tồn tại")
            } else {
                next()
            }
        }).catch((err) => {
            console.log(err);
        })
}

function checkGmail(req, res, next) {
    var email = req.body.email

    if (email.includes("@") == false) {
        res.json("gmail phải có @")
    } else if (email.includes("gmail") == false) {
        res.json("bạn vui lòng nhập đúng gmail")
    } else if (email.includes(".com") == false) {
        res.json("gmail của bạn thiếu .com")
    } else {
        next()
    }
}

function checkToken(req, res, next) {
    let token = req.params.id
    // console.log(token);
    blacklistModel.findOne({
        token: token
    })
        .then((data) => {
            // console.log(data);
            if (data == null) {
                next()
            } else {
                res.json({
                    error: true,
                    message: "token đã vào blacklist"
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function checkRole(req, res, next) {
    let id = req.body.id
    console.log(id);
    managertModel.findOne({
        _id: id
    })
        .then((data) => {
            console.log(data);
            if (data.role == "Admin") {
                res.json({
                    error: true,
                    message: "Không thể xóa Admin"
                })
            } else {
                next()
            }
        }).catch((err) => {
            console.log(err);
        })
}

async function checkAmount(req, res, next) {
    let idProduct = req.params.idProduct
    let amount = req.body.amount

    let checkAmount = await productModel.findOne({
        _id: idProduct
    })
    if ((checkAmount.amount - amount) <= 0) {
        res.json({
            message: "Không đủ"
        })
    } else {
        next()
    }

}

module.exports = {
    checkAuth: checkAuth,
    checkGmail: checkGmail,
    checkUser: checkUser,
    checkToken: checkToken,
    checkRole: checkRole,
    checkAmount: checkAmount
}