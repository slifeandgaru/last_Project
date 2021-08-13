// load ảnh lên mục sản phẩm hàng đầu ở trang Home
function listshow() {
    let list = $(".listshow")
    // list.append("dcm")
    // console.log("dcm");
    $.ajax({
        url: "/staffRouter/loadHome",
        method: "GET"
    })
        .then((data) => {
            // console.log(data);
            // console.log(data.value[0]._id);

            for (let i = 0; i < 4; i++) {
                if (data.value[i].discount == undefined) {
                    list.append(`
                    <div class="col-lg-3 col-md-6 col-6">
                        <figure>
                            <div class="hover-animation drawn_card">
                                <img src="../image/${data.value[i].listPicture[0]}" alt="" class="img-back">
                                <img src="../image/${data.value[i].listPicture[1]}" alt="" class="img-front">
                                <button onclick="show_something('${data.value[i]._id}')" style="cursor: pointer;">
                                    <div class="drawn_content">
                                        <i class="fas fa-heart"></i>
                                    </div>
                                </button>
                            </div>
                            <figcaption>
                                <p style="font-weight: 600; padding-top: 10px;margin-bottom: auto;">${data.value[i].productname}</p>
                                <p style="color:#cc2121"><span>${data.value[i].price}</span></p>
                                <button class="btn btn-info" onclick="buyProduct('${data.value[i]._id}')">Mua hàng</button>
                            </figcaption>
                        </figure>       
                    </div>
                      `)
                } else {
                    list.append(`
                    <div class="col-lg-3 col-md-6 col-6">
                        <figure>
                            <div class="hover-animation">
                                <img src="../image/${data.value[i].listPicture[0]}" alt="" class="img-back">
                                <img src="../image/${data.value[i].listPicture[1]}" alt="" class="img-front">
                                <div style="height: 45px;width: 45px;font-weight: bolder;font-size: 15px;color: #fff;background-color: black;border-radius: 50%;display: inline-block;padding-top:11px;;position: absolute;top: 10%;left: -2%;text-align: center;"><span>${data.value[i].percent}%</span></div>
                                <button onclick="show_something('${data.value[i]._id}')" style="cursor: pointer;">
                                    <div class="drawn_content">
                                        <i class="fas fa-heart"></i>
                                    </div>
                                </button>
                            </div>
                            <figcaption>
                                <p style="font-weight: 600; padding-top: 10px;margin-bottom: auto;">${data.value[i].productname}</p>
                                <p style="color:#cc2121"><span style="text-decoration: line-through;opacity: 0.5;">${data.value[i].price}</span> <span>${data.value[i].discount} đ</span></p>
                                <button class="btn btn-info" onclick="buyProduct('${data.value[i]._id}')">Mua hàng</button>
                            </figcaption>
                        </figure>       
                    </div>
                      `)
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

listshow()


$("#myClassify li").click(function () {
    // let tbody = $("#list-product")
    let classify_flower = $(this).attr('id')
    console.log(classify_flower);
    window.location.href = "/floda/cua-hang?" + classify_flower
    setCookie("classify", classify_flower, 30)
})

function buyProduct(id) {
    console.log(id);
    setCookie('product', id, 30)
    window.location.href = "/floda/san-pham"
}

function show_something(id) {
    var userId = getCookie("user")
    console.log(id);
    $.ajax({
        url: '/productRouter/add_to_wishlist',
        method: "POST",
        data: {
            userId,
            id
        }
    })
        .then((data) => {
            console.log(data);
            alert("sản phẩm đã được thêm vào Wishlist")
        }).catch((err) => {
            console.log(err);
        })
}

function number_wishlist() {
    var userId = getCookie("user")
    $.ajax({
        url: "/productRouter/load_wishlist",
        method: "POST",
        data: {
            userId
        }
    })
        .then((data) => {
            let count_number = data.value2.length
            $(".number_wishlist").append(`
        <div
            style="height: 20px;width: 20px;font-weight: bolder;font-size: 10px;color: #fff;background-color: red;border-radius: 50%;display: inline-block;padding-top:3px;position: absolute;top: -8px;left: 20px;text-align: center;">
                <span>${count_number}</span>
        </div>
        `)
        })
}
number_wishlist()

function show_alert_cart() {
    var Total = 0
    let userId = getCookie("user")
    console.log(userId);
    $.ajax({
        url: "/productRouter/load_cart",
        method: "POST",
        data: {
            userId
        }
    })
        .then((data) => {
            // console.log(data);
            // console.log($(".alert_cart"));
            console.log(data);
            if (data.message == "giỏ hàng trống rỗng") {
                $(".alert_cart").attr("data-original-title", "giỏ hàng trống rỗng")
            } else {
                $(".alert_cart").attr("data-original-title", `Có ${data.value2.length} sản phẩm`)
            }
            // $(".alert_cart").title(data.value2.length)
        })
}
show_alert_cart()

function SignOut() {
    let token = getCookie("user")

    $.ajax({
        url: "/staffRouter/blacklist/" + token,
        method: "POST",
    })
        .then((data) => {
            if (data.message == "đã thêm vào blacklist") {
                delete_cookie("user")
            }
        }).catch((err) => {
            console.log(err);
        })
    // setTimeout(myDetail(), 2000)
}

function myDetail_user() {
    let token = getCookie("user")
    console.log(token);
    if (token == "") {
        // alert("Bạn chưa đăng nhập vui lòng đăng nhập")
        // window.location.href = "/login"
    } else {

        $.ajax({
            url: "/userRouter/loaduser/" + token,
            method: "GET",
        })
            .then((data) => {
                // console.log(data);
                if (data.message == "token đã vào blacklist") {
                    alert("bạn không được quyền truy cập, vui lòng đăng nhập")
                    window.location.href = "/userRegister"
                }
            }).catch((err) => {
                console.log(err);
            })
    }
}
myDetail_user()

function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


//function Set Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//function Get Cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
