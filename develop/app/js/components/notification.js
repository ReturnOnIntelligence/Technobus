/**
 * Управление уведомлением
 */
$(function () {

    $('#notification').hide();
    /**
     * Скрытие уведомления
     */
    function hideNotification() {
        $('#notification').hide();
    }

    $('#notification').click(function () {
        hideNotification();
    });

});