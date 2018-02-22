/**
 * Модуль установки времени показа заставки
 */
$(function(){
    $('.js-splash').click(function () {
        $('.js-splash').hide();
    });
    // Установка времени показа заставки
    $('.splash').delay(1000).fadeOut("slow");
});