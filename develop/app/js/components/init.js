/**
 * Первичная инициализация
 */
$(function () {

    //проверка геопозиции
    checkGeoLocation();

    //showMap();
    //первичное отображение таблицы, в зависимости от заданной стартовой
    if(currentTableId === 0){
        $("#scheduleList1").hide();
        $("#scheduleList0").show();
    }
    else {
        $("#scheduleList0").hide();
        $("#scheduleList1").show();
    }

    // let listTo = $("#scheduleList0").get(0).children;
    // let listFrom = $("#scheduleList1").get(0).children;
    //
    // let lastLi = listTo[listTo.length - 1];
    // lastLi.className = "warning";
    //
    // console.log(lastLi);
    // lastLi.children[1].children[1].innerText = "Всегда есть другие варианты";
    //
    // lastLi = listFrom[listFrom.length - 1];
    // lastLi.className = "warning";
    // lastLi.children[1].children[1].innerText = "Всегда есть другие варианты";




    if(currentTableId === 0){
        if($("#scheduleList0 li.next").length > 0){
            $('#timelineDirection').animate({scrollTop: $("#scheduleList0 li.next").offset().top - $("#scheduleList0").offset().top - 60});
        }
    }
    else {
        if($("#scheduleList1 li.next").length > 0){
            $('#timelineDirection').animate({scrollTop: $("#scheduleList1 li.next").offset().top - $("#scheduleList1").offset().top - 60});
        }
    }

});