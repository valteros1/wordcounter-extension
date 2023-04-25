document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ type: 'requestData' }, function(response) {
      console.log('Message sent from popup.js to background.js');
      console.log(response);
  
      if (response && response.correctedWords) {
        document.getElementById('corrected-words').innerHTML = response.correctedWords;
      } else {
        document.getElementById('corrected-words').innerHTML = 'No corrected words found';
      }
  
      if (response && response.sentText) { // check if sentText exists
        document.getElementById('sent-text').innerHTML = response.sentText;
      } else {
        document.getElementById('sent-text').innerHTML = 'No sent text found';
      }
    });
  });
  

// Add a click event listener to the button

// 
// const closeButton = document.getElementById('close-button');
// closeButton.addEventListener('click', () => {
//   window.close();
// });

document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', () => {
      window.close();
    });
  });