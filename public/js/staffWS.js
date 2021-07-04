$(".data-user").click(function() {
    $(this).addClass("style")
    $(".data-product").removeClass("style")
    $(".content-product").addClass("hide")
    $(".detail").removeClass("hide")
})
$(".data-product").click(function() { 
    $(this).addClass("style")
    $(".data-user").removeClass("style")
    $(".detail").addClass("hide")
    $(".content-product").removeClass("hide")
})

// showLibrary()


function myDetail(){
    let token = getCookie("token")

    $.ajax({
        url: "/staffRouter/loadstaff/" + token,
        method: "GET",
    })
    .then((data)=>{
        console.log(data);
        $(".user").append(`<span>${data.value.account}</span>`)
    }).catch((err)=>{
        console.log(err);
    })
}
myDetail()


$("#myID li").click(function(){
    let tbody = $("#list-product")
    let page = $(this).attr('id')
    console.log(page);
    tbody.empty();
    $.ajax({
        url: "/load/refresh/" + page,
        method: "GET"
    })
        .then((data) => {
            console.log(data);
            // console.log(data.value[8].listPicture[0]);

            for (let i = 0; i < 4; i++) {
                tbody.append(`
                <tr>
                  <td>${i + 1}</td>
                  <td><img style="width: 75px; height: 100px;" src="../../image/${data.value[i].listPicture[0]}" alt=""></td>
                  <td>${data.value[i].productname}</td>
                  <td>${data.value[i].price}</td>
                  <td>${data.value[i].discount}</td>
                  <td>${data.value[i].amount}</td>
                  <td>${data.value[i].price}</td>
                </tr>
        `)
            }
        })
        .catch((err) => {
            console.log(err);
        })
})



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
                  <td>${data.value[i].price}</td>
                  <td>${data.value[i].discount}</td>
                  <td>${data.value[i].amount}</td>
                  <td>${data.value[i].price}</td>
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