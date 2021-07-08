var number = 0;
function list11() {
  console.log('ádas');
  if (number == 1) {
    $("#list111").hide();
    number = 0;
  } else {
    number++;
    $("#list111").show();
  }
}
$('#shop-cart[data-toggle="tooltip"]').tooltip({
  animated: 'fade',
  placement: 'bottom',
});

