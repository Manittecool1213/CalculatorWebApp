/*
Reason for using DOMContentLoaded event listener:
- For adding event listeners for events such as button clicks, elements need to be identified and selected.
- Sometimes, the script may search for the element before the HTML has been loaded completely.
- Adding this event listener solves this problem, by waiting for HTML to complete loading before the following steps.
*/
document.addEventListener('DOMContentLoaded', function() {
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

        // Functionality for equals button:
        if(event.target.id === 'buttonEQUALS') {
        // '===' has been used here instead of '==' for strong comparison. '===' also checks whether the two operands have the same datatype.

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

        // Functionality for delete button:
        if(event.target.id === 'buttonDEL') {
            modifiedString = screenElement.textContent;
            modifiedString = modifiedString.substring(0, modifiedString.length - 1).trim();
            screenElement.textContent = modifiedString;
        }

        // Functionality for AC button:
        if(event.target.id === 'buttonAC') {
            screenElement.textContent = '';
        }
    })
})

