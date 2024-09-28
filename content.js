


document.addEventListener('DOMContentLoaded', function() {
    const phrases = JSON.parse(localStorage.getItem('phrases')) || [];;

    const listcontain = document.getElementById('phrases');

    const color_pick = document.getElementById('inputcolor');

    const random_color_pick = document.getElementById('randomcolor');

   
  

    document.getElementById('inputForm').addEventListener('submit', function(event) {

        event.preventDefault();

        const inputValue = document.getElementById('userinput').value;

        
        

        if (inputValue ) {

            
            dup = false;

            for (const pair of phrases) {
                if (pair.key == inputValue) {
                    dup = true;
                }
            }

            if (!dup) {

                let color = "#39ff14";


                if (random_color_pick.checked == false) {
                    color = color_pick.value;
                } else {
                    color = tinycolor.random().lighten(30).toHexString();
                }

                // if (random_color_pick.checked) {
                //     color = tinycolor.random().lighten(30).toHexString();
                // } else {
                //     color = tinycolor(color_pick).lighten(30).toHexString();
                // }
                phrases.push({key : inputValue, val : color});

                localStorage.setItem('phrases', JSON.stringify(phrases)); // Save to localStorage

                DisplayPhrases();
                //console.log(phrases);
                highlightPhrases(phrases);

            }

            
            // console.log(phrases);
            // DisplayPhrases();
        }

        document.getElementById('userinput').value = '';
    });

    document.getElementById('resetphrases').addEventListener('click', function() {
        localStorage.removeItem('phrases'); // Clear localStorage
        phrases.length = 0; // Clear the array
        DisplayPhrases(); // Update the display
        highlightPhrases(phrases);
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



    // function highlightPhrases() {
    //     const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    
    //     let node;
    //     while (node = walker.nextNode()) {
    //         phrases.forEach(phrase => {
    //             const regex = new RegExp(`(${phrase.key})`, 'gi');
    //             if (regex.test(node.nodeValue)) {
    //                 const span = document.createElement('span');
    //                 span.style.backgroundColor = phrase.val;
    //                 span.className = 'highlighted';
    //                 span.textContent = node.nodeValue.replace(regex, '$1');
                    
    //                 const range = document.createRange();
    //                 range.selectNodeContents(node);
    //                 range.deleteContents();
    //                 range.insertNode(span);
    //             }
    //         });
    //     }
    // }

    // function highlightPhrases() {
    //     // Clear existing highlights
    //     document.querySelectorAll('.highlighted').forEach(el => {
    //         el.outerHTML = el.innerHTML; // Remove highlighting
    //     });

    //     // Highlight new phrases
    //     phrases.forEach(phrase => {
    //         const regex = new RegExp(`(${phrase.key})`, 'gi');
    //         document.body.innerHTML = document.body.innerHTML.replace(regex, match => 
    //             `<span class="highlighted" style="background-color: ${phrase.val}">${match}</span>`
    //         );
    //     });
    // }


    function highlightPhrases(phrases) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    
        let node;
        while (node = walker.nextNode()) {
            phrases.forEach(phrase => {
                const regex = new RegExp(`(${phrase.key})`, 'gi');
                if (regex.test(node.nodeValue)) {
                    const span = document.createElement('span');
                    span.style.backgroundColor = phrase.val;
                    span.className = 'highlighted';
                    
                    // Split text node and insert highlighted spans
                    const parts = node.nodeValue.split(regex);
                    const fragment = document.createDocumentFragment();
    
                    parts.forEach(part => {
                        if (regex.test(part)) {
                            const highlightSpan = span.cloneNode();
                            highlightSpan.textContent = part;
                            fragment.appendChild(highlightSpan);
                        } else {
                            fragment.appendChild(document.createTextNode(part));
                        }
                    });
                    if (node.parentNode) {
                        node.parentNode.replaceChild(fragment, node);
                    }
                    
                }
            });
        }
    }

    DisplayPhrases();
    highlightPhrases(phrases);
});