function submit(){
    let file = document.getElementById("myfile").value

    $.ajax({
        url: '/load/single',
        method: "POST",
        data: {
            file
        }
    })
    .then((data) =>{
        console.log(data);
    }).catch((err) =>{
        console.log(err);
    })
}