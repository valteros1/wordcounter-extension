async function sendSelectedText(selectedText) { // async funktsioon mis saadab valitud teksti http post requestina
  try {
    const response = await fetch("https://evkk.tlu.ee/api/texts/korrektuur", { // POST request evkk urli'le
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tekst: selectedText }) 
    });
    console.log(response);
    const data = await response.json(); // 
    console.log(data); 
    const recievedWords = data[0];
    const sentText = data[1];recievedWords
    
    console.log("sentText :", sentText)
    console.log("recievedWords :", recievedWords)

    const sentWords = sentText.split(' '); // teksti eraldamine 

    console.log("splitted words are:", sentWords) // kontroll kas eraldas sõnad

    if (response.ok) {
      setTimeout(() => {
        
      let message = {
        
        data: {
          sentText: sentText,
          recievedWords: recievedWords,
          sentWords: sentWords
        }
      };
      
      // Send data to background script
      chrome.runtime.sendMessage({ 
        type: 'data', 
        data: { 
          sentText: sentText, // add sentText to the data
          recievedWords: recievedWords, 
          sentWords: sentWords 
        } 
      }, function(response) {
        console.log('Message sent from content.js to background.js');
        chrome.storage.local.set({ 'recievedWords': recievedWords }, function() {
          console.log('Value is set to ' + result.correctedWords);
        });
      
        chrome.storage.local.set({ 'sentText': sentText }, function() {
          console.log('Value is set to ' + result.sentText);
        });
      });
  
      
      }, 1000);
    } else {
      console.error('Error:', response.status);
    }

  } catch (error) {
    console.error(error);
  }

  
}

let selectedText = "";
document.addEventListener('mouseup', function(event) {
  chrome.runtime.sendMessage({ type: 'mouseUpEvent' });
  selectedText = window.getSelection().toString();
});

document.addEventListener('mousedown', function(event) {
  selectedText = "";
});

document.addEventListener('mouseup', function(event) {
  if (selectedText) {
    sendSelectedText(selectedText);
  }
});


