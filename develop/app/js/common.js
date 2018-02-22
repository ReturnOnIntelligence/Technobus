/**
Константы и глобальные переменные
 **/
const days = ['monday', 'tuesday', 'tednesday', 'thursday', 'friday', 'saturday','sunday'];
const fullDays = ['fullMonday', 'fullTuesday', 'fullTednesday', 'fullThursday', 'fullFriday', 'fullSaturday','fullSunday'];
const inWeekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среду', 'Четверг', 'Пятницу', 'Субботу']

var currentTableId = 0;
var currentWindow = 1;
var googleSpreadsheet;
var tableViewer;
var apiObj;
var  infoList = [];
var sortedTimeLists = { 'to' : [], 'from' : []};
var notificationNumber = 0;

var isLoadedMaps = false;

//Параметр для включения геолокации
const isGeoLocationOn = true;

//Api key from Google Api Console
const key = "AIzaSyAl9aZAZCbOAYhUl0RH57S9cnAPMnG3LLs";
//spreadsheetId идентификатор таблицы
const spreadsheetId = "10db0NtOmOC5TLw0WBuzFCGtoVa1GaFYDeUqIADh6p1E";

//Параметры для запросов
const ToTecnopolis = "To Technopolis";
const rangeTo = "A:J";

const FromTechnopolis = "From Technopolis";
const rangeFrom = "A:J";

const Info = "Info";
const InfoRange = "A:B";

const spesialRange = "I:J";

//global application time
function getCurrentTime() {
    let now = new Date();
    // now.setHours(15);
    // now.setMinutes(35);
    return now;
}


    