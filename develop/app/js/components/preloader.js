/**
 * Модуль установки времени показа заставки
 */
$(function () {
	var splash = $('.js-splash');
	var splashContent = $('.splash-content');
	var SPLASH_DURATION_TIME = 2000;

	// Установка времени показа заставки
	var showSplashContent = function () {
		splashContent.css('opacity', '1');
		$('.splash').delay(SPLASH_DURATION_TIME).fadeOut("slow");
	};

	// После полной загрузки изображений появляется контент splash экрана
	splash.imagesLoaded(function () {
		showSplashContent();
	});

	splash.click(function () {
		$(this).hide();
	});
});
