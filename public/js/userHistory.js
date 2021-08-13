
async function show_history() {
    let token = getCookie("user")
    let total = 0
    let some = await $.ajax({
        url: "/userRouter/show_history",
        method: "POST",
        data: {
            token
        }
    })
    console.log(some);
    for (let i = 0; i < some.value1.length; i++) {
        $('.content_trade').append(`
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá</th>
                    </tr>
                </thead>
                <tbody id="tbody_show_history">
                    <tr id='tr_show_${i}'>
                        <td>${i + 1}</td>
                    </tr>
                </tbody>
            </table>
            `)
        for (let y = 0; y < some.value1[i].listProduct.length; y++) {
            let idProduct = some.value1[i].listProduct[y].idProduct
            let thing = await $.ajax({
                url: '/userRouter/find_product',
                method: 'POST',
                data: {
                    idProduct
                }
            })
            console.log(thing);
            total = total + (thing.value.price * some.value1[i].listProduct[y].amount)
            if (y == 0) {
                $(`#tr_show_${i}`).append(`
                    <td>${thing.value.productname}</td>
                    <td>${some.value1[i].listProduct[y].amount}</td>
                    <td>${thing.value.price} đ</td>
                `)
            } 
            else {
                $(`#tr_show_${i}`).append(`
                    <tr>
                        <td></td>
                        <td>${thing.value.productname}</td>
                        <td>${some.value1[i].listProduct[y].amount}</td>
                        <td>${thing.value.price} đ</td>
                    </tr>
                `)
            }
            
        }
        

    }
    // $('#tbody_show_history').append(`<tr style="color: red;">
    //     <td>Tổng</td>
    //     <td></td>
    //     <td></td>
    //     <td>${total} đ</td>
    // </tr>`)
}


show_history()


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