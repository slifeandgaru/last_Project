const productModel = require('../Model/productModel')
const managertModel = require('../Model/managerModel')
const express = require('express');
const multer = require('multer');
// const ejs = require('ejs');
// const jwt = require('jsonwebtoken')
// (fs)

const router = express.Router();
const path = require('path')

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

module.exports = router