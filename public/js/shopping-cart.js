$('#shop-cart[data-toggle="tooltip"]').tooltip({
  animated: "fade",
  placement: "bottom",
});

$(document).ready(function () {
  var quantity = 0;
  $(".quantity-right-plus").click(function (e) {
    e.preventDefault();
    var quantity = parseInt($("#quantity").val());
    $("#quantity").val(quantity + 1);
  });
  $(".quantity-left-minus").click(function (e) {
    e.preventDefault();
    var quantity = parseInt($("#quantity").val());
    if (quantity > 0) {
      $("#quantity").val(quantity - 1);
    }
  });
});


function load_shopping_cart(){
  var Total = 0
  let userId = getCookie("user")
  console.log(userId);
  $.ajax({
    url: "/productRouter/load_cart",
    method: "POST",
    data:{
      userId
    }
  })
  .then((data)=>{
    console.log(data);
    for(let i = 0; i < data.value.listProduct.length; i++){

      Total = Total + (data.value.listProduct[i].amount * data.value2[i].price)
      // console.log(Total)
      $(".show-cart").append(`
      <div class="row" style="height: auto;">
      <div class="col-lg-6" style="margin-top:-10px">
          <div class="cart-name">
              <button onclick = "remove_cart('${data.value.listProduct[i]._id}')"
                  style="border: 1px solid #ccc;border-radius: 50%; height: 1.5em;width: 1.5em;cursor: pointer;padding-bottom: 23px;"><i
                      class="fas fa-times"></i></button>
              <img src="../image/product-2.jpg" alt="" style="height: 80px;width: 80px;">
              <a href="" style="color: #666;">${data.value2[i].productname}</a>
          </div>
      </div>
      <div class="col-lg-2 cart-price"
          style="font-weight: bolder; font-size: 15px; color: #e84545; margin-top: 15px;">${data.value2[i].price} ₫
      </div>
      <div class="col-lg-2 " style="width: 30%; margin-top: 15px;">
          <div class="input-group ">
              <span class="input-group-btn">
                  <button type="button" class="quantity-left-minus btn-number" data-type="minus"
                      data-field="">
                      <i class="fas fa-minus"></i>
                  </button>
              </span>
              <input type="text" style="height: 28px;" id="quantity" name="quantity"
                  class="form-control input-number" value="${data.value.listProduct[i].amount}" min="1" max="100">
              <span class="input-group-btn">
                  <button type="button" class="quantity-right-plus  btn-number" data-type="plus"
                      data-field="">
                      <i class="fas fa-plus"></i>
                  </button>
              </span>
          </div>
      </div>
      <div class="col-lg-2 al"
          style="padding-left: 34px;font-weight: bolder; font-size: 15px; color: #e84545; margin-top: 15px;">
          ${data.value.listProduct[i].amount * data.value2[i].price} ₫</div>
  </div>
      `)
    }
    $(".total-cart").html(Total + "₫")
    console.log(Total);
  }).catch((err)=>{
    console.log(err);
  })
}

load_shopping_cart()

function remove_cart(number){
  console.log(number);
  var userId = getCookie("user")
  $.ajax({
    url: "/productRouter/remove_cart/" + userId + "/" + number,
    method: "DELETE"
  })
  .then((data)=>{
    console.log(data);
    if(data.error == false){
      window.location.href = "/floda/gio-hang"
    }
  }).catch((err) =>{
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
