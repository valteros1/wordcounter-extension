document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.sendMessage({ type: 'requestData' }, function(response) {
    console.log('Message sent from popup.js to background.js');
    console.log(response);
    hideAll()
    document.getElementById('text-mistakes-button').style.backgroundColor="#fbcdfc";
    document.getElementById('corrected-area').style.display = 'block';
    

    // If there are mistakes, hide the no-mistakes element and show the corrected-words element
    if (response && response.sentText && response.recievedWords && response.sentText === response.recievedWords) {
      // document.getElementById('no-mistakes').style.display = 'block';
      // document.getElementById('corrected-words').style.display = 'block';
      let test = 'Vigu ei leitud.';
      document.getElementById('corrected-words').innerHTML = test;
      
      // chrome.extension.getBackgroundPage().console.log('Teade, mida soovite kuvada');
    } else if (response && response.recievedWords) {
      console.log("SEE ON ", response.recievedWords)
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
      // Display the highlighted text in the corrected-words element and hide the no-mistakes element
      document.getElementById('corrected-words').innerHTML = highlightedText;
      // document.getElementById('no-mistakes').style.display = 'none';
      // document.getElementById('corrected-words').style.display = 'none'; // hide the corrected-words element initially
    } else {
      let test = 'Tekst pole valitud';
      // If there is no response, hide the corrected-words element and show the no-mistakes element
      document.getElementById('corrected-words').innerHTML = test;
      document.getElementById('corrected-words').style.display = 'block';
      // document.getElementById('no-mistakes').style.display = 'block';
    }
  });

  // Add a click event listener to the Mistakes button that shows the corrected-words element
  const mistakesButton = document.getElementById('text-mistakes-button');
  mistakesButton.addEventListener('click', () => {


    hideAll();
    document.getElementById('corrected-area').style.display = 'block';
    document.getElementById('text-mistakes-button').style.backgroundColor="#fbcdfc";



  // const correctedWordsEl = document.getElementById('corrected-words');
  //    const noMistakesEl = document.getElementById('no-mistakes');
  //    if (correctedWordsEl.style.display === 'none') {
       
  //      correctedWordsEl.style.display = 'block';
  //      noMistakesEl.style.display = 'none';
  //    } else {
       
  //      correctedWordsEl.style.display = 'none';
  //      noMistakesEl.style.display = 'block';
  //    }
   });

  const closeButton = document.getElementById('close-button');
  closeButton.addEventListener('click', () => {
    chrome.storage.local.clear();
    // hideAll();
    
    window.close();
    // window.getSelection().removeAllRanges();

  });

  // const assassmentButton = document.getElementById('level-assessment-button');
  // assassmentButton.addEventListener('click', () => {
  //   window.close();
  // });
});

document.getElementById('level-assessment-button').addEventListener('click', function() {
  chrome.storage.local.get(['langLevelFirst', 'langLevelSecond', 'langLevelThird', 'langLevelFourth', 'langComplexityFirst'
  , 'langComplexitySecond', 'langComplexityThird', 'langComplexityFourth', 'langvocabularyFirst', 'langformUsageFirst'], function(result) { 


  hideAll();
  document.getElementById('assessment-area').style.display = 'block';
  document.getElementById('level-assessment-button').style.backgroundColor="#fbcdfc";
{/* <h2 style="display: inline-block; margin-bottom: 0;">Tekst vastab tasemele:</h2> */}
const probabilityFirst = result.langLevelFirst.toString().split(',');
// const splittedProbabilityFirst = probabilityFirst.split(',');
const probabilitySecond = result.langLevelSecond.toString().split(",");
const probabilityThird = result.langLevelThird.toString().split(",");
const probabilityFourth = result.langLevelFourth.toString().split(",");
const complexityFirst = result.langComplexityFirst.toString().split(",");
const vocabularyFirst = result.langvocabularyFirst.toString().split(",");
const formUsageFirst = result.langformUsageFirst.toString().split(",");


// const complexitySecond = result.langComplexitySecond.toString().split(",");
// const complexityThird = result.langComplexityThird.toString().split(",");
// const complexityFourth = result.langComplexityFourth.toString().split(",");
// const assessmentProbability = probabilityFirst[0];
const assessmentProbability =  `
</br>
<h1 style="display: inline-block; margin-top: 0;"><p id="tase" style="display: inline;">${probabilityFirst[1]}</p></h1>
<h1 style="display: inline-block; margin: 0;"> <span id="tasemeprotsent">${Math.round(probabilityFirst[0] * 100)}%</span></h1>
<h3>Teiste tasemete tõenäosus:</h3>
<ul>
  <li><b>${probabilitySecond[1]}</b>: ${Math.round(probabilitySecond[0] * 100)}%</li>
  <li><b>${probabilityThird[1]}</b>: ${Math.round(probabilityThird[0] * 100)}%</li>
  <li><b>${probabilityFourth[1]}</b>: ${Math.round(probabilityFourth[0] * 100)}%</li>
</ul>
</br>
<h3>Täpsem hinnang:</h3>
<ul>
<li><b>Teksti keerukus:</b> ${complexityFirst[1]}</li>
<li><b>Sõnavara:</b> ${vocabularyFirst[1]}</li>
<li><b>Vormikasutus:</b> ${formUsageFirst[1]}</li>
</ul>
`;
;
document.getElementById('assessment-details').innerHTML = assessmentProbability;


})
});




