document.addEventListener('DOMContentLoaded', function () {
  // Function to update the screen content with the clicked number
  function updateScreen(number) {
    screenElement.textContent += number;
  }

  // Get the screen element
  var screenElement = document.querySelector('.screen');

  // Get the parent container of the buttons
  var buttonContainer = document.querySelector('.grid-container');

  // Add a click event listener to the button container
  buttonContainer.addEventListener('click', function (event) {
    // Check if a button was clicked
    if (event.target.tagName === 'BUTTON') {
      var number = event.target.textContent;
      updateScreen(number);
    }
  });
});








