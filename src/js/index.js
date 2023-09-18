// import '../scss/app.scss';

function isPalindrome(str) {
    let length = str.length;

    for (let i = 0; i < (length / 2); i++) {
        if (str[i] !== str[length - i - 1]) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome('123322'));