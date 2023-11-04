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
            var evaluatedAnswer = evaluateArithmetic(operationString);
            // Need to clear screen before answer is displayed.
            screenElement.textContent = ''
            updateScreen(evaluatedAnswer);
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

// This function takes in a string and outputs the result of the arithmetic expression represented by the string.
function evaluateArithmetic(inputString) {
    // Finding location of operator and identifying operands:
    var outputValue;
    var operator, operand_1, operand_2;
    for(i = 0; i < inputString.length; i++) {
        if(isOperator(inputString[i])) {
            // Need to add support for multiplying negative numbers.
            operator = inputString[i];
            operand_1 = parseFloat(inputString.substring(0, i));
            operand_2 = parseFloat(inputString.substring(i + 1));
            break;
        }
    }

    // Evaluating final answer depending on what the operator is:
    switch(operator) {
        case '+':
            outputValue = operand_1 + operand_2;
            break;
        case '-':
            outputValue = operand_1 - operand_2;
            break;
        case '*':
            outputValue = operand_1 * operand_2;
            break;
        case '/':
            if(operand_2 != 0) {
                outputValue = operand_1 / operand_2;
            } else {
                outputValue = 'ERROR: Division by Zero'
            }
            break;
        default:
            outputValue = 'Unexpected Error';
    }

    return outputValue;
}

function isOperator(inputString) {
    return (inputString === '+' || inputString === '-' || inputString === '*' || inputString === '/')
}