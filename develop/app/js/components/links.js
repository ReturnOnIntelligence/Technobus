$(function () {
   $('.js-mobile-number').click(function () {
      if(device.mobile() && (device.android() || device.ios())){
         window.open('tel: +78123180055');
      }
   });
});