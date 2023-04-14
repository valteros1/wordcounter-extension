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
    const correctedWords = data[0];
    const sentText = data[1];
    console.log("sentText :", sentText)
    console.log("correctedWords :", correctedWords)
  } catch (error) {
    console.error(error);
  }

  
}

document.addEventListener('mouseup', function(event) { // 
  const selectedText = window.getSelection().toString(); // võta valitud tekst ning muuda see stringiks
  if (selectedText) {
    sendSelectedText(selectedText);
  }
});