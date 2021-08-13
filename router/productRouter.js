const productModel = require('../model/productModel')
const managertModel = require('../model/managerModel')
const cartModel = require('../model/cart')
// const cart2Model = require('../model/cart')
const billModel = require('../model/bill')
const wishlistModel = require('../model/wishlistModel')
const express = require('express');
const multer = require('multer');
// const ejs = require('ejs');
const jwt = require('jsonwebtoken')
// (fs)

const router = express.Router();
const path = require('path')
const checkAuth = require('../middlewave/middlewave')
const userModel = require('../model/userModel')

router.get('/cua-hang/:classify', (req, res) => {
    let classify = req.query.classify
    console.log(classify);
})

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

router.post("/add_to_cart/:userId/:idProduct", checkAuth.checkAmount, async (req, res) => {
    let token = req.params.userId
    let idProduct = req.params.idProduct
    let amount = req.body.amount
    let decoed = jwt.verify(token, 'user')
    let userId = decoed.id
    // console.log(idProduct)
    let create_new = await cartModel.cartModel.findOne({ userId: userId })
    if (create_new == null) {
        cartModel.cartModel.create({
            userId,
            listProduct: {
                idProduct,
                amount
            }
        })
        res.json({
            message: "Sản phẩm đã được thêm vào giỏ hàng"
        })
    }

    else if (create_new != null) {
        if (create_new.listProduct.length == 0) {
            let update_cart = await cartModel.cartModel.updateOne({
                userId: userId
            }, {
                $push: {
                    listProduct: {
                        idProduct,
                        amount: amount
                    }
                }
            })
            res.json({
                message: "Sản phẩm đã được thêm vào giỏ hàng"
            })
        } else {
            let update_cart = await cartModel.cartModel.updateOne({
                userId: userId
            }, {
                $push: {
                    listProduct: {
                        idProduct,
                        amount: amount
                    }
                }
            })
            res.json({
                message: "Sản phẩm đã được thêm vào giỏ hàng 2"
            })
        }
        for (let i = 0; i < create_new.listProduct.length; i++) {
            if (create_new.listProduct[i].idProduct == idProduct) {
                let totalAmount = Number(create_new.listProduct[i].amount) + Number(amount)
                let remove_same = await cartModel.cartModel.updateOne({
                    userId: userId
                }, {
                    $pull: {
                        listProduct: {
                            idProduct: idProduct
                        }
                    }
                })
                let add_same = await cartModel.cartModel.updateOne({
                    userId: userId
                }, {
                    $push: {
                        listProduct: {
                            idProduct: idProduct,
                            amount: totalAmount
                        }
                    }
                })
            }
        }
    }
})

router.post("/load_cart", async (req, res) => {
    try {
        let userId = req.body.userId
        var findProduct = []
        let decoed = jwt.verify(userId, 'user')
        // console.log(decoed.id)
        var findone = await cartModel.cartModel.findOne({ userId: decoed.id })
        // console.log(findone);
        if (findone.listProduct == null) {
            console.log("null dm");
        }
        else {
            for (let i = 0; i < findone.listProduct.length; i++) {
                var findPro = await productModel.findOne({
                    _id: findone.listProduct[i].idProduct
                })
                findProduct.push(findPro)
                // console.log(findPro);
            }
            if (findProduct.length == 0) {
                res.json({
                    error: true,
                    message: "giỏ hàng trống rỗng",
                })
            } else {
                res.json({
                    error: false,
                    message: "some thing",
                    value: findone,
                    value2: findProduct
                })
            }
        }

    } catch (error) {
        res.json({
            error: true,
            message: "giỏ hàng trống rỗng"
        })
    }
})


router.delete("/remove_cart/:id/:number", async (req, res) => {
    var id = req.params.id
    var number = req.params.number
    let decoed = jwt.verify(id, 'user')
    console.log(number);
    var remove = await cartModel.cartModel.updateOne({
        userId: decoed.id
    }, {
        $pull: { listProduct: { _id: number } }
    })
    res.json({
        error: false,
        message: "remove done",
        value: remove,
    })
})

router.post("/create_bill", checkAuth.checkBill, checkAuth.checkGmail, async (req, res) => {
    var lastname = req.body.lastname
    var surname = req.body.surname
    var address = req.body.address
    var city = req.body.city
    var phone = req.body.phone
    var email = req.body.email
    var cartId = req.body.cartId
    var totalPrice = req.body.totalPrice
    var token = req.body.token
    let decoed = jwt.verify(token, 'user')

    try {
        let create_bill = await billModel.create({ lastname, surname, address, city, phone, email, cartId, totalPrice })
        // .then((data) => {
        let done_payment = await cartModel.cartModel.findOne({
            _id: cartId
        }, function (err, result) {
            let swap = new (cartModel.cart2Model)(result.toJSON())
            result.remove()
            swap.save()
            console.log(result + "rs");

            for (let i = 0; i < result.listProduct.length; i++) {
                productModel.findOne({
                    _id: result.listProduct[i].idProduct
                })
                    .then((data) => {
                        productModel.updateOne({
                            _id: data._id
                        }, {
                            amount: (data.amount - result.listProduct[i].amount)
                        })
                            .then((data_amount) => {
                                console.log(data_amount);
                            })
                    })
            }
        })

        // console.log(create_bill.id);
        let update_user_history = await userModel.updateOne({
            _id: decoed.id
        },{
            $push: {
                listBill: {
                    idBill: create_bill.id
                }
            }
        })
        res.json("đặt hàng thành công")
        // }).catch((err) => {
        //     console.log(err);
        // })
    } catch (error) {
        console.log("lỗi");
    }
})

