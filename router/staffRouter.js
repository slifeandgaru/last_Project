const productModel = require('../Model/productModel')
const express = require('express');
const multer = require('multer');
// const ejs = require('ejs');

const router = express.Router();
const path = require('path')

router.post("/creProduct", (req, res) =>{
    let productname = req.body.productname
    let price = req.body.price
    let classifyID = req.body.classifyID
    let description = req.body.description
    let amount = req.body.amount
    let listPicture = req.body.listPicture

    productModel.create({productname, price, classifyID, description, amount, listPicture})
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
    let price = req.body.price
    let listPicture = []
    for(let i = 0; i < req.files.length; i++){
        listPicture.push(req.files[i].filename)
    }
    console.log(listPicture);
    productModel.create({productname, price, listPicture})
    .then((data) =>{
        console.log(data);
    }).catch((err) =>{
        console.log(err);
    })

    // console.log(req.files[0].filename);
    // res.json("Single file upload success")
});

// router.post("/multiple", upload.array('image', 3), (req, res) => {
//     console.log(req.files);
//     res.send("Multiple file upload success")
// });

router.get("/refresh", (req, res) =>{
    productModel.find()
    .then((data) =>{
        res.json({
            error: false,
            message: "ok",
            value: data
        })
    }).catch((err) =>{
        console.log(err);
    })
})

module.exports = router