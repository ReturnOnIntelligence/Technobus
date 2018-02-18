function checkGeoLocation() {
    if (isGeoLocationOn && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var x = position.coords.latitude;
                var y = position.coords.longitude;
                //59.818101, 30.327032 ROI
                //59.854597, 30.320867 Metro
                var x1 = 59.818101;  //ROI
                var y1 = 30.327032;  //ROI
                var x2 = 59.854597;  //Metro
                var y2 = 30.320867;  //Metro

                var distanceToRoi = Math.sqrt(Math.pow(Math.abs(x1 - x), 2) + Math.pow(Math.abs(y1 - y), 2));
                var distanceToMetro = Math.sqrt(Math.pow(Math.abs(x2 - x), 2) + Math.pow(Math.abs(y2 - y), 2));

                if (distanceToRoi <= distanceToMetro) {
                    currentTableId = 1;
                    $("#toMetro").addClass("is-active");
                    $("#toTechn").removeClass("is-active");
                    $("#timelineDirection").addClass("tube");
                    $("#scheduleList0").hide();
                    $("#scheduleList1").show();
                }
                else {
                    currentTableId = 0;
                    $("#toTechn").addClass("is-active");
                    $("#toMetro").removeClass("is-active");
                    $("#timelineDirection").removeClass("tube");
                    $("#scheduleList1").hide();
                    $("#scheduleList0").show();
                }
                if (currentTableId === 0) {
                    if($("#scheduleList0 li.next").length > 0){
                        $('#timelineDirection').animate({scrollTop: $("#scheduleList0 li.next").offset().top - $("#scheduleList0").offset().top - 60});
                    }

                }
                else {
                    if($("#scheduleList1 li.next").length > 0){
                        $('#timelineDirection').animate({scrollTop: $("#scheduleList1 li.next").offset().top - $("#scheduleList1").offset().top - 60});
                    }
                }
            }
        );
    }
    else {
        currentTableId = 0;
        $("#toTechn").addClass("is-active");
        $("#toMetro").removeClass("is-active");
        $("#timelineDirection").removeClass("tube");
        $("#scheduleList1").show();
        $("#scheduleList0").hide();
        $('#timelineDirection').animate({scrollTop: $("#scheduleList0 li.next").offset().top - $("#scheduleList0").offset().top - 60});
    }
}

    