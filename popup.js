document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.sendMessage({ type: 'requestData' }, function(response) {
    console.log('Message sent from popup.js to background.js');
    console.log(response);

    if (response && response.sentText && response.recievedWords && response.sentText === response.recievedWords) {
      document.getElementById('no-mistakes').style.display = 'block';
      document.getElementById('corrected-words').style.display = 'none';
    } else if (response && response.recievedWords) {
      const correctedWords = response.recievedWords.split(' ');
      const sentText = response.sentText.split(' ');
      let highlightedText = '';
      for (let i = 0; i < correctedWords.length; i++) {
        if (correctedWords[i] !== sentText[i]) {
          highlightedText += `<span class="stripes">${sentText[i]}</span> <span style="background-color: #AEF359"> ${correctedWords[i]}</span>  `;
        } else {
          highlightedText += `${correctedWords[i]} `;
        }
      }
      document.getElementById('corrected-words').style.display = 'block';
      document.getElementById('corrected-words').innerHTML = highlightedText;
      document.getElementById('no-mistakes').style.display = 'none';
    } else {
      document.getElementById('no-mistakes').style.display = 'block';
      document.getElementById('corrected-words').style.display = 'none';
    }

    if (response && response.sentText) {
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
      chrome.storage.local.clear();
      
      window.close();
      window.getSelection().removeAllRanges();
      
    });
    
  });

  document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('level-assessment-button');
    closeButton.addEventListener('click', () => {
      console.log("Tasemehinnang")
    });
  });

  