router.post("/add_to_wishlist", (req, res) => {
    let id = req.body.id
    let userId = req.body.userId
    let decoed = jwt.verify(userId, 'user').id

    console.log(decoed);
    //
    wishlistModel.findOne({ userId: decoed })
        .then((data) => {
            // console.log(data);
            if (data == null) {
                wishlistModel.create({
                    userId: decoed,
                    wishlist: {
                        productId: id
                    }
                })
                    .then((data) => {
                        res.json({
                            message: "sản phẩm đã thêm vào wishlist"
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                wishlistModel.updateOne({
                    userId: decoed
                }, {
                    $push: {
                        wishlist: {
                            productId: id
                        }
                    }
                })
                    .then((data) => {
                        res.json({
                            message: "sản phẩm đã thêm vào wishlist"
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
            }

        }).catch((err) => {
            console.log(err);
        })
})


router.post("/load_wishlist", async (req, res) => {
    let userId = req.body.userId
    var wishlist = []
    try {
        let decoed = jwt.verify(userId, 'user')
        // console.log(decoed.id)
        var find_user_wishlist = await wishlistModel.findOne({ userId: decoed.id })
        console.log(find_user_wishlist);
        if (find_user_wishlist == null) {
            console.log("chưa có wishlist");
        }
        else if (find_user_wishlist.wishlist == null) {
            console.log("null dm");
        } else {
            for (let i = 0; i < find_user_wishlist.wishlist.length; i++) {
                var findProduct = await productModel.findOne({
                    _id: find_user_wishlist.wishlist[i].productId
                })
                wishlist.push(findProduct)
                // console.log(findPro);
            }
        }
        res.json({
            error: false,
            message: "some thing",
            value: find_user_wishlist,
            value2: wishlist
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/remove_wishlist/:userId/:idProduct", async (req, res) => {
    var idProduct = req.params.idProduct
    var userId = req.params.userId
    let decoed = jwt.verify(userId, 'user')
    console.log(idProduct);
    var remove_wishlist = await wishlistModel.updateOne({
        userId: decoed.id
    }, {
        $pull: { wishlist: { _id: idProduct } }
    })
    res.json({
        error: false,
        message: "remove done",
        value: remove_wishlist,
    })
})


router.post("/wishlist_to_cart/:userId/:idProduct/:idRemove_wishlist", (req, res) => {
    let token = req.params.userId
    let idProduct = req.params.idProduct
    let idRemove_wishlist = req.params.idRemove_wishlist
    let amount = req.body.amount
    let decoed = jwt.verify(token, 'user')
    let userId = decoed.id
    console.log(idRemove_wishlist)

    wishlistModel.findOne({ userId: userId })
        .then((data) => {
            cartModel.cartModel.findOne({ userId: userId })
                .then((data2) => {
                    console.log(data2 + "abc");
                    if (data2 == null) {
                        cartModel.cartModel.create({
                            userId,
                            listProduct: {
                                idProduct,
                                amount
                            }
                        })
                            .then((data2) => {
                                console.log("tao moi");
                                console.log(data2);
                            }).catch((err) => {
                                console.log(err)
                            })
                    } else {
                        cartModel.cartModel.updateOne({
                            userId: userId
                        }, {
                            $push: {
                                listProduct: {
                                    idProduct,
                                    amount: amount
                                }
                            }
                        })
                            .then((data2) => {
                                console.log("update");
                                console.log(data2);
                            }).catch((err) => {
                                console.log(err)
                            })
                    }
                })
            wishlistModel.updateOne({
                userId: userId
            }, {
                $pull: { wishlist: { _id: idRemove_wishlist } }
            })
                .then((data) => {
                    res.json({
                        message: "xoa dc"
                    })
                }).catch((err) => {
                    res.json({
                        message: "dell xoa dc"
                    })
                })

        }).catch((err) => {
            console.log(err);
        })
})


router.post("/loadBill", (req, res) => {

    billModel.find({})
        .then((data) => {
            res.json({
                message: "Load successful",
                value: data
            })
        }).catch((err) => {
            console.log(err);
        })
})

router.post("/showBill/:cartId", async (req, res) => {
    let cartId = req.params.cartId
    var Picture = []
    var name_product = []
    var amount = []
    var price = []

    let find_product = await cartModel.cart2Model.findOne({
        _id: cartId
    })
    for (let i = 0; i < find_product.listProduct.length; i++) {
        let find_image = await productModel.findOne({
            _id: find_product.listProduct[i].idProduct
        })
        Picture.push(find_image.listPicture[0])
        name_product.push(find_image.productname)
        amount.push(find_product.listProduct[i].amount)
        price.push(find_image.discount)
    }

    res.json({
        message: "tìm ảnh thành công",
        value: Picture,
        value2: name_product,
        value3: amount,
        value4: price
    })
})

router.get("/search_product/:productname", async (req, res) => {
    try {
        let productname = req.params.productname
        console.log(productname);
        let data = await productModel.find({
            productname:
                { $regex: `.*${productname}.*` }
        })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router