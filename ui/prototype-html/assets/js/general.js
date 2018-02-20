//
// JS FILE ONLY FOR DEMO PURPOSE
//
$(function() {

	function init() {
		$(document).on('click', '.js-close-weekend-splash', closeWeekendSlash);
	}

	// Close closeWeekendSlash
	function closeWeekendSlash() {
		$('.js-weekend-splash').hide();;
	}

	init();

});
