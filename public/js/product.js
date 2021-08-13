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
$("#leather").click(function () {
  var id = $(this).attr("id");
  $("#pages div#gumboots").css("display", "none");
  $("#pages div#" + id + "").css("display", "block");
});
$("#gumboots").click(function () {
  $(".z").hide();
  var id = $(this).attr("id");
  $("#pages div#leather").css("display", "none");
  $("#pages div#" + id + "").css("display", "block");
});
$(document).ready(function () {
  /* 1. Visualizing things on Hover - See next part for action on click */
  $("#stars li")
    .on("mouseover", function () {
      var onStar = parseInt($(this).data("value"), 10); // The star currently mouse on
      // Now highlight all the stars that's not after the current hovered star
      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          if (e < onStar) {
            $(this).addClass("hover");
          } else {
            $(this).removeClass("hover");
          }
        });
    })
    .on("mouseout", function () {
      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          $(this).removeClass("hover");
        });
    });

  /* 2. Action to perform on click */
  $("#stars li").on("click", function () {
    var onStar = parseInt($(this).data("value"), 10); // The star currently selected
    var stars = $(this).parent().children("li.star");

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass("selected");
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass("selected");
    }
  });
});


function load_choose_product() {
  let product = getCookie('product')

  $.ajax({
    url: "/productRouter/load_product/" + product,
    method: "GET"
  })
    .then((data) => {
      console.log(data);
      if (data.value.discount == undefined) {
        $(".information").append(`
          <div class="container-fluid px-sm-1 py-5 mx-auto">
            <div class="row justify-content-center">
              <div class="d-flex">
                <div class="card card-1">
                    <div class="pr-3 row justify-content-end">
                        <button style="border: none;cursor: pointer;width: 30px;height: 30px;"
                            class="like"><i class="far fa-heart"></i></button>
                    </div>
                    <div class="product-pic"> <img class="pic1"
                            src="../image/${data.value.listPicture[0]}"> </div> <small
                        class="category">Flowers</small>
                      <h5 class="product-name">${data.value.productname}</h5>
                      <p style="color: red;font-weight: bold;font-size: 15px;" class="price">
                        <span>${data.value.price}₫</span>
                      </p>
                    <div
                        style="height: 55px;width: 55px;font-weight: bold;font-size: 22px;color: #fff;background-color: black;border-radius: 50%;display: inline-block;padding-top: 9px;padding-left: 5px;position: absolute;">
                        <span>-7%</span></div>
                </div>
              </div>
            </div>
          </div>
        `)

        $(".priceOrder").append(`
          <p style="color: #1c1c1c;font-weight: 500;font-size: 25px;">${data.value.productname}</p>
          <div><p>Số lượng: ${data.value.amount}</p> </div>
          <p style="color: red;font-weight: bold;font-size: 25px;">
            <span>${data.value.price} ₫</span>
          </p>
        `)

      } else {
        $(".information").append(`
          <div class="container-fluid px-sm-1 py-5 mx-auto">
            <div class="row justify-content-center">
              <div class="d-flex">
                <div class="card card-1">
                    <div class="pr-3 row justify-content-end">
                        <button style="border: none;cursor: pointer;width: 30px;height: 30px;"
                            class="like"><i class="far fa-heart"></i></button>
                    </div>
                    <div class="product-pic"> <img class="pic1"
                            src="../image/${data.value.listPicture[0]}"> </div> <small
                        class="category">Flowers</small>
                      <h5 class="product-name">${data.value.productname}</h5>
                      <p style="color: red;font-weight: bold;font-size: 15px;" class="price"><span
                            style="text-decoration:line-through;opacity: 0.5;">${data.value.price}
                            ₫</span><span style="padding-left: 10px;">${data.value.discount} ₫</span></p>
                    <div
                        style="height: 55px;width: 55px;font-weight: bold;font-size: 22px;color: #fff;background-color: black;border-radius: 50%;display: inline-block;padding-top: 9px;padding-left: 5px;position: absolute;">
                        <span>${data.value.percent}%</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        `)

        $(".priceOrder").append(`
          <p style="color: #1c1c1c;font-weight: 500;font-size: 25px;">${data.value.productname}</p>
          <div><p>Số lượng: ${data.value.amount}</p> </div>
          <p style="color: red;font-weight: bold;font-size: 25px;">
            <span style="text-decoration:line-through;opacity: 0.5;">${data.value.price} ₫</span>
            <span style="padding-left: 10px;">${data.value.discount} ₫</span>
          </p>
        `)
      }
    }).catch((err) => {
      console.log(err);
    })
}
load_choose_product()



function add_to_payment() {
  if (getCookie("user") == "") {
    console.log(getCookie("user"));
    let conf = confirm("Bạn chưa đăng nhập, vui lòng đăng nhập!!!!!!!!!!!")
    if (conf == true) {
      window.location.href = "/userRegister"
    }
  } else {
    let userId = getCookie("user")
    let listProduct = getCookie("product")
    let amount = $("#quantity").val()
    console.log(amount);
    $.ajax({
      url: "/productRouter/add_to_cart/" + userId + "/" + listProduct,
      method: "POST",
      data: {
        amount
      }
    })
      .then((data) => {
        console.log(data);
        if (data.message == "Không đủ") {
          alert("Số lượng sản phẩm không đủ")
        } else if (data.message == "Sản phẩm đã được thêm vào giỏ hàng") {
          alert("Sản phẩm đã được thêm vào giỏ hàng")
        }
      })
  }
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


$('#shop-cart[data-toggle="tooltip"]').tooltip({
  animated: 'fade',
  placement: 'bottom',
});
