$(".data-user").click(function () {
    $(this).addClass("style")
    $(".data-product").removeClass("style")
    $(".content-product").addClass("hide")
    $(".detail").removeClass("hide")
})
$(".data-product").click(function () {
    $(this).addClass("style")
    $(".data-user").removeClass("style")
    $(".detail").addClass("hide")
    $(".content-product").removeClass("hide")
})

// showLibrary()


function myDetail() {
    let token = getCookie("token")

    $.ajax({
        url: "/staffRouter/loadstaff/" + token,
        method: "GET",
    })
        .then((data) => {
            console.log(data);
            $(".user").append(`<span>${data.value.account}</span>`)
        }).catch((err) => {
            console.log(err);
        })
}
myDetail()


$("#myID li").click(function () {
    let tbody = $("#list-product")
    let page = $(this).attr('id')
    console.log(page);
    tbody.empty();
    $.ajax({
        url: "/load/refresh/" + page,
        method: "GET"
    })
        .then((data) => {
            // console.log(data.value[8].listPicture[0])
            for (let i = 0; i < 4; i++) {
                tbody.append(`
                <tr>
                  <td>${i + 1}</td>
                  <td><img style="width: 75px; height: 100px;" src="../../image/${data.value[i].listPicture[0]}" alt=""></td>
                  <td>${data.value[i].productname}</td>
                  <td>${data.value[i].classify}</td>
                  <td>${data.value[i].price}</td>
                  <td>${data.value[i].discount}</td>
                  <td>${data.value[i].amount}</td>
                  <td>
                    <button onclick="myChangeproduct('${data.value[i]._id}', '${data.value[i].productname}','${data.value[i].price}','${data.value[i].discount}','${data.value[i].amount}')" id="btn-change" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalChangeproduct">Thay đổi</button>
                    <button onclick=myDeleteproduct('${data.value[i]._id}') type="button" class="btn btn-danger">Xóa</button>
                  </td>
                </tr>
        `)
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

// thay đổi product
// lưu ID khi thay đổi data
var arrIdToChange = [1]
function myChangeproduct(id, productname, price, discount, amount) {
    console.log(id); 
    console.log(productname); 
    if(arrIdToChange.length >= 2) arrIdToChange.pop()
    arrIdToChange.push(id)
    $("#change-name-product").val(`${productname}`)
    $("#change-price-product").val(`${price}`)
    $("#change-discount-product").val(`${discount}`)
    $("#change-amount-product").val(`${amount}`)
}

function doneChangeproduct(){
    let id = arrIdToChange[1]
    let productname = $("#change-name-product").val()
    var classify = $("#classify option:selected").val();
    let price = $("#change-price-product").val()
    let discount = $("#change-discount-product").val()
    let amount = $("#change-amount-product").val()
    console.log(productname);
    $.ajax({
        url: "/load/updateProduct",
        method: "PUT",
        data:{
            id,
            productname,
            classify,
            price,
            discount,
            amount
        }
    })
    .then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
}

// function myDeleteproduct(id){

//     $.ajax({
//         url: "/load/remove",
//         method: "DELETE",
//         data:{
//             id
//         }
//     })
//     .then((data)=>{
//         console.log(data);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }


function loadProduct() {
    let tbody = $("#list-product")
    let page = "0"
    console.log(page);

    tbody.empty();
    $.ajax({
        url: "/load/refresh/" + page,
        method: "GET"
    })
        .then((data) => {
            console.log(data);

            for (let i = 0; i < 4; i++) {
                tbody.append(`
                <tr>
                  <td>${i + 1}</td>
                  <td><img style="width: 75px; height: 100px;" src="../../image/${data.value[i].listPicture[0]}" alt=""></td>
                  <td>${data.value[i].productname}</td>
                  <td>${data.value[i].classify}</td>
                  <td>${data.value[i].price}</td>
                  <td>${data.value[i].discount}</td>
                  <td>${data.value[i].amount}</td>
                  <td>
                  <button onclick="myChangeproduct('${data.value[i]._id}', '${data.value[i].productname}','${data.value[i].price}','${data.value[i].discount}','${data.value[i].amount}')" id="btn-change" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalChangeproduct">Thay đổi</button>
                    <button onclick=myDeleteproduct('${data.value[i]._id}') type="button" class="btn btn-danger">Xóa</button>
                  </td>
                </tr>
        `)
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
loadProduct()


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