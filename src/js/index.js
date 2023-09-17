import '../scss/app.scss';

$(document).ready(function() {
    function generateHexColor() {
        let hexColor = '#';
        let hexValues = '0123456789ABCDEF';

        for (let i = 0; i < 6; i++) {
            hexColor += hexValues[Math.floor(Math.random() * 16)];
        }
        return hexColor;
    }
    let degrees = 0;

    // Обработчик нажатия на кнопку
    $('#generateButton').click(function() {
        let color = generateHexColor();
        let hexCode = $('#hexCode');

        $('#colorContainer').css('background-color', color);

        hexCode.text === '' ? hexCode.hide() : hexCode.show();
        hexCode.text(color);

        degrees += -360;

        $(this).css({
            'transition': 'transform 0.8s cubic-bezier(.55,.26,.94,.53)',
            'transform': `rotate(${degrees}deg)`
        });
    });
});