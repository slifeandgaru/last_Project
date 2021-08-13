const productModel = require('../model/productModel')
const managertModel = require('../model/managerModel')
const blacklisttModel = require('../model/blacklist')

const ckeck = require("../middlewave/middlewave")

const express = require('express');
const multer = require('multer');
// const ejs = require('ejs');
const jwt = require('jsonwebtoken')
// (fs)
const fs = require('fs');

const router = express.Router();
const path = require('path')

router.post("/creProduct", (req, res) => {
    let productname = req.body.productname
    let price = req.body.price
    let classifyID = req.body.classifyID
    let description = req.body.description
    let amount = req.body.amount
    let listPicture = req.body.listPicture

    productModel.create({ productname, price, classifyID, description, amount, listPicture })
})

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image')
    },
    filename: (req, file, cb) => {
        // cb(null, Date.now() + "--" + file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: fileStorageEngine })

router.post("/multiple", upload.array('image', 3), (req, res) => {
    let productname = req.body.productname
    let classify = req.body.classify
    let price = req.body.price
    let percent = req.body.percent
    let discount = (price - ((price * percent) / 100))
    let amount = req.body.amount
    let listPicture = []
    for (let i = 0; i < req.files.length; i++) {
        listPicture.push(req.files[i].filename)
    }
    console.log(listPicture);
    productModel.create({ productname, classify, price, percent, discount, listPicture, amount })
        .then((data) => {
            console.log(data);
            // res.sendFile(path.join(__dirname,'../public/html/WorkSpace/staffWS.html'))
            console.log(data);
        }).catch((err) => {
            // res.json({
            //     error: true,
            //     message: "upload fail " + err,
            // })
            console.log(err);
        })
});



router.get("/refresh/:skip", (req, res) => {
    let skip = req.params.skip
    productModel.find()
        .skip(parseInt(skip))
        .then((data) => {
            res.json({
                error: false,
                message: "ok",
                value: data
            })
        }).catch((err) => {
            console.log(err);
        })
})

router.get("/loadHome", (req, res) => {
    productModel.find({})
        .then((data) => {
            console.log(data);
            res.json({
                error: false,
                message: "ok",
                value: data
            })
        }).catch((err) => {
            res.json(err)
        })
})

router.get("/loadstaff/:id", ckeck.checkToken, (req, res) => {
    try {
        let token = req.params.id
        let decoed = jwt.verify(token, 'Admin')
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

router.put("/updateProduct", (req, res) => {
    let id = req.body.id
    let productname = req.body.productname
    let classify = req.body.classify
    let price = req.body.price
    let percent = req.body.percent
    let discount = (price - ((price * percent) / 100))
    let amount = req.body.amount
    console.log(classify);
    productModel.updateOne({
        _id: id
    }, {
        productname: productname,
        classify: classify,
        price: price,
        percent: percent,
        discount: discount,
        amount: amount
    })
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log("ngu" + err);
        })
})



router.delete('/remove', (req, res) => {
    let id = req.body.id

    productModel.findOne({
        _id: id
    })
        .then((data) => {
            console.log(data.listPicture[0]);
            productModel.deleteOne({
                _id: data._id
            })
                .then((data) => {
                    res.json({
                        error: false,
                        message: "xoa thanh cong"
                    })
                })
                .catch((err) => {
                    console.log(err);
                })

            for (var i = 0; i < data.listPicture.length; i++) {
                fs.unlink("public/image/" + data.listPicture[i], (err => {
                    if (err) console.log(err);
                    else {
                        console.log("\nDeleted file: example_file.txt");
                    }
                }));
            }

        }).catch((err) => {
            res.json({
                error: true,
                message: "xóa thất bại " + err,
            })
        })
})

router.post("/blacklist/:token", (req, res) => {
    let token = req.params.token

    blacklisttModel.create({
        token: token
    })
        .then((data) => {
            res.json({
                message: "đã thêm vào blacklist"
            })
        }).catch((err) => {
            console.log(err);
        })
})

module.exports = router