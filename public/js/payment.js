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