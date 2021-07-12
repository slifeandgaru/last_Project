const managertModel = require('../Model/managerModel')
const userModel = require('../Model/userModel')
const manager = require("../router/managerRouter");
const jwt = require('jsonwebtoken');

function checkAuth(req, res, next){
    var account = req.body.account

    managertModel.findOne({account})
    .then((data) => {
        if(data){
            res.json("tài khoản đã tồn tại")
        }else{
            next()
        }
    }).catch((err) =>{
        console.log(err);
    })
}
function checkUser(req, res, next){
    var username = req.body.username

    userModel.findOne({username})
    .then((data) => {
        if(data){
            res.json("tài khoản đã tồn tại")
        }else{
            next()
        }
    }).catch((err) =>{
        console.log(err);
    })
}

function checkGmail(req, res, next){
    var email = req.body.email

    if(email.includes("@") == false){
        res.json("gmail phải có @")
    }else if(email.includes("gmail") == false){
        res.json("bạn vui lòng nhập đúng gmail")
    }else if(email.includes(".com") == false){
        res.json("gmail của bạn thiếu .com")
    }else{
        next()
    }
}

module.exports = {
    checkAuth: checkAuth,
    checkGmail: checkGmail,
    checkUser: checkUser
}