/**
 * Модуль работы с датой
 */

$(function () {
    /**
     * Установка текущей даты, поиск следующей даты в таблице, выделение ближайшего рейса, добавление перерыва,
     * отсчёт времени
     */
    function getDiffTime(hour, minuts) {
        let res = "";
        if(hour > 0){
            if (hour < 10)
                res = "0" + hour;
            else
                res = hour;
            res += ' ч ';
        }

        if (minuts < 10) {
            res += "0" + minuts;
        }
        else {
            res += minuts;
        }
        res += ' мин';
        return res;
    }

    function addBreaks(list) {

        let breakPoints = [];
        let now = getCurrentTime();

        let time = now.getHours() * 60 + now.getMinutes();
        let disabledClass = "";
        for(let i = 1; i < list.length - 1; i++){
            //console.log(list[i]);
            let [h1, m1] = list[i].children[0].innerText.split(':');
            let [h2, m2] = list[i + 1].children[0].innerText.split(':');
            let start = parseInt(h1) * 60 + parseInt(m1);
            let end = parseInt(h2) * 60 + parseInt(m2);

            let differenceTime = end - start;
            let difH = Math.floor(differenceTime / 60);
            let difM = differenceTime % 60;
            if(differenceTime >= 40 && (start > time || end <= time)){
                breakPoints.push(list[i]);
                disabledClass = "";
                if(end <= time){
                    disabledClass = 'disabled';
                }
                $(list[i]).after("<li class=\"break "+disabledClass+"\"><div class=\"time-info\">" +
                    "<div class=\"info\">Перерыв " + getDiffTime(difH, difM)+"</div>" +
                    "<div class=\"desc\"></div></div></li>");
            }
        }

        // for(let i = 0; i < breakPoints.length - 1; i++){
        //     let [h1, m1] = breakPoints[i].children[0].innerText.split(':');
        //     let end = parseInt(h1) * 60 + parseInt(m1);
        //
        //     $(breakPoints[i]).after("<li class=\"fantom-break "+disabledClass+"\"><div class=\"time-info\">" +
        //         "<div class=\"info\">Перерыв " + getDiffTime(0, 40)+"</div>" +
        //         "<div class=\"desc\"></div></div></li>");
        // }
    }

    function setDate() {

        apiObj.showTimetable(0);

        let listTo = [].slice.call($("#scheduleList0").get(0).children);
        let listFrom = [].slice.call($("#scheduleList1").get(0).children);

        let selected_item = listTo[0];
        let index = 0;
        let minDiffFromTime = 90000;
        let time = getCurrentTime();


        let timeInMins = time.getHours() * 60 + time.getMinutes();

        //Поиск и выделение элемента в таблице к технополису
        for (let i = 0; i < listTo.length; i++) {
            let li = listTo[i];
            let divTime = li.children[0];
            let divInfo = li.children[1];

            let [h, m] = divTime.innerText.split(':');

            let hm = parseInt(h) * 60 + parseInt(m);

            if (hm > timeInMins && minDiffFromTime > Math.abs(timeInMins - hm) && !$(li).hasClass('shadow')) {
                selected_item = li;
                index = i;
                minDiffFromTime = Math.abs(timeInMins - hm);
            }
        }

        if (minDiffFromTime === 90000) {

            $('#scheduleList0 li.warning').after("<li class=\"break fone next is-active\"><div class=\"time-info\">" +
                "<div class=\"info\">Рейсы закончились</div>" +
                "<div class=\"desc\">Воспользуйтесь общественным транспортом &#10095</div></div></li>");
        }
        let divTime = selected_item.children[0];
        let divInfo = selected_item.children[1];
        let [h, m] = divTime.innerText.split(':');


        let hourDiff = Math.floor(minDiffFromTime / 60);
        let minutsDiff = minDiffFromTime % 60;


        if (minDiffFromTime > 5 && minDiffFromTime <= 10) {
            //selected_item.className = "success";
            $(selected_item).addClass("success");
            divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
        }
        else {
            if (minDiffFromTime <= 5) {
                //selected_item.className = "alert";
                $(selected_item).addClass("alert");
                divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
            }
        }
        if(minDiffFromTime < 90000){
            $(selected_item).addClass("next");
        }


        if (index < listTo.length - 1 && ($(selected_item).hasClass('success') || $(selected_item).hasClass('alert'))) {
            let nextIndex = index + 1;
            while (nextIndex < listTo.length && $(listTo[nextIndex]).hasClass('shadow'))
                nextIndex++;
            if (nextIndex < listTo.length) {
                let nextTime = listTo[nextIndex].children[0];

                let [h, m] = nextTime.innerText.split(':');
                let nextTimeInMinutes = parseInt(h) * 60 + parseInt(m);
                let difMins = nextTimeInMinutes - timeInMins;
                while (difMins < 0) {
                    difMins += 24 * 60;
                }
                let hourDiff = Math.floor(difMins / 60);
                let minutsDiff = difMins % 60;

                divInfo.children[1].innerText = "Следующий за ним - через " + getDiffTime(hourDiff, minutsDiff);
            }
        }

        if($(selected_item).hasClass('warning')){
            divInfo.children[1].innerHTML = "Всегда есть другие варианты &#10095;";
            $(selected_item).addClass("anotherVariants");
        }


        if (index > 0) {
            [hv1, mi1] = listTo[index - 1].children[0].innerText.split(':');
            a = $(listTo[index]).hasClass('shadow');
            if (a) {
                [hv2, mi2] = listTo[index + 1].children[0].innerText.split(':');
            }
            else {
                [hv2, mi2] = listTo[index].children[0].innerText.split(':');
            }
            pereriv = mi2 - mi1 + hv2 * 60 - hv1 * 60;
        }
        else {
            pereriv = 200;
        }


        if (pereriv >= 40 && pereriv < 200) {
            $(selected_item).before("<li class=\"break fone is-active\"><div class=\"time-info\">" +
                "<div class=\"info\">Перерыв " + minDiffFromTime + " минут</div>" +
                "<div class=\"desc\">Воспользуйтесь общественным транспортом &#10095</div></div></li>");

            if (currentTableId === 0)
                $(".fone").show();
        }
        else {
            if (minDiffFromTime > 10 && minDiffFromTime < 40) {
                divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
                divInfo.children[1].innerHTML = "Всегда есть другие варианты &#10095;";
                $(selected_item).addClass("anotherVariants");
            }
        }

        //Поиск и выделение элемента в таблице к метро

        minDiffFromTime = 90000;
        index = 0;
        selected_item = listFrom[0];
        for (let i = 0; i < listFrom.length; i++) {
            let li = listFrom[i];
            let divTime = li.children[0];
            let divInfo = li.children[1];

            let [h, m] = divTime.innerText.split(':');

            let hm = parseInt(h) * 60 + parseInt(m);

            if (hm > timeInMins && minDiffFromTime > Math.abs(hm - timeInMins) && !$(li).hasClass('shadow')) {
                selected_item = li;
                index = i;
                minDiffFromTime = Math.abs(timeInMins - hm);
                // console.log(minDiffFromTime);
            }
        }
        if (minDiffFromTime === 90000) {

            $('#scheduleList1 li.warning').after("<li class=\"break fone is-active\"><div class=\"time-info\">" +
                "<div class=\"info\">Рейсы закончились</div>" +
                "<div class=\"desc\">Воспользуйтесь общественным транспортом &#10095</div></div></li>");
        }
        divTime = selected_item.children[0];
        divInfo = selected_item.children[1];


        hourDiff = Math.floor(minDiffFromTime / 60);
        minutsDiff = minDiffFromTime % 60;

        let pereriv;
        if (index > 0) {
            [hv1, mi1] = listFrom[index - 1].children[0].innerText.split(':');
            a = $(listFrom[index]).hasClass('shadow');
            if (a) {
                [hv2, mi2] = listFrom[index + 1].children[0].innerText.split(':');
            }
            else {
                [hv2, mi2] = listFrom[index].children[0].innerText.split(':');
            }

            pereriv = mi2 - mi1 + hv2 * 60 - hv1 * 60;
        }
        else {
            pereriv = 200;
        }

        if (pereriv >= 40 && pereriv < 200) {
            if(minDiffFromTime > 10) {
                $(selected_item).before("<li class=\"break ftwo is-active\"><div class=\"time-info\">" +
                    "<div class=\"info\">Перерыв " + getDiffTime(hourDiff, minutsDiff)+"т</div>" +
                    "<div class=\"desc\">Воспользуйтесь общественным транспортом &#10095</div></div></li>");

                if (currentTableId === 1) {
                    $(".ftwo").show();
                }
            }

        }
        else {
            //$(".break ftwo").remove();
            if (minDiffFromTime > 10 && minDiffFromTime < 40) {
                divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
                divInfo.children[1].innerHTML = "Всегда есть другие варианты &#10095;";
                $(selected_item).addClass("anotherVariants");
            }
        }

        if (minDiffFromTime > 5 && minDiffFromTime <= 10) {
            $(selected_item).addClass("success");
            //selected_item.className = "success";

            divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
        }
        else {
            if (minDiffFromTime <= 5) {
                $(selected_item).addClass("alert");
                //selected_item.className = "alert";
                divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
            }
        }
        if(minDiffFromTime < 90000){
            $(selected_item).addClass("next");
        }

        if (index < listFrom.length - 1 && ($(selected_item).hasClass('success') || $(selected_item).hasClass('alert'))) {
            let nextIndex = index + 1;
            let teta = !$(listFrom[nextIndex]).hasClass('shadow');
            while (nextIndex < listFrom.length && $(listFrom[nextIndex]).hasClass('shadow'))
                nextIndex++;
            if (nextIndex < listFrom.length) {
                let nextTime = listFrom[nextIndex].children[0];
                let [h, m] = nextTime.innerText.split(':');
                let nextTimeInMinutes = parseInt(h) * 60 + parseInt(m);
                let difMins = nextTimeInMinutes - timeInMins;
                while (difMins < 0) {
                    difMins += 24 * 60;
                }
                let hourDiff = Math.floor(difMins / 60);
                let minutsDiff = difMins % 60;

                divInfo.children[1].innerText = "Следующий за ним - через " + getDiffTime(hourDiff, minutsDiff);
            }

        }
        if($(selected_item).hasClass('warning')){
            divInfo.children[1].innerHTML = "Всегда есть другие варианты &#10095;";
            $(selected_item).addClass("anotherVariants");
        }

        addBreaks(listTo);
        addBreaks(listFrom);

        $('li.break.is-active').click(function () {
            $('#Third_page').trigger('click');
        });
        $('li.anotherVariants').click(function () {
            $('#Third_page').trigger('click');
        });
    }

    setDate();
    setInterval(setDate, 30000);
});