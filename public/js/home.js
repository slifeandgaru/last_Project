// load ảnh lên mục sản phẩm hàng đầu ở trang Home
function listshow() {
    let list = $(".listshow")
    // list.append("dcm")
    // console.log("dcm");
    $.ajax({
        url: "/load/loadHome",
        method: "GET"
    })
        .then((data) => {
            console.log(data.value[0]._id);

            for (let i = 0; i < 4; i++) {
                if(data.value[i].discount == undefined){
                    list.append(`
                        <div class="col-lg-3 col-md-6 col-6">
                        <figure>
                            <div class="hover-animation">
                                <img src="../image/${data.value[i].listPicture[0]}" alt="" class="img-back">
                                <img src="../image/${data.value[i].listPicture[1]}" alt="" class="img-front">
                            </div>
                            <figcaption>
                                <p style="font-weight: 600; padding-top: 10px;margin-bottom: auto;">${data.value[i].productname}</p>
                                <p style="color:#cc2121"><span>${data.value[i].price}</span></p>
                                <button class="btn btn-info" onclick="buyProduct('${data.value[i]._id}')">Mua hàng</button>
                            </figcaption>
                        </figure>       
                    </div>
                      `)
                }else{
                    list.append(`
                        <div class="col-lg-3 col-md-6 col-6">
                        <figure>
                            <div class="hover-animation">
                                <img src="../image/${data.value[i].listPicture[0]}" alt="" class="img-back">
                                <img src="../image/${data.value[i].listPicture[1]}" alt="" class="img-front">
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

function buyProduct(id){
    console.log(id);
    setCookie('product', id, 30)
    window.location.href = "/floda/san-pham"
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
