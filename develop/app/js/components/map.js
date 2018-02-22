/**
 * Модуль карты
 */
//Координаты остановок
const places = {
    metro: [59.854606, 30.320864],
    technopolis: [59.817998, 30.328237],
    tcMetro: [59.824892, 30.323428],
    metroAlt: [59.848758, 30.321244],
};

//Отображение карт
function showMap() {
    if (navigator.onLine) {
        $('#cache-0map').hide();
        $('#cache-1map').hide();
        $('#first_scheme').find('#map0').html('<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A55e0e63b17daab5b3dcd5b216d61836c4e09fd41632fa603e14699952d0c4999&amp;source=constructor" width="100%" height="300" frameborder="0"></iframe>');
        $('#second_scheme').find('#map1').html('<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A012d53561df0d3b05b5008c893055936da12d10e84e16681cf71165ceaa517e7&amp;source=constructor" width="100%" height="300" frameborder="0"></iframe>');
        isLoadedMaps = true;
    }
    else {
        $('#cache-0map').show();
        $('#cache-1map').show();
    }
}
$(function () {
    $('.map-link-metro').click(function () {
        if (navigator.onLine) {
            window.open('http://maps.apple.com/?q=' + places.metro[0] + ',' + places.metro[1]);
        }
    });

    $('.map-link-tech').click(function () {
        if (navigator.onLine) {
            window.open('http://maps.apple.com/?q=' + places.technopolis[0] + ',' + places.technopolis[1]);
        }
    });

    $('.map-link-metro-alt').click(function () {
        if (navigator.onLine) {
            window.open('http://maps.apple.com/?q=' + places.metroAlt[0] + ',' + places.metroAlt[1]);
        }
    });
    $('.map-link-tech-tc').click(function () {
        if (navigator.onLine) {
            window.open('http://maps.apple.com/?q=' + places.tcMetro[0] + ',' + places.tcMetro[1]);
        }
    });
});