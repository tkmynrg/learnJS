import '../scss/app.scss';


$(document).ready(function() {
    let counterElement = $('#counter');

    $('.plus').click(function() {
        let currentValue = parseInt(counterElement.val());
        counterElement.val(currentValue + 1);
    })

    $('.minus').click(function() {
        let currentValue = parseInt(counterElement.val());
        counterElement.val(currentValue - 1);
    })
});