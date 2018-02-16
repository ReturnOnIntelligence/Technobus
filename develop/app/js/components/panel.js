/**
 * Модуль отрисовка боковой панели 
 */
// $(function(){
// 	(function(){
// 		let strDOM = "";
// 		days.forEach(function (day, i) {
// 			strDOM+= `<div class="panel--button panel--button-${i} day-${day}">
// 						<span name="${day}"></span>
// 					</div>`;
// 		});
// 		$(".panel").append(strDOM);
//
// 		days.forEach(function (day) {
// 			$(`.panel--button.day-${day}`).click(function () {
// 				console.log(day, " clicked");
// 				days.forEach(function (dayin) {
// 					$(`.timetable__min.day-${dayin}`).removeClass("spy");
// 					console.log(dayin, " removeClass")
// 				});
// 				$(`.timetable__min.day-${day}`).addClass("spy");
// 				console.log(day, " addClass");
// 				setTimeout(function(){
// 					days.forEach(function (dayin) {
// 					$(`.timetable__min.day-${dayin}`).removeClass("spy");
// 					console.log(dayin, " removeClass")
// 				});
// 				},3000);
//
// 			});
// 		});
// 	})();
//
// });