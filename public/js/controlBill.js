function Back(){
    $(".viewInfomation").attr("style", "display:none")
    $(".show_all_bill").removeAttr("style")
}

function loadBill() {
    $(".billTable").empty()

    $.ajax({
        url: "/productRouter/loadBill",
        method: "POST"
    })
        .then((data) => {
            console.log(data);
            for (let i = 0; i < data.value.length; i++) {
                $(".billTable").append(`
            <tr>
                <td>${i + 1}</td>
                <td>${data.value[i].cartId}</td>
                <td>${data.value[i].surname} ${data.value[i].lastname}</td>
                <td>${data.value[i].address}</td>
                <td>${data.value[i].phone}</td>
                <td>${data.value[i].totalPrice}</td>
                <td><button class="btn btn-info" onclick="showInfo('${data.value[i].cartId}','${data.value[i].lastname}','${data.value[i].surname}','${data.value[i].address}','${data.value[i].city}','${data.value[i].phone}','${data.value[i].email}')">Chi tiết</button></td>
            </tr>
        `)
            }
        })
}
loadBill()

function showInfo(cartId, firstname, lastname, address, city, phone, gmail) {
    $(".show_all_bill").attr("style", "display:none")
    $(".viewInfomation").removeAttr("style")


    $("#cartId").val(cartId)
    $("#firstname").val(firstname)
    $("#lastname").val(lastname)
    $("#address").val(address)
    $("#city").val(city)
    $("#phone").val(phone)
    $("#gmail").val(gmail)

    var total = 0;
    $("#show_image").empty()
    $("#show_price").empty()


    $.ajax({
        url: "/productRouter/showBill/" + cartId,
        method: "POST"
    })
    .then((data) =>{
        console.log(data);
        for(let i = 0; i< data.value.length; i++){
            
            total = total + Number(data.value4[i])
            console.log(total);
            $("#show_image").append(`
                <p>
                    <span>${data.value2[i]}</span>
                    <img style="width: 150px; height: 200px;" src="../../image/${data.value[i]}" alt="">
                </p>
            `)

            $("#show_price").append(`
                <p>${data.value2[i]} x ${data.value3[i]} = ${data.value4[i] * data.value3[i]}đ</p>
            `)
        }
        $("#show_price").append(`
                <p>Tổng = ${total}đ</p>
            `)
    })
}