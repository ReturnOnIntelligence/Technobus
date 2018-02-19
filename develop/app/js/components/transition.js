function transition1(){
    $('#first_alt_ways').hide();
    $('#second_alt_ways').hide();
    $('#first_scheme').hide();
    $('#second_scheme').hide();
    $('#timelineDirection').show();
    $('#first_alt_ways').hide();
    $('#second_alt_ways').hide();
    $('#First_page').attr('class', 'is-active');
    $('#Second_page').attr('class', '');
    $('#Third_page').attr('class', '');
}

function transition2(){
    $('#notification').hide();
    $('#timelineDirection').hide();
    $('.third_page').hide();
    $('#first_alt_ways').hide();
    $('#second_alt_ways').hide();
    $('#First_page').attr('class', '');
    $('#Second_page').attr('class', 'is-active');
    $('#Third_page').attr('class', '');

    if (currentTableId == 0){
        $('#first_scheme').show();
        $('#second_scheme').hide();
    }
    else if (currentTableId == 1){
        $('#first_scheme').hide();
        $('#second_scheme').show();
    }

}

function transition3(){
    $('#notification').hide();
    $('#timelineDirection').hide();
    $('#first_scheme').hide();
    $('#second_scheme').hide();
    $('#First_page').attr('class', '');
    $('#Second_page').attr('class', '');
    $('#Third_page').attr('class', 'is-active');

    if (currentTableId == 0){
        $('#first_alt_ways').show();
        $('#second_alt_ways').hide();
    }
    else if (currentTableId == 1){
        $('#first_alt_ways').hide();
        $('#second_alt_ways').show();
    }

}