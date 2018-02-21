/**
 * Модуль работы с гугл таблицами
 */

$(function googleApi() {

        class GoogleSpreadsheet {
            constructor(key, spreadsheetId) {
                this.key = key;
                this.spreadsheetId = spreadsheetId;
            }

            load(sheet, range, fun) {
                const googleUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheet}!${range}?key=${key}`;
                $.getJSON(googleUrl, fun);
            }
        }

        class API {
            constructor(tableViewer, googleSpreadsheet) {
                this.tableViewer = tableViewer;
                this.googleSpreadsheet = googleSpreadsheet;
                if (localStorage.length === 0 || localStorage.getItem(0) == null || localStorage.getItem(1) == null) {
                    //не трогать!
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
                        //this.showTimetable(0);
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
                    this.tableViewer.addInfoList(result);
                    //localStorage.setItem('info', JSON.stringify(result));

                });
                this.showTimetable(currentTableId);
                localStorage.setItem('DATE', Date());
            }

            /**
             * Обновление
             */
            updateStorage() {
                this.tableViewer.cleanTableList();
                this.saveToLocalStorage();
            }
            showTable(){
                let now = getCurrentTime();

                console.log(now);
                if(now.getDay() === 0 || now.getDay() === 6){
                    $('.js-weekend-splash').show();
                }
                this.showTimetable();
            }

            showTimetable() {
                this.tableViewer.addTableList(JSON.parse(localStorage.getItem(0)), 0);
                this.tableViewer.addTableList(JSON.parse(localStorage.getItem(1)), 1);
                //this.tableViewer.addTableList(JSON.parse(localStorage.getItem(id)), id);
            }
        }

        class TableViewer {
            constructor(timetableRowClass, infoClass) {
                this.timetableRowClass = timetableRowClass;
                this.infoClass = infoClass;
            }

            /**
             * Добавляет информанию из таблицы
             * @param {object}   infoJSON  Обьект
             * @param {string} infoClass Класс в который добавляем
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
            showNotification(){
                if (infoList.length === 0 && localStorage.getItem('info') != null) {
                   // infoList = JSON.parse(localStorage.getItem('info')).values;
                    infoList = ['', ''];
                }
                let notification = infoList[notificationNumber];
                if(notification[1].length + notification[0].length > 0 ) {
                    $("#output_notification").text(notification[1]);
                    $('#notification').show();
                }
            }



            /**
             * Add table list in timetable
             * @param   {object} timetableJSON     Data
             * @param   {string} timetableRowClass Table DOM class
             * @param   {number} id                Table list number
             */
            addTableList(timetableJSON, id) {

                let timetableRowHtmlString = "";

                let timetable = timetableJSON.values;
                let timeSort = {};
                timetable.shift();

                timetable.forEach(function (mins, i) {
                    let [hour, min] = mins[0].split(':');
                    mins.shift();
                    if (timeSort[hour] === undefined) timeSort[hour] = [];
                    timeSort[hour].push({min, mins});
                });

                function compareHour(a, b) {
                    if (a.hour > b.hour) return 1;
                    if (a.hour < b.hour) return -1;
                }

                function compareMin(a, b) {
                    if (a.min > b.min) return 1;
                    if (a.min < b.min) return -1;
                }

                //timeSort = timeSort.sort(compareHour);
                for (let i = 0; i < timeSort.length; i++) {
                    timeSort[i] = timeSort[i].sort(compareMin);
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
                            for (let i = 0; i < weekSelect.length; i++) {
                                if (weekSelect[i].length > 0)
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
                                else {
                                    disableClass = "disabled";
                                    specialInfo = "В ";
                                    for (let i = 0; i < weekSelect.length; i++) {
                                        if (weekSelect[i].length > 0) {
                                            specialInfo += inWeekDays[(i + 1) % 7] + " ";
                                        }
                                    }
                                }
                            }
                            timetableRowHtmlString += `<li class="${disableClass} ">
                                                <div class="time">${hour}:${timeSort[hour][index].min}</div>
                                                <div class="time-info">
                                                    <div class="info">${specialInfo}</div>
                                                    <div class="desc"></div>
                                                </div>
                                                 </li>`;
                        }
                    }

                }


                /**
                 * Добавляет строку минут в таблицу
                 * @param hour
                 * @param   {object} mins Массив пар (Минуты:День,Id:Часы)
                 * @returns {string} Строковое представление в таблице
                 */
                function getMinsHtmlString(hour, mins) {
                    let minsHtmlString = hour + ':' + mins[0].value;
                    // mins.forEach(function (min, i) {
                    //     minsHtmlString += `<div  class="timetable__min ${getDayClassName(min.mins)}">
                    // 				${hour}:${min.min}
                    // 			</div>`;
                    // });
                    return minsHtmlString;

                    /**
                     * Добавляет класс дня недели
                     * @param   {string} tableDayName Название дня недели в таблице exel
                     * @returns {string}   Класс дня недели
                     */
                    function getDayClassName(tableDayName) {
                        //console.log(tableDayName);
                        let minDaysClassNames = "";
                        // let daysExtendtion = [...days, "All"];
                        // let count = 0;
                        // for (let i = 0; i < tableDayName.length; i++) {
                        //     if (tableDayName[i] === "") {
                        //         count++;
                        //         continue;
                        //     }
                        //     minDaysClassNames += ' day-' + daysExtendtion[i];
                        // }
                        // if (count === 0) minDaysClassNames += ' day-All';
                        return minDaysClassNames;
                    }
                }

                let idTag = this.timetableRowClass + id;
                $(idTag).html(timetableRowHtmlString);

            }

            cleanTableList() {
                $(this.timetableRowClass + currentTableId).html("");
            }
        }

        googleSpreadsheet = new GoogleSpreadsheet(key, spreadsheetId);
        tableViewer = new TableViewer("#scheduleList", ".info-list");
        apiObj = new API(tableViewer, googleSpreadsheet);

        //setLanguage("ru");
    }
);