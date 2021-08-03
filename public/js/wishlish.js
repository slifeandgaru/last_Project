

function show_wishlist() {
    var userId = getCookie("user")
    $.ajax({
        url: "/productRouter/load_wishlist",
        method: "POST",
        data: {
            userId
        }
    })
        .then((data) => {
            
            console.log(data);
            if(data.value2.length == 0){
                $(".wishlist_empty").append(`
                <div style="border-top:3px solid rgb(224, 223, 223);height: auto;margin-top: 10px;text-align: center; border-bottom: 1px solid #ececec;">
                    <p style="font-size: 2em;color: #666;padding-top: 50px;">No products were added to the wishlist</p>
                </div>
                `)
            }else{
            for (let i = 0; i < data.value2.length; i++) {
                if (data.value2[i].discount == undefined) {
                    $(".show_wishlist").append(`
                    <div class = "row">
                        <div class="col-lg-2 col-md-6 col-6">${data.value2[i].productname}</div>
                        <div class="col-lg-2 col-md-6 col-6">${data.value2[i].price}</div>
                        <div class="col-lg-2 col-md-6 col-6">STOCK STATUS</div>
                    </div>
                    <hr style="width:100%">
                `)
                } else {
                    $(".show_wishlist").append(`
                    <div class="row">
                    <div class="col-lg-2 col-md-6 col-6">
                        <button onclick = "remove_wishlist('${data.value.wishlist[i]._id}')"
                            style="border: 1px solid #ccc;border-radius: 50%; height: 1.5em;width: 1.5em;cursor: pointer;padding-bottom: 23px;"><i
                            class="fas fa-times"></i>
                        </button>
                    </div>
                        <div class="col-lg-3 col-md-6 col-6">
                             
                            <img style ="height: 75px; width: 50px;" src="../image/${data.value2[i].listPicture[0]}" alt="" class="img-back"> 
                            <span>${data.value2[i].productname}</span>
                        </div>
                        <div class="col-lg-2 col-md-6 col-6"><span style="text-decoration: line-through;opacity: 0.5;">${data.value2[i].price}</span> <span>${data.value2[i].discount} đ</span></div>
                        <div class="col-lg-2 col-md-6 col-6">STOCK STATUS</div>
                        <div class="col-lg-3 col-md-6 col-6"><button onclick="wishlist_to_cart('${data.value.wishlist[i].productId}', '${data.value.wishlist[i]._id}')" class="btn btn-dark">ADD TO CART</button></div>
                    </div>
                    <hr style="width:100%">
                `)
                }
            }
        }
        }).catch((err) => {
            console.log(err);
        })

}

show_wishlist()

function remove_wishlist(idProduct) {
    console.log(idProduct);
    var userId = getCookie("user")
    $.ajax({
        url: "/productRouter/remove_wishlist/" + userId + "/" + idProduct,
        method: "DELETE"
    })
        .then((data) => {
            console.log(data);
            if (data.error == false) {
                window.location.href = "/floda/wishlist"
            }
        }).catch((err) => {
            console.log(err);
        })
}

function wishlist_to_cart(listProduct, id) {
    if (getCookie("user") == "") {
        console.log(getCookie("user"));
        let conf = confirm("Bạn chưa đăng nhập, vui lòng đăng nhập!!!!!!!!!!!")
        if (conf == true) {
            window.location.href = "/userRegister"
        }
    } else {
        console.log("Sản phẩm đã đc thêm vào giỏ hàng");
        let userId = getCookie("user")
        // let listProduct = getCookie("product")
        let amount = "1"
        console.log(amount);
        $.ajax({
            url: "/productRouter/wishlist_to_cart/" + userId + "/" + listProduct + "/" + id,
            method: "POST",
            data: {
                amount
            }
        })
        .then((data) =>{
            console.log(data);
            alert("Sản phẩm đã được thêm vào giỏ hàng")
            window.location.href = "/floda/wishlist"
        })
        .catch((err) =>{
            console.log(err);
        })
    }
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