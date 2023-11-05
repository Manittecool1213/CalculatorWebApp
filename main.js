/*
Reason for using DOMContentLoaded event listener:
- For adding event listeners for events such as button clicks, elements need to be identified and selected.
- Sometimes, the script may search for the element before the HTML has been loaded completely.
- Adding this event listener solves this problem, by waiting for HTML to complete loading before the following steps.
*/
document.addEventListener('DOMContentLoaded', function() {
    // --- BASIC FUNCTIONALITY: ---

    var screenElement = document.querySelector('.screen');
    var buttonContainer = document.querySelector('.button-container');

    function updateScreen(newContent) {
        screenElement.textContent += newContent;
    }

    buttonContainer.addEventListener('click', function(event) {
        // Only some classes of buttons should cause their text to directly be displayed on screen on click.
        if(event.target.classList.contains('number') || event.target.classList.contains('operator') || event.target.id === 'buttonPERIOD') {
            var buttonText = event.target.textContent;
            updateScreen(buttonText);
        }

        // Equals button:
        if(event.target.id === 'buttonEQUALS') {
        // '===' has been used here instead of '==' for strong comparison. '===' also checks whether the two operands have the same datatype.
            equals();
        }

        // Delete button:
        if(event.target.id === 'buttonDEL') {
            del();
        }

        // Clear Screen button:
        if(event.target.id === 'buttonAC') {
            clear();
        }
    })

    // --- END OF BASIC FUNCTIONALITY ---



    // --- KEYBOARD SUPPORT: ---

    document.addEventListener('keydown', function(event) {
        var keyPressed = event.key;

        switch(keyPressed) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
            case '+':
            case '-':
            case '*':
                updateScreen(keyPressed);
                break;

            case '/':
                event.preventDefault();
                /*
                QuickFind Issue:
                - By default, pressing the '/' key on firefox opens a quick find menu, which causes the focus to be shifted away from the calculator.
                - The user would then have to manually close the menu every single time to perform division, which is a hassle.
                - To avoid this, the preventDefault() function is used.
                */

                updateScreen(keyPressed);
                break;

            case 'Enter':
            case ' ':
            case '=':
                equals();
                break;

            case 'Backspace':
            case 'Delete':
                del();
                break;

            case 'Escape':
                clear();
                break;

            case 'e':
                window.open('https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=c3bcbf663f594eef', '_blank')
        }
    })

    // --- END OF KEYBOARD SUPPORT ---



    // --- FUNCTIONALITY FOR MISCELAENOUS BUTTONS: ---

    // Equals button:
    function equals() {
        var operationString = screenElement.textContent.trim();

        screenElement.textContent = ''
        // Need to clear screen before answer is displayed.

        var evaluatedAnswer;
        try {
            evaluatedAnswer = eval(operationString);
            // The eval function find the value of a valid arithmetic expression automatically, thereby removing the need of creating a set of BODMAS rules manually.

            updateScreen(evaluatedAnswer);
        } catch (error) {
            evaluatedAnswer = 'INVALID EXPRESSION!';
            updateScreen(evaluatedAnswer);

            setTimeout(function() {
                screenElement.textContent = '';
            }, 1000);
            // The screen is reset 1 second after the 'Invalid Expression' message is shown.
        }
    }

    // Delete button:
    function del() {
        var modifiedString = screenElement.textContent;
        modifiedString = modifiedString.substring(0, modifiedString.length - 1).trim();
        screenElement.textContent = modifiedString;
    }

    // Clear Screen button:
    function clear() {
        screenElement.textContent = '';
    }

    // --- END OF FUNCTIONALITY FOR MISCELLANEOUS BUTTONS ---
})

