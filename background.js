chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'data' && request.type === 'mouseUpEvent') {
      chrome.browserAction.setPopup({ popup: 'popup.html' });
      console.log('Message received in background.js from content.js');
      console.log(request.data);
      chrome.storage.local.set({ 
        recievedWords: request.data.recievedWords,
        sentText: request.data.sentText // add sentText to the storage
      }, function() {
        console.log('Value saved:', 'sentText', request.data.sentText, 'recievedWords', request.data.recievedWords, );
      });
    } else if (request.type === 'requestData') {
      console.log('Request for data received in background.js from popup.js');
      chrome.storage.local.get(['recievedWords', 'sentText'], function(result) {
        console.log('Parandatud lause on', result.recievedWords);
        console.log('Saadetud lause on', result.sentText); // log the sentText
        sendResponse({ recievedWords: result.recievedWords, sentText: result.sentText }); // add sentText to the response
      });
      return true; 
    }
  });