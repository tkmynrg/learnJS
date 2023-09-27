import '../scss/app.scss';

$(document).ready(function() {
    $('.shortener__url-input .text-input__control').on('focus', function() {
        $(this).closest('.shortener__url-input').addClass('input__focused');
    });

    $('.shortener__url-input .text-input__control').on('blur', function() {
        $(this).closest('.shortener__url-input').removeClass('input__focused');
    });

    $('.text-input__control').on('input', function() {
        // Обновление значения атрибута value
        var value = $(this).val();
        $(this).attr('value', value);

        // Получение кнопки
        var $button = $(this).closest('.shortener__url-input').find('button');

        // Добавление или удаление класса disabled
        if(value.trim() === '') {
            $button.addClass('disabled');
        } else {
            $button.removeClass('disabled');
        }
    });
});