let complexityButton = document.getElementById('text-complexity-button');

document.getElementById('text-complexity-button').addEventListener('click', function() {
  chrome.storage.local.get(['wordCount', 'sentencesCount','longSyllables','syllablesCount','longWords','smog',
  'fkIndex','lix','sentenceLevel'], function(result) {
    const wordCount = result.wordCount
    const sentencesCount = result.sentencesCount
    const longSyllables = result.longSyllables
    const syllablesCount = result.syllablesCount
    const longWords = result.longWords
    const smog = result.smog
    const fkIndex = result.fkIndex
    const lix = result.lix
    const sentenceLevel = result.sentenceLevel
    
    // Kuna komadega tulevad SMOG ja FK Index, ümardan neid
    const roundedSmog = Math.floor(smog * 100) / 100;
    const roundedfkIndex = Math.floor(fkIndex * 100) / 100; 

    hideAll();
    document.getElementById('complexity-area').style.display = 'block';
    document.getElementById('text-complexity-button').style.backgroundColor="#fbcdfc";

    
    
    // Keerukuse
    document.getElementById('complexity').innerHTML = "Keerukuse andmed" ;
    document.getElementById('sentences').innerHTML = '<b>Lauseid:</b> ' + sentencesCount;
    document.getElementById('words').innerHTML = '<b>Sõnu:</b> ' + wordCount;
    document.getElementById('multisyllables').innerHTML = '<b>Paljusilbilisi sõnu (vähemalt 3 silpi):</b> ' + longSyllables;
    document.getElementById('syllables').innerHTML = '<b>Silpe:</b> ' + syllablesCount;
    document.getElementById('longwords').innerHTML = '<b>Pikki sõnu (vähemalt 7 tähte):</b> ' + longWords ;
    document.getElementById('smog').innerHTML = '<b>SMOG:</b> ' + roundedSmog;
    document.getElementById('fkindex').innerHTML = '<b>Flesch-Kincaidi Indeks:</b> ' + roundedfkIndex;
    document.getElementById('lix').innerHTML = '<b>LIX:</b> ' + lix;
    document.getElementById('sentenceslevel').innerHTML = '<b>Pakutav keerukustase:</b> ' + sentenceLevel;
    

  });
});

let diversityButton = document.getElementById('text-diversity-button');

document.getElementById('text-diversity-button').addEventListener('click', function() {
  chrome.storage.local.get(['howManyWords', 'differentWords', 'klss', 'jlss', 'mtld', 'hdd'], function(result) {
    const howManyWords = result.howManyWords
    const differentWords = result.differentWords
    const klss = result.klss
    const jlss = result.jlss
    const mtld = result.mtld
    const hdd = result.hdd
    
      
    hideAll();
    document.getElementById('diversity-area').style.display = 'block';
    document.getElementById('text-diversity-button').style.backgroundColor="#fbcdfc";
    // Mitmekesisus
    document.getElementById('diversity').innerHTML = "Sõnavara mitmekesisuse andmed" ;
    document.getElementById('diversitysentence').innerHTML = '<b>Sõnu:</b> ' + howManyWords;
    document.getElementById('differentwords').innerHTML = '<b>Erinevaid sõnu:</b> ' + differentWords;
    document.getElementById('klss').innerHTML = '<b>Kõigi ja erinevate sõnade korrigeeritud suhtarv <span style="font-style: italic;">(ingl Corrected Type-Token Ratio)</span>:</b> ' + klss;
    document.getElementById('jlss').innerHTML = '<b>Kõigi ja erinevate sõnade juuritud suhtarv <span style="font-style: italic;">(ingl Root Type-Token Ratio)</span>:</b> ' + jlss;
    document.getElementById('mtld').innerHTML = '<b>MTLD indeks <span style="font-style: italic;">(ingl Measure of Textual Lexical Diversity)</span>:</b> ' + mtld;
    document.getElementById('hdd').innerHTML = '<b>HDD indeks <span style="font-style: italic;">(ingl Hypergeometric Distribution D)</span>:</b> ' + hdd;
 
    

  });
});



function hideAll(){
  document.getElementById('complexity-area').style.display = 'none';
  document.getElementById('assessment-area').style.display = 'none';
  document.getElementById('diversity-area').style.display = 'none';
  document.getElementById('corrected-area').style.display = 'none';

  document.getElementById('text-complexity-button').style.backgroundColor="aliceblue";
  document.getElementById('text-mistakes-button').style.backgroundColor="aliceblue";
  document.getElementById('level-assessment-button').style.backgroundColor="aliceblue";
  document.getElementById('text-diversity-button').style.backgroundColor="aliceblue";

}