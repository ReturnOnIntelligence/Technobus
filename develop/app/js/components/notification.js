/**
 * Управление уведомлением
 */
$(function () {
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