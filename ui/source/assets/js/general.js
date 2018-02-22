//
// JS FILE ONLY FOR DEMO PURPOSE
//
$(function() {

	function init() {
		$(document).on('click', '.js-close-weekend-splash', closeWeekendSlash);
		$(document).on('click', '.js-splash', closeSlash);
	}

	// Close closeWeekendSlash
	function closeWeekendSlash() {
		$('.js-weekend-splash').hide();;
	}

	// Close closeSlash
	function closeSlash() {
		$('.js-splash').hide();;
	}

	init();

});
