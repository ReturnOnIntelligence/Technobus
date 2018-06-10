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

});


function setPushNotification(object) {
    let pushs = JSON.parse(localStorage.getItem("pushs"));
    let values = object.innerText.split(":");
    let mm = parseInt(values[1]), hh = parseInt(values[0]);
    let p = pushs.find(function (el) {
        return el === (hh+":"+mm);
    });
    if(!p){
        pushs.push(hh + ":" + mm);
        localStorage.setItem("pushs", JSON.stringify(pushs));
        alert("Напоминание на " + hh + ":" + mm + " установлено");
    }
    else{
        alert("Напоминание уже установлено");
    }
    
}