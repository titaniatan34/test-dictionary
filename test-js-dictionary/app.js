
const toggle_button = document.querySelector('.toggle_button');
const search_input = document.getElementById('search_input');
search_input.addEventListener("keypress", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById("search_button").click();
    }
    });
        const darkModeToggle = document.getElementById('darkModeToggle');
        let isDarkMode = false;


        const toggleDarkMode = () => {
            isDarkMode = !isDarkMode;
            document.body.style.backgroundColor = isDarkMode ? '#333333' : '#f0f0f0';
            toggle_button.innerHTML = isDarkMode ? '<span class="material-symbols-rounded">light_mode</span>' : '<span class="material-symbols-outlined">dark_mode</span>';
            darkModeToggle.checked = isDarkMode;
        }

        toggleButton.addEventListener('click', toggleDarkMode);
        darkModeToggle.addEventListener('change', toggleDarkMode);

        document.getElementById('search_button').addEventListener('click', function() {
            const keyword = document.getElementById('search_input').value;
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`)
                .then(response => response.json())
                .then(data => {
                    const wordInfo = data[0];
                    let output = `<p><span class="keyy">${wordInfo.word}</span></p>`;
                    output += `<p><span class="ejaan-text"> ${wordInfo.phonetics[0].text}</span></p>`;
                    output += `<div class=audio-control><i class="fas fa-play-circle fa-3x"></i>
                    <audio id="audioPlayer" style="display: none;">
                        <source src="${wordInfo.phonetics[0].audio}" type="audio/mpeg">
                        </audio></div>`;

                    
                    wordInfo.meanings.forEach(meaning => {
                        output += `<h3><span class="verbNoun">${meaning.partOfSpeech}</span></h3>
                        <h4><span class="meaning-title">Meaning</span></h4>`;
                        meaning.definitions.forEach((definition, index) => {
                            output += `<p><li>${definition.definition} (${definition.example ? 'Example: ' + definition.example : ''})</li></p>`;
                        });
                        output += `<h4 class="hSyn"><span class="meaning-title">Synonyms</span> <p class="ejaan-text">${(meaning.synonyms).join(", ")} </p></h4>`;
                        
                    });

                    document.getElementById('wordInfo').innerHTML = output;
                    document.getElementById('wordInfo').style.display = 'block';
                    document.querySelector('.audio-control').addEventListener('click', function(){
                        const audio = document.querySelector('audio');
                        if(audio.paused){
                            audio.play();
                        } else {
                            audio.pause();
                        }
                    });
                })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('wordInfo').innerHTML = "Can't be blank";
                document.getElementById('wordInfo').style.display = 'block';
            });
            
    });