


document.addEventListener('DOMContentLoaded', function() {
    const phrases = [];

    const listcontain = document.getElementById('phrase_vector');

    const color_pick = document.getElementById('inputcolor');

    const random_color_pick = document.getElementById('randomcolor');

    document.getElementById('inputForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const inputValue = document.getElementById('userinput').value;

        
        

        if (inputValue ) {
            const dup = false;

            for (const pair of phrases) {
                if (pair.key == inputValue) {
                    dup = true;
                }
            }

            if (!dup) {

                let color;

                if (random_color_pick.checked) {
                    color = tinycolor.random().lighten(30).toHexString();
                } else {
                    color = tinycolor(color_pick).lighten(30).toHexString();
                }
                phrases.push({key : inputValue, val : color});

            }

            
            console.log(phrases);
            DisplayPhrases();
        }

        document.getElementById('userinput').value = '';
    });


    function DisplayPhrases() {
        listcontain.innerHTML = '';

        phrases.forEach((phrase) => {
            const div = document.createElement('div');
            //div.textContent = phrase.key;
            div.className = "user phrase and color";

            const colorbox = document.createElement('div');
            colorbox.className = "colorbox";
            colorbox.style.backgroundColor = phrase.val;
            

            const word = document.createTextNode(phrase.key);


            div.appendChild(colorbox);
            div.appendChild(word);
            listcontain.appendChild(div);
        });
    }
});