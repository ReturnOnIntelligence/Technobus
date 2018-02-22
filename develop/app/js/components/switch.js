/**
 * Модуль установки событий работы с свичём
 */


function checkMapLoad() {
    if (currentWindow === 2 && !isLoadedMaps) {
        showMap();
    }
}

$(function () {
    $('#First_page').click(function () {
        currentWindow = 1;
        if (currentTableId === 0) {
            $('#toTechn').trigger('click');
        }
        else if (currentTableId === 1) {
            $('#toMetro').trigger('click');
        }
    });

    $('#Second_page').click(function () {
        currentWindow = 2;
        checkMapLoad();
    });

    $('#Third_page').click(function () {
        currentWindow = 3;
    });


    $("#toTechn").click(function () {
        currentTableId = 0;

        $("#toTechn").addClass("is-active");
        $("#toMetro").removeClass("is-active");
        $("#timelineDirection").removeClass("tube");

        if (currentWindow === 1) {
            transition1();

            $("#scheduleList1").hide();
            $("#scheduleList0").show();


            if ($("#scheduleList0").find("li.next").length > 0) {
                $('#timelineDirection').animate({scrollTop: $("#scheduleList0 li.next").offset().top - $("#scheduleList0").offset().top - 60});
            }
        }
        else if (currentWindow === 2) {
            transition2();
            //showMap();
        }

        else if (currentWindow === 3)
            transition3();

    });

    $("#toMetro").click(function () {
        currentTableId = 1;
        $("#toMetro").addClass("is-active");
        $("#toTechn").removeClass("is-active");
        $("#timelineDirection").addClass("tube");

        if (currentWindow === 1) {
            transition1();

            $("#scheduleList1").show();
            $("#scheduleList0").hide();

            if ($("#scheduleList1").find("li.next").length > 0) {
                $('#timelineDirection').animate({scrollTop: $("#scheduleList1 li.next").offset().top - $("#scheduleList1").offset().top - 60});
            }
        }
        else if (currentWindow === 2) {
            transition2();
            //showMap();
        }
        else if (currentWindow === 3)
            transition3();
    });
});
