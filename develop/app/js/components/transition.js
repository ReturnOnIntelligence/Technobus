//iframe not loaded in hiding (Firefox), don't use hide on iframe
function transition1() {
    $('#first_alt_ways').hide();
    $('#second_alt_ways').hide();

    $('#first_scheme').css('height', '0');
    $('#second_scheme').css('height', '0');

    $('#timelineDirection').show();

    $('#First_page').addClass('is-active');
    $('#Second_page').removeClass('is-active');
    $('#Third_page').removeClass('is-active');
}

function transition2() {
    $('#timelineDirection').hide();
    $('.third_page').hide();
    $('#first_alt_ways').hide();
    $('#second_alt_ways').hide();

    $('#First_page').removeClass('is-active');
    $('#Second_page').addClass('is-active');
    $('#Third_page').removeClass('is-active');

    if (currentTableId == 0) {
        $('#first_scheme').show();
        $('#first_scheme').css('height', '');
        $('#second_scheme').css('height', '0');
    }
    else if (currentTableId == 1) {
        $('#second_scheme').show();
        $('#first_scheme').css('height', '0');
        $('#second_scheme').css('height', '');
    }

}

function transition3() {
    $('#timelineDirection').hide();

    $('#first_scheme').css('height', '0');
    $('#second_scheme').css('height', '0');

    $('#First_page').removeClass('is-active');
    $('#Second_page').removeClass('is-active');
    $('#Third_page').addClass('is-active');

    if (currentTableId == 0) {
        $('#first_alt_ways').show();
        $('#second_alt_ways').hide();
    }
    else if (currentTableId == 1) {
        $('#first_alt_ways').hide();
        $('#second_alt_ways').show();
    }

}