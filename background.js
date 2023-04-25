chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'data') {
      console.log('Message received in background.js from content.js');
      console.log(request.data);
      chrome.storage.local.set({ 
        correctedWords: request.data.correctedWords,
        sentText: request.data.sentText // add sentText to the storage
      }, function() {
        console.log('Value saved:', request.data.correctedWords, request.data.sentText);
      });
    } else if (request.type === 'requestData') {
      console.log('Request for data received in background.js from popup.js');
      chrome.storage.local.get(['correctedWords', 'sentText'], function(result) {
        console.log('Parandatud lause on', result.correctedWords);
        console.log('Saadetud lause on', result.sentText); // log the sentText
        sendResponse({ correctedWords: result.correctedWords, sentText: result.sentText }); // add sentText to the response
      });
      return true; 
    }
  });