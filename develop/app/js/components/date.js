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
        if (hour > 0) {
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
        for (let i = 0; i < list.length - 1; i++) {

            if ($(list[i]).hasClass('disabled')) {
                continue;
            }
            let [h1, m1] = list[i].children[0].innerText.split(':');

            while (i + 1 < list.length && $(list[i + 1]).hasClass('disabled'))
                i++;
            if(i + 2 > list.length)
                continue;
            let [h2, m2] = list[i + 1].children[0].innerText.split(':');
            let start = parseInt(h1) * 60 + parseInt(m1);
            let end = parseInt(h2) * 60 + parseInt(m2);

            let differenceTime = end - start;
            let difH = Math.floor(differenceTime / 60);
            let difM = differenceTime % 60;

            if (differenceTime >= 40 && (start > time || end <= time)) {
                breakPoints.push(list[i]);
                disabledClass = "";
                if (end <= time) {
                    disabledClass = 'disabled';
                }
                $(list[i]).after("<li class=\"break " + disabledClass + "\"><div class=\"time-info\">" +
                    "<div class=\"info\">Перерыв " + getDiffTime(difH, difM) + "</div>" +
                    "<div class=\"desc\"></div></div></li>");
            }
            let difFromNow = end - time;
            let hourDiff = Math.floor(difFromNow / 60);
            let minutsDiff = difFromNow % 60;

            if (differenceTime >= 40 && start <= time && time < end && difFromNow > 10) {
                addActiveBreak(list[i + 1], hourDiff, minutsDiff);
            }
            else if (differenceTime < 40 && difFromNow > 10 && difFromNow < 40 && time < end && start <= time) {
                list[i + 1].querySelector('.info').innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
                list[i + 1].querySelector('.desc').innerHTML = "Всегда есть другие варианты &#10095;";
                $(list[i + 1]).addClass("anotherVariants");
            }
        }
    }

    //Вывод активного перерыва
    function addActiveBreak(selectedItem, hourDiff, minutsDiff) {
        $(selectedItem).before("<li class=\"break is-active\"><div class=\"time-info\">" +
            "<div class=\"info\">Перерыв " + getDiffTime(hourDiff, minutsDiff) + "</div>" +
            "<div class=\"desc\">Воспользуйтесь общественным транспортом &#10095</div></div></li>");

    }

    //Вывод уведомления по завершению рейсов
    function addBussOver(item) {
        $(item).after("<li class=\"break next is-active\"><div class=\"time-info\">" +
            "<div class=\"info\">Рейсы закончились</div>" +
            "<div class=\"desc\">Воспользуйтесь общественным транспортом &#10095</div></div></li>");
    }

    function setDate() {

        //Обновление и очистка таблицы расписания
        apiObj.showTimetable(0);

        let listTo = [].slice.call($("#scheduleList0").get(0).children);
        let listFrom = [].slice.call($("#scheduleList1").get(0).children);

        let selectedItem = listTo[0];
        let index = 0;
        let minDiffFromTime = 90000;
        let time = getCurrentTime();

        let lastLi = listTo.length - 1;
        while(lastLi > 0 && $(listTo[lastLi]).hasClass('disabled'))
           lastLi--;
        if(lastLi > 0) {
            $(listTo[lastLi]).addClass('warning');
        }
        lastLi = listFrom.length - 1;
        while(lastLi > 0 && $(listFrom[lastLi]).hasClass('disabled'))
            lastLi--;
        if(lastLi > 0) {
            $(listFrom[listFrom.length - 1]).addClass('warning');
        }
        let timeInMins = time.getHours() * 60 + time.getMinutes();

        //Поиск и выделение элемента в таблице к технополису
        for (let i = 0; i < listTo.length; i++) {
            let li = listTo[i];
            let divTime = li.children[0];
            let divInfo = li.children[1];

            let [h, m] = divTime.innerText.split(':');

            let hm = parseInt(h) * 60 + parseInt(m);

            if (hm > timeInMins && minDiffFromTime > Math.abs(timeInMins - hm) && !$(li).hasClass('disabled')) {
                selectedItem = li;
                index = i;
                minDiffFromTime = Math.abs(timeInMins - hm);
            }
        }


        if (minDiffFromTime === 90000) {
            addBussOver(listTo[listTo.length - 1]);
        }

        let divTime = selectedItem.children[0];
        let divInfo = selectedItem.children[1];
        let [h, m] = divTime.innerText.split(':');


        let hourDiff = Math.floor(minDiffFromTime / 60);
        let minutsDiff = minDiffFromTime % 60;



        if (minDiffFromTime > 5 && minDiffFromTime <= 10) {
            $(selectedItem).addClass("success");
            divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
        }
        else {
            if (minDiffFromTime <= 5) {
                $(selectedItem).addClass("alert");
                divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
            }
        }
        if (minDiffFromTime < 90000) {
            $(selectedItem).addClass("next");
        }


        if (index < listTo.length - 1 && ($(selectedItem).hasClass('success') || $(selectedItem).hasClass('alert'))) {
            let nextIndex = index + 1;
            while (nextIndex < listTo.length && $(listTo[nextIndex]).hasClass('disabled'))
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

        if ($(selectedItem).hasClass('warning')) {
            divInfo.children[1].innerHTML = "Всегда есть другие варианты &#10095;";
            $(selectedItem).addClass("anotherVariants");
        }


        //Поиск и выделение элемента в таблице к метро

        minDiffFromTime = 90000;
        index = 0;
        selectedItem = listFrom[0];
        for (let i = 0; i < listFrom.length; i++) {
            let li = listFrom[i];
            let divTime = li.children[0];
            let divInfo = li.children[1];

            let [h, m] = divTime.innerText.split(':');

            let hm = parseInt(h) * 60 + parseInt(m);

            if (hm > timeInMins && minDiffFromTime > Math.abs(hm - timeInMins) && !$(li).hasClass('disabled')) {
                selectedItem = li;
                index = i;
                minDiffFromTime = Math.abs(timeInMins - hm);

            }
        }

        if (minDiffFromTime === 90000) {
            addBussOver(listFrom[listFrom.length - 1]);
        }
        divTime = selectedItem.children[0];
        divInfo = selectedItem.children[1];


        hourDiff = Math.floor(minDiffFromTime / 60);
        minutsDiff = minDiffFromTime % 60;

        if (minDiffFromTime <= 5) {
            $(selectedItem).addClass("alert");
            divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
        } else {
            if (minDiffFromTime <= 10) {
                $(selectedItem).addClass("success");
                divInfo.children[0].innerText = 'Через ' + getDiffTime(hourDiff, minutsDiff);
            }
        }
        if (minDiffFromTime < 90000) {
            $(selectedItem).addClass("next");
        }

        if (index < listFrom.length - 1 && ($(selectedItem).hasClass('success') || $(selectedItem).hasClass('alert'))) {
            let nextIndex = index + 1;
            while (nextIndex < listFrom.length && $(listFrom[nextIndex]).hasClass('disabled'))
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
        if ($(selectedItem).hasClass('warning')) {
            divInfo.children[1].innerHTML = "Всегда есть другие варианты &#10095;";
            $(selectedItem).addClass("anotherVariants");
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