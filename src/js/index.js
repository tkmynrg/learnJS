import '../scss/app.scss';

$(document).ready(function() {
    function countVowels(str) {

        let count = 0;
        const loverStr = str.toLowerCase();
        const vowels = 'ауоиэыяюеё';

        for (let i = 0; i < loverStr.length; i++) {
            if (vowels.includes(loverStr[i])) {
                count++
            }
        }

        return count;

    }
    console.log(countVowels('Шла саша по шоссе и сосала сушку'))
});