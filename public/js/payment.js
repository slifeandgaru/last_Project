$('#shop-cart[data-toggle="tooltip"]').tooltip({
  animated: "fade",
  placement: "bottom",
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
$(function () {
  var menu = $("input[name='menuitems']"); // all checkboxes with the name 'menuitems'
  var output = $('<p />'); // generating a <p></p> element to add results instead of console.log()
  //var checkedArray = []; // for storing div ids / toggle show
  menu.change(function () {
    // get properties and make them into jQuery selectors for
    // their divs
    var val = "#" + $(this).val();
    var id = "#" + $(this).prop("id") + "Div";
    var dataRef = "#" + $(this).data("ref");
    // are we checked?
    if ($(this).prop("checked")) { //yup
      // show div - could use id or dataRef here
      $(val).show();
    } else { //nope
      $(val).hide();
    }
  });
});

function load_bill_cart() {
  var Total = 0
  let userId = getCookie("user")
  console.log(userId);
  $.ajax({
    url: "/productRouter/load_cart",
    method: "POST",
    data: {
      userId
    }
  })
    .then((data) => {
      console.log(data);
      
      for (let i = 0; i < data.value.listProduct.length; i++) {
        Total = Total + (data.value.listProduct[i].amount * data.value2[i].price)
        $(".bill-product-name").append(`
          <p>${data.value2[i].productname} × ${data.value.listProduct[i].amount}<span
                                style="margin-left:145px;color:#cc2121;font-weight:bolder">${data.value.listProduct[i].amount * data.value2[i].price} ₫</span></p>
          <hr style="width: 100%;">
        `)
      }
      $(".bill-total").html(Total)
      $(".cartId").html(data.value._id)
    }).catch((err) => {
      console.log(err);
    })
}

load_bill_cart()

function create_bill(){
  var lastname = $("#lastname").val()
  var surname = $("#surname").val()
  var address = $("#address").val()
  var city = $("#city").val()
  var phone = $("#phone").val()
  var email = $("#email").val()
  var cartId = $(".cartId").text()
  var totalPrice = $("#totalPrice").text()
  
  

  $.ajax({
    url: "/productRouter/create_bill",
    method: "POST",
    data:{
      lastname,
      surname,
      address,
      city,
      phone,
      email,
      cartId,
      totalPrice
    }
  })
  .then((data) =>{
    console.log(data);
  }).catch((err)=>{
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
