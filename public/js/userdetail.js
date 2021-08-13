function load_user_information() {
    let token = getCookie("user")

    $.ajax({
        url: "/userRouter/load_user_information/" + token,
        method: 'GET'
    })
        .then((data) => {
            console.log(data);
            $(".username").append(`<span>Tên người dùng: ${data.value.username}</span>`)
            $(".password").append(`<span>Mật khẩu: ${data.value.password}</span>`)
            $(".phone").append(`<span>Số điện thoại: ${data.value.phone}</span>`)
            $(".address").append(`<span>Địa chỉ: ${data.value.address}</span>`)
            $(".email").append(`<span>Địa chỉ Gmail: ${data.value.email}</span>`)
        })
}
load_user_information()

function change_user_name() {
    let token = getCookie('user')
    let username = $("#change_user_name").val()

    $.ajax({
        url: '/userRouter/change_user_name',
        method: 'POST',
        data: {
            token,
            username
        }
    })
        .then((data) => {
            if (data.message == "Thay đổi thành công") {
                window.location.href = "/userdetail"
            }
        })
}

function change_password() {
    let token = getCookie('user')
    let old_password = $("#old_password").val()
    let new_password = $("#new_password").val()
    if (new_password == '') {
        alert("Không được để trống")
    } else {
        $.ajax({
            url: '/userRouter/change_password',
            method: 'POST',
            data: {
                token,
                old_password,
                new_password
            }
        })
            .then((data) => {
                if (data == "Mật khẩu cũ không chính xác") {
                    alert("Mật khẩu cũ không chính xác")
                }
                if (data.message == "Thay đổi thành công") {
                    window.location.href = "/userdetail"
                }
            })
    }
}


function change_phone_number() {
    let token = getCookie('user')
    let phone = $("#change_phone_number").val()

    $.ajax({
        url: '/userRouter/change_phone_number',
        method: 'POST',
        data: {
            token,
            phone
        }
    })
        .then((data) => {
            console.log(data);
            if (data.message == "Thay đổi thành công") {
                window.location.href = "/userdetail"
            }
        })
}

function change_address() {
    let token = getCookie('user')
    let address = $("#change_address").val()

    $.ajax({
        url: '/userRouter/change_address',
        method: 'POST',
        data: {
            token,
            address
        }
    })
        .then((data) => {
            console.log(data);
            if (data.message == "Thay đổi thành công") {
                window.location.href = "/userdetail"
            }
        })
}

function change_email() {
    let token = getCookie('user')
    let email = $("#change_email").val()

    $.ajax({
        url: '/userRouter/change_email',
        method: 'POST',
        data: {
            token,
            email
        }
    })
        .then((data) => {
            console.log(data);
            if (data.message == "Thay đổi thành công") {
                window.location.href = "/userdetail"
            }
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