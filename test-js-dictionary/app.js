document.getElementById('search_input').addEventListener('keypress', function(event){
    if(event.key === 13){
        event.preventDefault();
        document.getElementById("search_button").click();
    }
});

document.getElementById('search_button').addEventListener('click', function() {
    const keyword = document.getElementById('search_input').value;
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}')
        .then(response => response.json())
        .then(data => {
            const wordInfo = data[0];
            let output;
            output += `${wordInfo.word}`;
            output += `${wordInfo.phonetics[0].text}`;
            output += `<audio controls><source src="${wordInfo.phonetics[0].audio}" type="audio/mpeg"></audio>`;

            document.getElementById('wordInfo').innerHTML = output;
            document.getElementById('wordInfo').style.display = 'block';
        })
        
});
