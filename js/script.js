let texts = [];
let currentText = "";
let startTime;
let timerInterval;
let wordsWritten = 0;
let errors = 0;

// Încarcă fișierul JSON cu textele
fetch('assets/texts.json')
    .then(response => response.json())
    .then(data => {
        texts = data.texts;
    })
    .catch(error => console.error('Eroare la încărcarea fișierului JSON:', error));

document.getElementById("start-button").addEventListener("click", startTest);

function startTest() {
    // Alege un text aleatoriu din lista de texte
    currentText = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById("text-to-type").textContent = currentText;

    // Resetează câmpurile
    document.getElementById("input-text").value = "";
    document.getElementById("errors").textContent = "Erori: 0";
    document.getElementById("words-per-minute").textContent = "Viteză: 0 WPM";
    errors = 0;
    wordsWritten = 0;

    // Începe cronometru
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);

    // Activează verificarea textului în timp real
    document.getElementById("input-text").addEventListener("input", checkText);
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000); // Timpul în secunde
    document.getElementById("timer").textContent = "Timp: " + elapsedTime + "s";
    
    // La 60 de secunde, termină testul
    if (elapsedTime >= 60) {
        clearInterval(timerInterval);
        finishTest(elapsedTime);
    }
}

function checkText() {
    let inputText = document.getElementById("input-text").value;
    let correctText = currentText.substring(0, inputText.length);
    
    // Verifică corectitudinea textului
    errors = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] !== currentText[i]) {
            errors++;
        }
    }

    // Afișează erorile în timp real
    document.getElementById("errors").textContent = "Erori: " + errors;

    // Calculează viteza de tastare (WPM)
    let words = inputText.split(/\s+/).filter(word => word.length > 0).length;
    wordsWritten = words;
    let wpm = Math.floor((wordsWritten / (new Date() - startTime)) * 60);
    document.getElementById("words-per-minute").textContent = "Viteză: " + wpm + " WPM";
}

function finishTest(elapsedTime) {
    let inputText = document.getElementById("input-text").value;
    let correctWords = inputText.split(/\s+/).filter(word => word.length > 0).length;
    let totalWords = currentText.split(/\s+/).filter(word => word.length > 0).length;
    
    let wpm = Math.floor((correctWords / elapsedTime) * 60);
    
    document.getElementById("result").textContent = `Testul s-a încheiat! Viteză: ${wpm} WPM, Cuvinte corecte: ${correctWords}, Erori: ${errors}`;
}
