
$(function() {



	$('.js-close-weekend-splash').click(function () {
        $('.js-weekend-splash').hide();
        $('#First_page').trigger('click');
    });

	$('.js-open-alt-ways').click(function () {
        $('.js-weekend-splash').hide();
        $('#Third_page').trigger('click');
    });


});
