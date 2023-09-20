import '../scss/app.scss';

$(document).ready(function() {
    let copyText = document.getElementById("myInput");
    let copyBtn = document.getElementById("myButton");

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(copyText.value);
            alert('Text successfully copied');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});