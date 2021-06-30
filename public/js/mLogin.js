function Submit_Login(){
    $.ajax({
        url: "/managerRouter/login",
        method: "POST",
        data: {
            account : $("#idAccount").val(),
            password: $("#idPass").val(),
            role: $("#myselect option:selected").val()
        }
    })
    .then((data) =>{
        console.log(data.value);
        if(data.value == "staff"){
            window.location.href = "/staffWS"
        }
        setCookie('token', data.token, 30)
    })
    .catch((err) =>{
        console.log(err + "error");
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