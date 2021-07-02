function chooseAdmin(){
    $(".beforeLogin").attr("style", "display:none")
    $(".startLogin-Admin").removeAttr("style")

}

function adminLogin(){
    let role = "Admin"
    $.ajax({
        url: "/managerRouter/login",
        method: "POST",
        data: {
            account : $("#idAdmin-Account").val(),
            password: $("#idAdmin-Pass").val(),
            role
        }
    })
    .then((data) =>{
        console.log(data.message);
        if(data.error == true){
            $(".alertError").append(`<span class="spanError">${data.message}</span>`)
        }
        setCookie('token', data.token, 30)
    })
    .catch((error) =>{
        console.log(error + "error");
    })
}

function staffLogin(){
    let role = "staff"
    $.ajax({
        url: "/managerRouter/login",
        method: "POST",
        data: {
            account : $("#idStaff-Account").val(),
            password: $("#idStaff-Pass").val(),
            role
        }
    })
    .then((data) =>{
        console.log(data.message);
        if(data.error == true){
            $(".alertError").append(`<span class="spanError">${data.message}</span>`)
        }
        setCookie('token', data.token, 30)
    })
    .catch((error) =>{
        console.log(error + "error");
    })
}

function back_Admin(){
    $(".startLogin-Admin").attr("style", "display:none")
    $(".beforeLogin").removeAttr("style")
}

function chooseStaff(){
    $(".beforeLogin").attr("style", "display:none")
    $(".startLogin-Staff").removeAttr("style")
}

function back_Staff(){
    $(".startLogin-Staff").attr("style", "display:none")
    $(".beforeLogin").removeAttr("style")
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