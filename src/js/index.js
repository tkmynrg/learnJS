import '../scss/app.scss';

$(document).ready(function() {
    $('.button').click(function() {
        $('body').addClass('popup-show');
    });

    $('.close').click(function() {
        $('body').removeClass('popup-show');
    });
});