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

    $('.shortener__url-input button').on('click', function(e) {
        e.preventDefault(); // Предотвращаем стандартное действие кнопки, если оно есть.

        // Проверяем, не имеет ли кнопка класс disabled. Если имеет, то выходим из функции.
        if($(this).hasClass('disabled')) return;

        // Генерируем случайную строку длиной от 6 до 20 символов
        var randomLength = Math.floor(Math.random() * (20 - 6 + 1)) + 6;
        var randomString = generateRandomString(randomLength);

        // Формируем полную ссылку
        var shortLink = 'https://shortened.com/' + randomString;

        // Подставляем сгенерированную ссылку в .shortener__short-link-text
        $(this).closest('.shortener').find('.shortener__short-link-text').text(shortLink);

        // Находим ближайший элемент .shortener__card и добавляем ему класс visible.
        $(this).closest('.shortener').find('.shortener__card').addClass('visible');
    });

    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
});