


document.addEventListener('DOMContentLoaded', function() {
    const phrases = [];

    document.getElementById('inputForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const inputValue = document.getElementById('userinput').value;

        if (inputValue) {
            phrases.push(inputValue);
            console.log(phrases);
        }
        
        document.getElementById('userinput').value = '';
    });
});