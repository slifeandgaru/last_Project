// load ảnh lên mục sản phẩm hàng đầu ở trang Home
function listshow() {
    let list = $(".listshow")
    let list1 = $(".listshow1")
    // list.append("dcm")
    // console.log("dcm");
    $.ajax({
        url: "/load/loadHome",
        method: "GET"
    })
        .then((data) => {
            console.log(data);

            for (let i = 0; i < 4; i++) {
                if(data.value[i].discount == undefined){
                    list.append(`
                    <div class="col-lg-3 col-md-6 col-6">
                        <figure>
                            <div class="hover-animation">
                                <img src="../image/${data.value[i].listPicture[0]}" alt="" class="img-back">
                                <img src="../image/${data.value[i].listPicture[1]}" alt="" class="img-front">
                                <button style="cursor: pointer;">
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
                }else{
                    list.append(`
                    <div class="col-lg-3 col-md-6 col-6">
                        <figure>
                            <div class="hover-animation">
                                <img src="../image/${data.value[i].listPicture[0]}" alt="" class="img-back">
                                <img src="../image/${data.value[i].listPicture[1]}" alt="" class="img-front">
                                <div style="height: 45px;width: 45px;font-weight: bolder;font-size: 15px;color: #fff;background-color: black;border-radius: 50%;display: inline-block;padding-top:11px;;position: absolute;top: 10%;left: -2%;text-align: center;"><span>${data.value[i].percent}%</span></div>
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
    window.location.href = "/floda/cua-hang?"+classify_flower
    setCookie("classify",classify_flower,30)
})

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
