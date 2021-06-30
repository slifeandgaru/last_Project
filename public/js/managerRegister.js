function Submit(){
    // let name = document.getElementById("idName").value
    // let password = $("#idPass").val()
    // let email = 
    // let address = $("#idAdress").val()
    // let phone = $("#idPhone").val()

    $.ajax({
        url: "/managerRouter",
        method: "POST",
        data: {
            account: $("#idAccount").val(),
            name : $("#idName").val(),
            password: $("#idPass").val(),
            email: $("#idGmail").val(),
            address: $("#idAdress").val(),
            phone: $("#idPhone").val()
        }
    })
    .then((data) =>{
        alert(data)
    }).catch((err) =>{
        console.log(err);
    })
}