/*document.getElementById('search_input').addEventListener('keypress', function(event){
    if(event.key === 13){
        event.preventDefault();
        document.getElementById("search_button").click();
    }
});*/

     document.getElementById('search_button').addEventListener('click', function() {
        const keyword = document.getElementById('search_input').value;
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`)
            .then(response => {response.json();})
            .then(data => {
                const wordInfo = data[0];
                let output;
                output = `${wordInfo.word}`;
                output = `${wordInfo.phonetics[0].text}`;

                wordInfo.meanings.forEach(meaning => {
                    output = `${meaning.partOfSpeech}`;
                    meaning.definitions.forEach((definition, index) => {
                        output = `${index + 1}. ${definition.definition} (${definition.example ? 'Example: ' + definition.example : ''})`;
                    });
                });

                document.getElementById('wordInfo').innerHTML = output;
                document.getElementById('wordInfo').style.display = 'block';

            })
                //output += `<audio controls><source src="${wordInfo.phonetics[0].audio}" type="audio/mpeg"></audio>`;  
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('wordInfo').innerHTML = "Sorry pal, we couldn't find definitions for the word you were looking for";
                document.getElementById('wordInfo').style.display = 'block';
            });
            
    });
