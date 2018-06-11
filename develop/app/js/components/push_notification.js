$(function () {

    if (!('serviceWorker' in navigator)) {
        isPushSupported = false;
    }

    if (!('PushManager' in window)) {
        isPushSupported = false;
    }
    // alert(isPushSupported);
    if (localStorage.getItem("pushs") == null) {
        localStorage.setItem("pushs", JSON.stringify([]));
    }
    // createPushNotification("test", iconForPushNotification, "title");
});

function createPushNotification(body, icon, title) {
    if (Notification.permission === "granted") {
        notify(body, icon, title);
    }
    else {
        Notification.requestPermission(function (permission) {

            if (permission === "granted") {
                notify(body, icon, title);
            }
        });
    }

    function notify(body, icon, title) {
        let notification = new Notification(title, {
            icon: icon,
            body: body,
        });

        notification.onclick = function () {
            window.focus();
            notification.close();
        };

    }

}

function checkSavedNotifications() {
    let pushsStr = localStorage.getItem("pushs");
    let pushs = [];
    if (pushsStr) {
        pushs = JSON.parse(pushsStr);
    }
    let  checkedPushs = [];
    let time = getCurrentTime();
    let now = time.getHours() * 60 + time.getMinutes();

    for (let i in pushs) {
        let timer = pushs[i]["hh"] * 60 + pushs[i]["mm"];
        let diff = pushs[i]["type"];
        if (timer - now > 0) {

            if(timer - now <= diff){
                createPushNotification("До рейса в " + pushs[i]["hh"] + ":" + pushs[i]["mm"] + " осталось менее " + diff + " минут", iconForPushNotification, "Внимание!");
            }
            else {
                checkedPushs.push(pushs[i]);
            }
        }
    }
    localStorage.setItem("pushs", JSON.stringify(checkedPushs));

}

function setPushNotification(object, timeType) {
    let pushsStr = localStorage.getItem("pushs");
    let pushs = [];
    if (pushsStr) {
        pushs = JSON.parse(pushsStr);
    }

    let values = object.innerText.split(":");
    let mm = parseInt(values[1]), hh = parseInt(values[0]);
    let p = pushs.find(function (el) {
        return el["hh"] === hh && el["mm"] === mm && el["type"] === timeType;
    });
    if (!p) {
        let struct = {"hh": hh, "mm": mm, "type": timeType};
        pushs.push(struct);
        localStorage.setItem("pushs", JSON.stringify(pushs));
        alert("Напоминание на " + hh + ":" + mm + " установлено");
    }
    else {
        alert("Напоминание уже установлено");
    }

}