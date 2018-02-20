/**
 * Управление уведомлением
 */
$(function () {
    /**
     * Скрытие уведомления
     */
    function hideNotification() {
        $('.message').hide();
    }

    $('.close').click(function () {
        //hideNotification();
        hideNotification();
    });


    /**
     * Отображение уведомления из infoList
     */
    function getNotification() {

        if (infoList.length === 0) {
            infoList = JSON.parse(localStorage.getItem('info')).values;
        }
        let notification = infoList[notificationNumber];
        if(notification[0].length > 0 && notification[1].length > 0) {
            //$("#title_notification").text(notification[0]);
            $("#output_notification").text(notification[1]);
            $('#notification').show();
        }
    }
    $('#notification').hide();
    //getNotification();
});