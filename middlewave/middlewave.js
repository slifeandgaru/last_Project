const managertModel = require('../model/managerModel')
const userModel = require('../model/userModel')
const blacklistModel = require('../model/blacklist')
const productModel = require('../model/productModel')
const manager = require("../router/managerRouter");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



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
    var account = req.body.account

    userModel.findOne({ account })
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
    console.log(email);
    if (email == "") {
        res.json("vui lòng nhập gmail")
    } else if (email.includes("gmail") == false) {
        res.json("bạn vui lòng nhập đúng gmail")
    } else if (email.includes(".com") == false) {
        res.json("gmail của bạn thiếu .com")
    } else if (email.includes("@") == false) {
        res.json("gmail phải có @")
    } else {
        next()
    }
}

function checkBill(req, res, next) {
    var lastname = req.body.lastname
    var surname = req.body.surname
    var address = req.body.address
    var phone = req.body.phone
    var city = req.body.city
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (lastname == "") {
        res.json("Vui lòng nhập Tên của bạn")
    } else if (surname == "") {
        res.json("Vui lòng nhập đầy đủ họ tên")
        console.log("dm");
    } else if (address == "") {
        res.json("Vui lòng nhập địa chỉ")
    } else if (city == "") {
        res.json("Vui lòng nhập thành phố")
    } else if (vnf_regex.test(phone) == false) {
        res.json('Số điện thoại của bạn không đúng định dạng!');
    } else if (phone == "") {
        res.json('Bạn chưa điền số điện thoại!');
    } else {
        next()
    }
}

function checkPhoneNumber(req, res, next) {
    let phone = req.body.phone
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phone !== '') {
        if (vnf_regex.test(phone) == false) {
            res.json('Số điện thoại của bạn không đúng định dạng!');
        } else {
            next()
        }
    } else {
        res.json('Bạn chưa điền số điện thoại!');
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

function check_old_password(req, res, next) {
    let password = req.body.old_password
    let token = req.body.token
    let decoed = jwt.verify(token, 'user')

    userModel.findOne({
        _id: decoed.id
    })
        .then((data) => {
            bcrypt.compare(password, data.password, function (err, result) {
                console.log(result);
                if(result == true){
                   next()
                }
                else{
                    res.json("Mật khẩu cũ không chính xác")
                }
            })
        })

}

module.exports = {
    checkAuth: checkAuth,
    checkGmail: checkGmail,
    checkUser: checkUser,
    checkToken: checkToken,
    checkRole: checkRole,
    checkAmount: checkAmount,
    checkBill: checkBill,
    checkPhoneNumber: checkPhoneNumber,
    check_old_password: check_old_password
}