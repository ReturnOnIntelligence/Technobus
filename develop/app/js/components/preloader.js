/**
 * Модуль установки времени показа заставки
 */
$(function () {
	var splash = $('.js-splash');
	var preloader = $('.preloader');
	var splashContent = $('.splash-content');
	var SPLASH_DURATION_TIME = 2000;
	var PRELOADER_DURATION_TIME = 450;

	// Установка времени показа заставки
	var showSplashContent = function () {
		splashContent.css('opacity', '1');
		$('.splash').delay(SPLASH_DURATION_TIME).fadeOut("slow");
	};

	splash.imagesLoaded(function () {
		preloader.fadeOut();
		setTimeout(showSplashContent, PRELOADER_DURATION_TIME);
	});

	splash.click(function () {
		$(this).hide();
	});
});
