// load ảnh lên mục sản phẩm hàng đầu ở trang Home
function listshow(){
    $.ajax({
        url: "/load/refresh",
        method: "GET",
    
    })
    .then((data) =>{
        for (let i = 0; i < 4; i++) {
            $(".listshow").append(`
            <div class="col-lg-3">
            <figure>
                <div class="hover-animation">
                    <img src="../image/${data.value[i].listPicture[0]}" alt="" class="img-back">
                    <img src="../image/${data.value[i].listPicture[1]}" alt="" class="img-front">
                </div>
                <figcaption>
                    <p style="font-weight: 600; padding-top: 10px;margin-bottom: auto;">${data.value[i].productname}</p>
                    <p style="color:#cc2121"><span style="text-decoration: line-through;opacity: 0.5;">${data.value[i].price}</span><span>250,000 đ</span></p>
                </figcaption>
            </figure>       
        </div>
          `)
          }
    })
}

listshow()