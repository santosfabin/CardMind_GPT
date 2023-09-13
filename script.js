const flashcard = document.getElementById("flashcard");
const cardContent = document.querySelector(".card-content");
const cardEnglish = document.getElementById("card-english");
const cardTranslation = document.getElementById("card-translation");

let currentWordIndex = 0;
let shuffledWords = [];
let jsonData = {};

// Função para embaralhar um array
function shuffleArray(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para atualizar o flashcard com a próxima palavra e tradução
function updateFlashcard() {
    cardContent.style.display = "block";
    cardEnglish.textContent = shuffledWords[currentWordIndex];
    cardTranslation.textContent = "";
}

// Carregar o JSON do arquivo separado
fetch("flashcards.json")
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        shuffledWords = shuffleArray(Object.keys(jsonData));
        updateFlashcard();
    });

flashcard.addEventListener("click", () => {
    if (cardTranslation.textContent === "") {
        cardTranslation.textContent = jsonData[shuffledWords[currentWordIndex]];
    } else {
        currentWordIndex = (currentWordIndex + 1) % shuffledWords.length;
        updateFlashcard();
    }
});
