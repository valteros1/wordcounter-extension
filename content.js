


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
    
    const responseTase = await fetch("https://evkk.tlu.ee/api/texts/keeletase", {
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
    const dataTase = await responseTase.json();
    
    console.log(data); 
    console.log(dataMitmekesisus)
    console.log(dataKeerukus)
    console.log(dataTase)
    

    const recievedWords = data[0];
    const sentText = data[1];

    // Tasemehinnangu osa



    // Keerukuse osa
    const sentencesCount = dataKeerukus[0];
    const wordCount = dataKeerukus[1];
    const longSyllables = dataKeerukus[2];
    const syllablesCount = dataKeerukus[3];
    const longWords = dataKeerukus[4];
    const smog = dataKeerukus[5];
    const fkIndex = dataKeerukus[6];
    const lix = dataKeerukus[7];
    const sentenceLevel = dataKeerukus[9];


    
    console.log("sentText :", sentText)
    console.log("recievedWords :", recievedWords)
    console.log("wordCount :", wordCount)


    // Mitmekesisuse kontroll console.login vastavalt 

    const howManyWords = dataMitmekesisus[11];
    const differentWords = dataMitmekesisus[10];
    const klss = dataMitmekesisus[0];
    const jlss = dataMitmekesisus[1];
    const mtld = dataMitmekesisus[4];
    const hdd = dataMitmekesisus[5];
    console.log("Words :", howManyWords)
    console.log("Different words :", differentWords)


    //


    // loen vastused Keerukusest konstanti
    // const sentencesCount = dataKeerukus[0];
    // const wordCount = dataKeerukus[1];
    // const longSyllables = dataKeerukus[2];
    // const syllablesCount = dataKeerukus[3];
    // const longWords = dataKeerukus[4];
    // const smog = dataKeerukus[5];
    // const fkIndex = dataKeerukus[6];
    // const lix = dataKeerukus[7];
    // const sentenceLevel = dataKeerukus[9];
    console.log("Sentences Count fro Complexity :", sentencesCount)

    const sentWords = sentText.split(' ');

    console.log("splitted words are:", sentWords)

    if (response.ok) {
      setTimeout(() => {
        let message = {
          data: {
            sentText: sentText,
            recievedWords: recievedWords,

            sentWords: sentWords,
            wordCount: wordCount,
            sentencesCount: sentencesCount,
            longSyllables: longSyllables,
            syllablesCount: syllablesCount,
            longWords: longWords,
            smog: smog,
            fkIndex: fkIndex,
            lix: lix,
            sentenceLevel: sentenceLevel,
            howManyWords: howManyWords,
            differentWords: differentWords,
            klss: klss,
            jlss: jlss,
            mtld: mtld,
            hdd: hdd


          }
        };
        
        chrome.runtime.sendMessage({ 
          type: 'data', 
          data: { 
            sentText: sentText,
            recievedWords: recievedWords, 
            sentWords: sentWords, 
            wordCount: wordCount,
            sentencesCount: sentencesCount,
            longSyllables: longSyllables,
            syllablesCount: syllablesCount,
            longWords: longWords,
            smog: smog,
            fkIndex: fkIndex,
            lix: lix,
            sentenceLevel: sentenceLevel,
            howManyWords: howManyWords,
            differentWords: differentWords,
            klss: klss,
            jlss: jlss,
            mtld: mtld,
            hdd: hdd

          } 
        }, function(response) {
          console.log('Message sent from content.js to background.js');
          chrome.storage.local.set({ 'recievedWords': recievedWords }, function() {
            console.log('Value is set to recievedWords ' + data[0]);
          });
        
          chrome.storage.local.set({ 'sentText': sentText }, function() {
            console.log('Value is set to sentText' + data[1]);
          });

          // Keerukuse endpoindi andmed salvestada Chrome localisse

          chrome.storage.local.set({ 'sentencesCount': sentencesCount }, function() {
            console.log('Value is set to sentencesCount' + dataKeerukus[0]);
          });

          chrome.storage.local.set({ 'wordCount': wordCount }, function() {
            console.log('Value is set to wordCount' + dataKeerukus[1]);
          });

          chrome.storage.local.set({ 'longSyllables': longSyllables }, function() {
            console.log('Value is set to longSyllables' + dataKeerukus[2]);
          });

          chrome.storage.local.set({ 'syllablesCount': syllablesCount }, function() {
            console.log('Value is set to syllablesCount' + dataKeerukus[3]);
          });

          chrome.storage.local.set({ 'longWords': longWords }, function() {
            console.log('Value is set to longWords' + dataKeerukus[4]);
          });

          chrome.storage.local.set({ 'smog': smog }, function() {
            console.log('Value is set to smog' + dataKeerukus[5]);
          });

          chrome.storage.local.set({ 'fkIndex': fkIndex }, function() {
            console.log('Value is set to fkIndex' + dataKeerukus[6]);
          });

          chrome.storage.local.set({ 'lix': lix }, function() {
            console.log('Value is set to lix' + dataKeerukus[7]);
          });

          chrome.storage.local.set({ 'sentenceLevel': sentenceLevel }, function() {
            console.log('Value is set to sentenceLevel' + dataKeerukus[9]);
          });

          chrome.storage.local.set({ 'howManyWords': howManyWords }, function() {
            console.log('Value is set to howManyWords' + dataMitmekesisus[11]);
          });

          chrome.storage.local.set({ 'differentWords': differentWords }, function() {
            console.log('Value is set to differentWords' + dataMitmekesisus[9]);
          });

          chrome.storage.local.set({ 'klss': klss }, function() {
            console.log('Value is set to klss' + dataMitmekesisus[0]);
          });

          chrome.storage.local.set({ 'jlss': jlss }, function() {
            console.log('Value is set to jlss' + dataMitmekesisus[2]);
          });

          chrome.storage.local.set({ 'mtld': mtld }, function() {
            console.log('Value is set to mtld' + dataMitmekesisus[4]);
          });

          chrome.storage.local.set({ 'hdd': hdd }, function() {
            console.log('Value is set to hdd' + dataMitmekesisus[5]);
            console.log("mis kuradi asi on siis see", response.recievedWords)
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
  






console.log("mis kuradi asi on siis see", response.recievedWords)
