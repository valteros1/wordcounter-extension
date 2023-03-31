function sendSelectedText(selectedText) {
  
  console.log(selectedText); // for debugging
  fetch('http://localhost:3000/selected-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Request body is in JSON format
    },
    body: JSON.stringify({ text: selectedText }) 
  })
  .then(response => response.json()) 
  .then(data => console.log(`Word count: ${data.count}`)) 
  .catch(error => console.error(error)); 
}


  document.addEventListener('mouseup', function(event) {
    const selectedText = window.getSelection().toString(); 
    if (selectedText) { 
      sendSelectedText(selectedText); 
    }
  });
