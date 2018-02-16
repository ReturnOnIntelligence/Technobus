/**
 * Модуль карты
 * @param {object} function ( Инициализация карты
 */
$(function () {
	/**
	 * Инициализация карты
	 */
	function init() {
		const places = {
			metro: [59.853876, 30.321102],
			technopolis: [59.818043, 30.327938],
            metro1: [59.850127, 30.321772],
            routeCenter: [59.835681, 30.322253]
		};
		let from = places.metro,
			to = places.technopolis;
		let myMap = new ymaps.Map('map', {
				center: places.metro,
				zoom: 16
			}, {
				searchControlProvider: 'yandex#search'
                
			}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter());

		myMap.geoObjects.add(myPlacemark);
        let myRoute; 

        function addRoute(from,to){
            ymaps.route([
            {
                point: from,
                type: 'viaPoint'
            },
            to,
            ]).then(function (route) {
                        myMap.geoObjects.add(myRoute = route);
                
        }, function (error) {
            console.error('Возникла ошибка: ' + error.message);
            })
        }
        let routeButton = new ymaps.control.Button('<i class="fa fa-bus" style="color: dimgray"></i>');
        
    
        routeButton.events
            .add('select', function () { 
            addRoute(from,to);
            myMap.setZoom(12);
            myMap.setCenter(places.routeCenter);     
        })
            .add('deselect', function () { 
            myRoute && myMap.geoObjects.remove(myRoute);
        });
        
        
        myMap.controls.add(routeButton, {float: 'left', maxWidth: 'auto'});
        
		myPlacemark.events
			.add('mouseenter', function (e) {
				// Ссылку на объект, вызвавший событие,
				// можно получить из поля 'target'.
				e.get('target').options.set('preset', 'islands#greenIcon');
			})
			.add('mouseleave', function (e) {
				e.get('target').options.unset('preset');
			});

       function changeRoute(){
            if (routeButton.isSelected()) {
                myRoute && myMap.geoObjects.remove(myRoute);
                addRoute(from,to);
            }
        }
        
		// $(".from_technopolis").click(function () {
		// 	myMap.setCenter(places.technopolis);
         //    myPlacemark.geometry.setCoordinates(myMap.getCenter());
         //    from = places.technopolis;
         //    to= places.metro1;
         //    changeRoute();
         //    myMap.setZoom(16);
		// });
        //
		// $(".to_technopolis").click(function () {
		// 	myMap.setCenter(places.metro);
		// 	myPlacemark.geometry.setCoordinates(myMap.getCenter());
         //    from=places.metro;
         //    to=places.technopolis;
         //    changeRoute();
         //    myMap.setZoom(16);
		// });


	}

	//ymaps.ready(init);

});