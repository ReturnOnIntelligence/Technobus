/**
 * Модуль работы с гугл таблицами
 */

$(function googleApi() {

        /**
         * Класс содержащий информацию о google sheets и интерфейс для загрузки данных из неё
         */
        class GoogleSpreadsheet {
            constructor(key, spreadsheetId) {
                this.key = key;
                this.spreadsheetId = spreadsheetId;
            }

            /**
             * Интерфейс для загрузки данных из google sheets
             * @param sheet String
             * @param range String
             * @param fun function
             */
            load(sheet, range, fun) {
                const googleUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheet}!${range}?key=${key}`;
                $.getJSON(googleUrl, fun);
            }
        }

        /**
         * Класс для управления сохранением данных в localStorage, отображения таблицы расписания,
         * вызова события для отображения уведомлений
         */
        class API {
            constructor(tableViewer, googleSpreadsheet) {
                this.tableViewer = tableViewer;
                this.googleSpreadsheet = googleSpreadsheet;
                if (localStorage.length === 0 || localStorage.getItem(0) == null || localStorage.getItem(1) == null) {
                    //Синхронная загрузка данных
                    $.ajaxSetup({
                        async: false
                    });
                    this.saveToLocalStorage();
                    $.ajaxSetup({
                        async: true
                    });
                } else {
                    if (navigator.onLine) {
                        this.saveToLocalStorage();
                        this.updateStorage();
                    }
                    try {
                        this.showTable();
                    } catch (err) {
                        console.error("showTimetable: ", err);
                    }
                }
            }

            /**
             * Запрашивает с апи гугла таблицу по урлу
             * @param sheet
             * @param range
             * @param {function} fun Что с ней делает
             */
            googleSpreadsheetLoad(sheet, range, fun) {
                this.googleSpreadsheet.load(sheet, range, function (result) {
                    fun(result);
                });
            }

            /**
             * Сохранение расписания в локальное хранилище
             */
            saveToLocalStorage() {
                this.googleSpreadsheetLoad(ToTecnopolis, rangeTo, (result) => {
                    localStorage.setItem(0, JSON.stringify(result));
                });
                this.googleSpreadsheetLoad(FromTechnopolis, rangeFrom, (result) => {
                    localStorage.setItem(1, JSON.stringify(result));
                });
                this.googleSpreadsheetLoad(Info, InfoRange, (result) => {
                    localStorage.setItem('info', JSON.stringify(result));
                    this.tableViewer.addInfoList(result);
                });
                this.showTimetable(currentTableId);
                localStorage.setItem('DATE', Date());
            }

            /**
             * Обновление данных в локальном хранилмще
             */
            updateStorage() {
                this.tableViewer.cleanTableList();
                this.saveToLocalStorage();
            }

            /**
             * Первичное отображение расписания с проверкой дня недели
             * Если день недели вызодной, то выводиться weekend-splash
             */
            showTable() {
                let now = getCurrentTime();
                $('.js-weekend-splash').hide();
                if (now.getDay() === 0 || now.getDay() === 6) {
                    $('.js-weekend-splash').show();
                }
                this.showTimetable();
            }

            /**
             * Отображает расписания, сохраненные в локальном хранилище в таблице
             */
            showTimetable() {
                this.tableViewer.addTableList(JSON.parse(localStorage.getItem(0)), 0);
                this.tableViewer.addTableList(JSON.parse(localStorage.getItem(1)), 1);
            }
        }

        /**
         * Класс для отображения данных в таблице расписания
         */
        class TableViewer {
            constructor(timetableRowClass) {
                this.timetableRowClass = timetableRowClass;
            }

            /**
             * Добавляет уведомления в infoList и вызывает отображение этого уведомления
             * @param {object}   infoJSON  Обьект
             */
            addInfoList(infoJSON) {
                let notifications = infoJSON.values;
                notifications.shift();
                infoList = notifications;
                this.showNotification();
            }

            /**
             * Отображает уведомление
             */
            showNotification() {
                if (infoList.length === 0 && localStorage.getItem('info') != null) {
                    if (localStorage.getItem('info') != null) {
                        infoList = JSON.parse(localStorage.getItem('info')).values;
                    }
                    else {
                        infoList = [['', '']];
                    }
                }
                let notification = infoList[notificationNumber];

                if (notification.length > 1 && notification[1].length + notification[0].length > 0) {
                    $("#output_notification").text(notification[1]);
                    $('#notification').show();
                }
            }


            /**
             * Отображает расписание в таблице
             * @param   {object} timetableJSON     Data
             * @param   {number} id                Table list number
             */
            addTableList(timetableJSON, id) {

                let timetableRowHtmlString = "";

                let timetable = timetableJSON.values;
                let timeSort = {};
                timetable.shift();

                //создаем асоциативный массив где ключ это час, а значение массив минут
                timetable.forEach(function (mins, i) {
                    let [hour, min] = mins[0].split(':');
                    mins.shift();
                    if (timeSort[hour] === undefined) timeSort[hour] = [];
                    timeSort[hour].push({min, mins});
                });

                function compareMin(a, b) {
                    if (a.min > b.min) return 1;
                    if (a.min < b.min) return -1;
                }

                //сортируем массивы минут

                for(let item in timeSort){
                    timeSort[item] = timeSort[item].sort(compareMin);
                }

                if (id === 0)
                    sortedTimeLists.to = timeSort;
                else
                    sortedTimeLists.from = timeSort;

                for (hour in timeSort) {
                    for (index in timeSort[hour]) {
                        if (hour !== "" && timeSort[hour][index].min !== "") {
                            let weekCount = 0;
                            let weekSelect = timeSort[hour][index].mins;
                            for (let i = 0; i < 5; i++) {
                                if (weekSelect.length > i && weekSelect[i].length > 0)
                                    weekCount++;
                            }
                            let disableClass = "";
                            let specialInfo = "";
                            if (weekCount < 5) {
                                let now = getCurrentTime();
                                let weekDayNumber = now.getDay();

                                let itIsSuperLongIteratorButInVeryUseful = (weekDayNumber + 6) % 7;
                                if (weekSelect[itIsSuperLongIteratorButInVeryUseful] && weekSelect[itIsSuperLongIteratorButInVeryUseful].length > 0) {
                                    disableClass = 'redline';
                                    specialInfo = "Только сегодня";
                                }
                                else if(weekCount > 0){
                                    disableClass = "disabled";
                                    specialInfo = "В ";
                                    for (let i = 0; i < weekSelect.length; i++) {
                                        if (weekSelect[i].length > 0) {
                                            specialInfo += inWeekDays[(i + 1) % 7] + " ";
                                        }
                                    }
                                }
                            }
                            if(timeSort[hour][index].mins.length > 7 && timeSort[hour][index].mins[7].length > 0){
                                disableClass = "disabled";
                                specialInfo = "Отменен сегодня";
                            } else if(timeSort[hour][index].mins.length > 8 && timeSort[hour][index].mins[8].length > 0) {
                                disableClass = 'redline';
                                specialInfo = "Только сегодня";
                            }

                            timetableRowHtmlString += `<li class="${disableClass}">
                                                <div class="time">${hour}:${timeSort[hour][index].min}</div>
                                                <div class="time-info">
                                                    <div class="info">${specialInfo}</div>
                                                    <div class="desc"></div>
                                                </div>
                                                 </li>`;
                        }
                    }

                }

                //Вывод сгенерированной таблицы
                let idTag = this.timetableRowClass + id;
                $(idTag).html(timetableRowHtmlString);

            }

            cleanTableList() {
                $(this.timetableRowClass + currentTableId).html("");
            }
        }

        googleSpreadsheet = new GoogleSpreadsheet(key, spreadsheetId);
        tableViewer = new TableViewer("#scheduleList");
        apiObj = new API(tableViewer, googleSpreadsheet);
    }
);