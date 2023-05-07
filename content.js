async function sendSelectedText(selectedText) {
  try {
    const response = await fetch("https://evkk.tlu.ee/api/texts/korrektuur", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tekst: selectedText }) 
    });

    const responseMitmekesisus = await fetch("https://evkk.tlu.ee/api/texts/mitmekesisus", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tekst: selectedText }) 
    });

    const responseKeerukus = await fetch("https://evkk.tlu.ee/api/texts/keerukus", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tekst: selectedText }) 
    });




    console.log(response);
    console.log("Mitmekesisuselt saadud vastus on:", responseMitmekesisus)
    console.log("Keerukuselt saadud vastus on", responseKeerukus)

    const data = await response.json();
    const dataMitmekesisus = await responseMitmekesisus.json();
    const dataKeerukus = await responseKeerukus.json();
    
    console.log(data); 
    console.log(dataMitmekesisus)
    console.log(dataKeerukus)
    

    const recievedWords = data[0];
    const sentText = data[1];
    
    console.log("sentText :", sentText)
    console.log("recievedWords :", recievedWords)


    // Mitmekesisuse kontroll console.login vastavalt 

    const howManyWords = dataMitmekesisus[11];
    const differentWords = dataMitmekesisus[10];
    console.log("Words :", howManyWords)
    console.log("Different words :", differentWords)


    // loen vastused Keerukusest konstanti
    const sentencesCount = dataKeerukus[0];
    const wordCount = dataKeerukus[1];
    const longSyllables = dataKeerukus[2];
    const syllablesCount = dataKeerukus[3];
    const longWords = dataKeerukus[4];
    const smog = dataKeerukus[5];
    const fkIndex = dataKeerukus[6];
    const lix = dataKeerukus[7];
    const sentenceLevel = dataKeerukus[9];
    console.log("Sentences Count :", sentencesCount, "Word Count:", wordCount, "Long Syllable words:", longSyllables, "Syllables :",
    syllablesCount, "long Word count", longWords, "SMOG", smog, "Flesh-Kincaidi index", fkIndex, "LIX", lix, "Pakutav keerukustase", sentenceLevel)


    const sentWords = sentText.split(' ');

    console.log("splitted words are:", sentWords)

    if (response.ok) {
      setTimeout(() => {
        let message = {
          data: {
            sentText: sentText,
            recievedWords: recievedWords,
            sentWords: sentWords
          }
        };
        
        chrome.runtime.sendMessage({ 
          type: 'data', 
          data: { 
            sentText: sentText,
            recievedWords: recievedWords, 
            sentWords: sentWords 
          } 
        }, function(response) {
          console.log('Message sent from content.js to background.js');
          chrome.storage.local.set({ 'recievedWords': recievedWords }, function() {
            console.log('Value is set to recievedWords ' + data[0]);
          });
        
          chrome.storage.local.set({ 'sentText': sentText }, function() {
            console.log('Value is set to sentText' + data[1]);
          });
        });
      }, 1000);
    } else {
      console.error('Error:', response.status, 'errorMitmekesisus', responseMitmekesisus.status, 'errorKeerukus', responseKeerukus.status);
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


