function changeBreakMod() {
    isBreakVisible = !isBreakVisible;
}
function setMenuActions() {

    var els = $(".timeline > li:not(.break)");
// Trigger action when the contexmenu is about to be shown
    $(".timeline > li:not(.break)").bind("contextmenu", function (event) {

        // Avoid the real one
        event.preventDefault();

        // Show contextmenu
        // console.log(event.screenY + " : " + event.screenX);
         var dy = event.pageY;
         if(dy +  35 > window.innerHeight){
             dy = window.innerHeight - 35;
         }
         var dx = event.pageX;
        if(dx +  100 > window.innerWidth){
            dx = window.innerWidth - 200;
        }
        $(".context-menu").finish().toggle(100).

        // In the right position (the mouse)

        css({
            top: dy  + "px",
            left: dx + "px"
        });
        selectedTime = this;
    });


// If the document is clicked somewhere
    $(".timeline > li:not(.break)").bind("mousedown", function (e) {

        // If the clicked element is not the menu
        if (!$(e.target).parents(".context-menu").length > 0) {

            // Hide it
            $(".context-menu").hide(100);
            selectedTime = undefined;
        }
    });

        
// If the menu element is clicked
    $(".context-menu li").click(function(){

        // This is the triggered action name
        switch($(this).attr("data-action")) {

            // A case for each action. Your actions here
            case "first": setPushNotification(selectedTime); break;
            // case "second": changeBreakMod();
            //
            //                 if(isBreakVisible){
            //                     $(".context-menu > li[data-action = 'second']").text("Скрыть перерывы");
            //                 }
            //                 else {
            //                     $(".context-menu > li[data-action = 'second']").text("Показать перерывы");
            //                 }
            //
            //                 break;
        }

        // Hide it AFTER the action was triggered

        $(".context-menu").hide(100);
    });

}


