// /**
//  * Модуль карты
//  * @param {object} function ( Инициализация карты
//  */
// $(function () {
// 	/**
// 	 * Инициализация карты
// 	 */
// 	function init() {
// 		const places = {
// 			metro: [59.853876, 30.321102],
// 			technopolis: [59.818043, 30.327938],
//             metro1: [59.850127, 30.321772],
//             routeCenter: [59.835681, 30.322253]
// 		};
// 		let from = places.metro,
// 			to = places.technopolis;
// 		let myMap = new ymaps.Map('map', {
// 				center: places.metro,
// 				zoom: 16
// 			}, {
// 				searchControlProvider: 'yandex#search'
//
// 			}),
// 			myPlacemark = new ymaps.Placemark(myMap.getCenter());
//
// 		myMap.geoObjects.add(myPlacemark);
//         let myRoute;
//
//         function addRoute(from,to){
//             ymaps.route([
//             {
//                 point: from,
//                 type: 'viaPoint'
//             },
//             to,
//             ]).then(function (route) {
//                         myMap.geoObjects.add(myRoute = route);
//
//         }, function (error) {
//             console.error('Возникла ошибка: ' + error.message);
//             })
//         }
//         let routeButton = new ymaps.control.Button('<i class="fa fa-bus" style="color: dimgray"></i>');
//
//
//         routeButton.events
//             .add('select', function () {
//             addRoute(from,to);
//             myMap.setZoom(12);
//             myMap.setCenter(places.routeCenter);
//         })
//             .add('deselect', function () {
//             myRoute && myMap.geoObjects.remove(myRoute);
//         });
//
//
//         myMap.controls.add(routeButton, {float: 'left', maxWidth: 'auto'});
//
// 		myPlacemark.events
// 			.add('mouseenter', function (e) {
// 				// Ссылку на объект, вызвавший событие,
// 				// можно получить из поля 'target'.
// 				e.get('target').options.set('preset', 'islands#greenIcon');
// 			})
// 			.add('mouseleave', function (e) {
// 				e.get('target').options.unset('preset');
// 			});
//
//        function changeRoute(){
//             if (routeButton.isSelected()) {
//                 myRoute && myMap.geoObjects.remove(myRoute);
//                 addRoute(from,to);
//             }
//         }
//
// 		// $(".from_technopolis").click(function () {
// 		// 	myMap.setCenter(places.technopolis);
//          //    myPlacemark.geometry.setCoordinates(myMap.getCenter());
//          //    from = places.technopolis;
//          //    to= places.metro1;
//          //    changeRoute();
//          //    myMap.setZoom(16);
// 		// });
//         //
// 		// $(".to_technopolis").click(function () {
// 		// 	myMap.setCenter(places.metro);
// 		// 	myPlacemark.geometry.setCoordinates(myMap.getCenter());
//          //    from=places.metro;
//          //    to=places.technopolis;
//          //    changeRoute();
//          //    myMap.setZoom(16);
// 		// });
//
//
// 	}
//
// 	//ymaps.ready(init);
//
// });
const places = {
    metro: [59.854606, 30.320864],
    technopolis: [59.817998, 30.328237],
};

function showMap() {
    if (navigator.onLine) {
        $('#first_scheme').find('#map0').html('<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A55e0e63b17daab5b3dcd5b216d61836c4e09fd41632fa603e14699952d0c4999&amp;source=constructor" width="100%" height="300" frameborder="0"></iframe>');
        $('#second_scheme').find('#map1').html('<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A012d53561df0d3b05b5008c893055936da12d10e84e16681cf71165ceaa517e7&amp;source=constructor" width="100%" height="300" frameborder="0"></iframe>');
    }
    else {
        $('#first_scheme').find('#map0').html('<img id="cache-0map" src="assets/images/0map_cache.png" height="300" width="600" alt="Карта">');
        $('#second_scheme').find('#map1').html('<img id="cache-1map" src="assets/images/1map_cache.png" height="300" width="600" alt="Карта">');
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
});