import '../scss/app.scss';

$(document).ready(function() {
    let $minValueInput = $('[data-min-value]');
    let $maxValueInput = $('[data-max-value]');
    let $resultDiv = $('.random__result');
    let $generateButton = $('.generate-button');

    $generateButton.click(function() {
        let min = parseInt($minValueInput.val(), 10);
        let max = parseInt($maxValueInput.val(), 10);
        let result = Math.floor(Math.random() * (max - min + 1)) + min;
        $resultDiv.text(result);
    });
});