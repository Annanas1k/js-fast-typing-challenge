let texts = [];
let currentText = "";
let startTime;
let timerInterval;
let wordsWritten = 0;
let errors = 0;
let isTestActive = false;
const TEST_DURATION = 60; 

// Încarcă fișierul JSON cu textele
fetch('assets/texts.json')
    .then(response => response.json())
    .then(data => {
        texts = data.texts;
    })
    .catch(error => console.error('Eroare la încărcarea fișierului JSON:', error));

document.getElementById("start-button").addEventListener("click", startTest);
document.getElementById("restart-button").addEventListener("click", resetTest);

function startTest() {
    if (isTestActive) return;
    
    // Alege un text aleatoriu din lista de texte
    currentText = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById("text-to-type").textContent = currentText;

    // Resetează câmpurile
    document.getElementById("input-text").value = "";
    document.getElementById("errors").textContent = "❌ Erori: 0";
    document.getElementById("words-per-minute").textContent = "🚀 Viteză: 0 WPM";
    document.getElementById("result").textContent = "";
    errors = 0;
    wordsWritten = 0;
    isTestActive = true;

    // Schimbă textul butonului
    document.getElementById("start-button").textContent = "Se execută...";
    document.getElementById("start-button").disabled = true;

    // Începe cronometru
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);

    // Activează verificarea textului în timp real
    document.getElementById("input-text").addEventListener("input", checkText);
    document.getElementById("input-text").focus();
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const remainingTime = TEST_DURATION - elapsedTime;
    
    document.getElementById("timer").textContent = `⏱️ Timp: ${remainingTime}s`;
    
    // Oprește testul după 60 de secunde
    if (elapsedTime >= TEST_DURATION) {
        clearInterval(timerInterval);
        finishTest(elapsedTime);
    }
}

function checkText() {
    const inputText = document.getElementById("input-text").value;
    const originalText = currentText;
    
    // Resetăm numărul de erori
    errors = 0;
    
    // Compară caracterele introduse cu cele originale
    for (let i = 0; i < inputText.length; i++) {
        if (i >= originalText.length) {
            // Caractere în plus față de textul original
            errors++;
        } else if (inputText[i] !== originalText[i]) {
            // Caractere greșite
            errors++;
        }
    }

    // Afișează erorile în timp real
    document.getElementById("errors").textContent = "❌ Erori: " + errors;

    // Calculează viteza de tastare (WPM)
    const elapsedMinutes = (new Date() - startTime) / (1000 * 60);
    const words = inputText.split(/\s+/).filter(word => word.length > 0).length;
    wordsWritten = words;
    const wpm = elapsedMinutes > 0 ? Math.round(wordsWritten / elapsedMinutes) : 0;
    document.getElementById("words-per-minute").textContent = "🚀 Viteză: " + wpm + " WPM";

    // Verifică dacă textul a fost completat
    if (inputText === currentText) {
        clearInterval(timerInterval);
        finishTest(Math.floor((new Date() - startTime) / 1000));
    }
}

function finishTest(elapsedTime) {
    const inputText = document.getElementById("input-text").value;
    const correctWords = inputText.split(/\s+/).filter(word => word.length > 0).length;
    const totalWords = currentText.split(/\s+/).filter(word => word.length > 0).length;
    const accuracy = Math.round(((currentText.length - errors) / currentText.length) * 100);
    
    const elapsedMinutes = elapsedTime / 60;
    const wpm = elapsedMinutes > 0 ? Math.round(correctWords / elapsedMinutes) : 0;
    
    document.getElementById("result").innerHTML = `
        <p>Test ${elapsedTime >= TEST_DURATION ? 'terminat' : 'completat'} în ${elapsedTime} secunde!</p>
        <p>Viteză: ${wpm} WPM</p>
        <p>Precizie: ${accuracy}%</p>
        <p>Erori totale: ${errors}</p>
        <p>Cuvinte corecte: ${correctWords}/${totalWords}</p>
    `;
    
    isTestActive = false;
    document.getElementById("start-button").textContent = "Start";
    document.getElementById("start-button").disabled = false;
    document.getElementById("input-text").removeEventListener("input", checkText);
}

function resetTest() {
    clearInterval(timerInterval);
    isTestActive = false;
    
    document.getElementById("text-to-type").textContent = "Programarea este arta de a comunica cu un computer. Încearcă să tastezi acest text fără erori și cât mai rapid posibil!";
    document.getElementById("input-text").value = "";
    document.getElementById("timer").textContent = "⏱️ Timp: 60s";
    document.getElementById("errors").textContent = "❌ Erori: 0";
    document.getElementById("words-per-minute").textContent = "🚀 Viteză: 0 WPM";
    document.getElementById("result").textContent = "";
    document.getElementById("start-button").textContent = "Start";
    document.getElementById("start-button").disabled = false;
    document.getElementById("input-text").removeEventListener("input", checkText);
    
    currentText = "";
    errors = 0;
    wordsWritten = 0;
}