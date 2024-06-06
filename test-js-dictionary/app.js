/*document.getElementById('search_input').addEventListener('keypress', function(event){
    if(event.key === 13){
        event.preventDefault();
        document.getElementById("search_button").click();
    }
}); //enter to click button  */

const toggleButton = document.querySelector('.toggle_button');
        const darkModeToggle = document.getElementById('darkModeToggle');
        let isDarkMode = false;


        const toggleDarkMode = () => {
            isDarkMode = !isDarkMode;
            document.body.style.backgroundColor = isDarkMode ? '#333333' : '#f0f0f0';
            document.body.style.color = isDarkMode ? '#ffffff' : '#333333';
            toggleButton.innerHTML = isDarkMode ? '<span class="material-symbols-rounded">light_mode</span>' : '<span class="material-symbols-outlined">dark_mode</span>';
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
                    let output = `<h2>${wordInfo.word}</h2>`;
                    output += `<p><span class="ejaan-text"> ${wordInfo.phonetics[0].text}</span></p>`;
                    output += `<div class="audio-control"><i class="fa fa-play-circle fa-4x"></i>
                                    <audio id="audioPlayer" style="display: none;">
                                        <source src="${wordInfo.phonetics[0].audio}" type="audio/mpeg">
                                    </audio>
                                </div>`;


                    wordInfo.meanings.forEach(meaning => {
                        output += `<h3>${meaning.partOfSpeech}</h3>`;
                        meaning.definitions.forEach((definition, index) => {
                            output += `<p>${index + 1}. ${definition.definition} (${definition.example ? 'Example: ' + definition.example : ''})</p>`;
                        });
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