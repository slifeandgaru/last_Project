function move_to_Register() {
    $(".login-form").attr("style", "display:none")
    $(".register-form").removeAttr("style")
}
function move_to_login() {
    $(".register-form").attr("style", "display:none")
    $(".login-form").removeAttr("style")
}

function summit() {
    let username = $("#username").val()
    let password = $("#password").val()
    let phone = $("#phone").val()
    let birthDate = $("#birthDate").val()
    var gender = $("#gender option:selected").val();

    $.ajax({
        url: "/userRouter",
        method: "POST",
        data: {
            username,
            password,
            phone,
            birthDate,
            gender
        }
    })
        .then((data) => {
            // console.log(data.message);
            
        }).catch((err) => {
            console.log(err);
        })
}

function userLogin() {
    let username = $("#username-login").val()
    let password = $("#password-login").val()
    console.log(username);
    $.ajax({
        url: "/userRouter/login",
        method: "POST",
        data: {
            username,
            password 
        }
    })
        .then((data) => {
            console.log(data);
            if(data.message =="đăng nhập thành công"){
                window.location.href = "/floda/san-pham"
            }
            setCookie('user', data.token, 30)
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