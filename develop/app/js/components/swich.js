// /**
//  * Модуль установки событий работы с свичём
//  */
// // $(function () {
// //     $(".russian").button('toggle');
// //     $(".russian").click(function () {
// //         setLanguage("ru");
// //         $('#map').attr('lang','ru');
// //     });
// // 	$(".russian").click();
// //     $(".english").click(function () {
// //         setLanguage("en");
// //         $('#map').attr('lang','en');
// //     });
// // 	$(".lang").addClass("btn-group-vertical");
// // 	$(".lang").removeClass("btn-group");
// //     $(".to_technopolis").button('toggle');
// // 	$(".to_technopolis").click(function () {
// // 			$("#route0").css("visibility", "visible");
// // 			$("#route0").css("position", "initial");
// // 			$("#route1").css("visibility", "hidden");
// // 			$("#route1").css("position", "absolute");
// //     });
// // 	$(".from_technopolis").click(function () {
// //         $("#route0").css("visibility", "hidden");
// // 			$("#route0").css("position", "absolute");
// // 			$("#route1").css("visibility", "visible");
// // 			$("#route1").css("position", "initial");
// //     });
// // });
// $(function switchs() {
//
//     $("#toTechn").click(function () {
//         currentTableId = 0;
//         $("#toTechn").addClass("is-active");
//         $("#toMetro").removeClass("is-active");
//         $("#timelineDirection").removeClass("tube");
//         $("#scheduleList1").hide();
//         $("#scheduleList0").show();
//
//         // let b = $("#scheduleList0 .success");
//         // if(b.length == 0){
//         //     b = $("#scheduleList0 .alert");
//         // }
//         // if(b.length == 0){
//         //     b = $("#scheduleList0 .next");
//         // }
//         // console.log(b);
//         //$('#timelineDirection').animate({scrollTop: b.offset().top-100});
//
//         let sl = document.querySelector("#scheduleList0 .succes");
//         if (!sl) {
//             sl = document.querySelector("#scheduleList0 .alert");
//         }
//         if (!sl) {
//             sl = document.querySelector("#scheduleList0 .next");
//         }
//
//         $('#timelineDirection').animate({scrollTop: $("#scheduleList0 li.next").offset().top - $("#scheduleList0").offset().top - 60});
//
//     });
//
//     $("#toMetro").click(function () {
//         currentTableId = 1;
//         $("#toMetro").addClass("is-active");
//         $("#toTechn").removeClass("is-active");
//         $("#timelineDirection").addClass("tube");
//         $("#scheduleList1").show();
//         $("#scheduleList0").hide();
//
//         // let b = $("#scheduleList1 .success");
//         // if(b.length == 0){
//         //     b = $("#scheduleList1 .alert");
//         // }
//         // if(b.length == 0){
//         //     b = $("#scheduleList1 .next");
//         // }
//
//         //$('#timelineDirection').animate({scrollTop: b.offset().top-100});
//
//
//         $('#timelineDirection').animate({scrollTop: $("#scheduleList1 li.next").offset().top - $("#scheduleList1").offset().top - 60});
//     });
// });
