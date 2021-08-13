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

$(".data-bill").click(function(){
    window.location.href = "/controlBill"
})


function submit_image() {
    let data = $("form")[0];
    let form = new FormData(data);

    $.ajax({
        url: "/staffRouter/multiple",
        method: "POST",
        data: form,
        processData: false,
        contentType: false
    })
        .then((data) => {
            console.log(data);
            alert("sản phẩm đã được thêm")
        }).catch((err) => {
            console.log(err);
        })
}

// showLibrary()

function myDetail() {
    let token = getCookie("staff")
    console.log(token);
    if (token == "") {
        alert("Bạn chưa đăng nhập vui lòng đăng nhập")
        window.location.href = "/login"
    } else {

        $.ajax({
            url: "/staffRouter/loadstaff/" + token,
            method: "GET",
        })
            .then((data) => {
                console.log(data);
                if (data.message == "token đã vào blacklist") {
                    alert("bạn không được quyền truy cập, vui lòng đăng nhập")
                    window.location.href = "/login"
                } else {
                    $(".user").append(`<span>${data.value.account}</span>`)
                }
            }).catch((err) => {
                console.log(err);
            })
    }
}
myDetail()


// $("#myID li").click(function () {
//     let tbody = $("#list-product")
//     let page = $(this).attr('id')
//     console.log(page);
//     tbody.empty();
//     $.ajax({
//         url: "/staffRouter/refresh/" + page,
//         method: "GET"
//     })
//         .then((data) => {
//             console.log(data.value[0].percent)
//             for (let i = 0; i < 4; i++) {
//                 tbody.append(`
//                 <tr>
//                   <td>${i + 1}</td>
//                   <td><img style="width: 75px; height: 100px;" src="../../image/${data.value[i].listPicture[0]}" alt=""></td>
//                   <td>${data.value[i].productname}</td>
//                   <td>${data.value[i].classify}</td>
//                   <td>${data.value[i].price}</td>
//                   <td>${data.value[i].discount}</td>
//                   <td>${data.value[i].amount}</td>
//                   <td>
//                     <button onclick="myChangeproduct('${data.value[i]._id}', '${data.value[i].productname}','${data.value[i].price}', '${data.value[i].percent}','${data.value[i].amount}')" id="btn-change" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalChangeproduct">Thay đổi</button>
//                     <button onclick=myDeleteproduct('${data.value[i]._id}') type="button" class="btn btn-danger">Xóa</button>
//                   </td>
//                 </tr>
//         `)
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// thay đổi product
// lưu ID khi thay đổi data
var arrIdToChange = [1]
function myChangeproduct(id, productname, price, percent, amount) {
    console.log(id);
    console.log(percent);
    if (arrIdToChange.length >= 2) arrIdToChange.pop()
    arrIdToChange.push(id)
    $("#change-name-product").val(`${productname}`)
    $("#change-price-product").val(`${price}`)
    $("#change-percent-product").val(`${percent}`)
    $("#change-amount-product").val(`${amount}`)
}

function doneChangeproduct() {
    let id = arrIdToChange[1]
    let productname = $("#change-name-product").val()
    var classify = $("#classify-change option:selected").val()
    let price = $("#change-price-product").val()
    let percent = $("#change-percent-product").val()
    let amount = $("#change-amount-product").val()
    console.log(classify);
    $.ajax({
        url: "/staffRouter/updateProduct",
        method: "PUT",
        data: {
            id,
            productname,
            classify,
            price,
            percent,
            amount
        }
    })
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
}

function myDeleteproduct(id) {

    $.ajax({
        url: "/staffRouter/remove",
        method: "DELETE",
        data: {
            id
        }
    })
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
}


function Refresh() {
    let tbody = $("#list-product")
    let page = "0"
    console.log(page);

    tbody.empty();
    $.ajax({
        url: "/staffRouter/refresh/" + page,
        method: "GET"
    })
        .then((data) => {
            // console.log(data.value[0].percent);

            for (let i = 0; i < 8; i++) {
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
                  <button onclick="myChangeproduct('${data.value[i]._id}', '${data.value[i].productname}','${data.value[i].price}','${data.value[i].percent}','${data.value[i].amount}')" id="btn-change" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalChangeproduct">Thay đổi</button>
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
Refresh()


function signOut() {
    let token = getCookie("staff")

    $.ajax({
        url: "/staffRouter/blacklist/" + token,
        method: "POST",
    })
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        setTimeout(myDetail(), 1000)
}


function get_staff_information() {
    let tbody = $("#list-user-detail")
    let staffId = getCookie("staff")
    console.log(staffId);
    // let page = "0"
    // console.log(page);

    tbody.empty();
    $.ajax({
        url: "/managerRouter/get_staff_information/" + staffId,
        method: "GET",
    })
        .then((data) => {
            // console.log(data.value[0].percent);
                tbody.append(`
                <tr>
                  <td>${1}</td>
                  <td>${data.value.name}</td>
                  <td>${data.value.email}</td>
                  <td>${data.value.address}</td>
                  <td>${data.value.phone}</td>
                  <td>${data.value.role}</td>
                  <td>
                  <button onclick="myChangeManager('${data.value._id}','${data.value.account}','${data.value.name}','${data.value.password}','${data.value.email}','${data.value.address}','${data.value.phone}')" id="btn-change" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalChangeData">Thay đổi</button>
                    <button onclick=myDeleteManager('${data.value._id}') type="button" class="btn btn-danger">Xóa</button>
                  </td>
                </tr>
        `)
            
        })
        .catch((err) => {
            console.log(err);
        })
}
get_staff_information()

var arrIdToChangeManager = [1]
function myChangeManager(id, account, name, password, email, address, phone) {
    // console.log(id);
    // console.log(percent);
    if (arrIdToChangeManager.length >= 2) arrIdToChangeManager.pop()
    arrIdToChangeManager.push(id)
    $("#change_account_manager").val(`${account}`)
    $("#change_name_manager").val(`${name}`)
    // $("#change_password_manager").val(`${password}`)
    $("#change_email_manager").val(`${email}`)
    $("#change_address_manager").val(`${address}`)
    $("#change_phone_manager").val(`${phone}`)
}

function doneChange() {
    let id = arrIdToChangeManager[1]
    let account = $("#change_account_manager").val()
    let name = $("#change_name_manager").val()
    let password = $("#change_password_manager").val()
    let email = $("#change_email_manager").val()
    let address = $("#change_address_manager").val()
    let phone = $("#change_phone_manager").val()
    
    // console.log(classify);
    $.ajax({
        url: "/managerRouter/updateManager",
        method: "PUT",
        data: {
            id,
            account,
            name,
            password,
            email,
            address,
            phone
        }
    })
        .then((data) => {
            console.log(data);
            if(data.message == "update successful"){
                setTimeout(Refresh_Staff(), 1000)
            }
        }).catch((err) => {
            console.log(err);
        })
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