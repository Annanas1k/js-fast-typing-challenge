let texts = [];
let currentText = "";
let startTime;
let timerInterval;
let wordsWritten = 0;
let errors = 0;
let isTestActive = false;

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
    document.getElementById("timer").textContent = "⏱️ Timp: " + elapsedTime + "s";
    
    // Verifică dacă textul a fost completat
    const inputText = document.getElementById("input-text").value;
    if (inputText === currentText) {
        clearInterval(timerInterval);
        finishTest(elapsedTime);
    }
}

function checkText() {
    const inputText = document.getElementById("input-text").value;
    const correctText = currentText.substring(0, inputText.length);
    
    // Verifică corectitudinea textului
    errors = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] !== currentText[i]) {
            errors++;
        }
    }

    // Afișează erorile în timp real
    document.getElementById("errors").textContent = "❌ Erori: " + errors;

    // Calculează viteza de tastare (WPM)
    const elapsedMinutes = (new Date() - startTime) / (1000 * 60);
    const words = inputText.split(/\s+/).filter(word => word.length > 0).length;
    wordsWritten = words;
    const wpm = Math.round(wordsWritten / elapsedMinutes);
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
    const wpm = Math.round(correctWords / elapsedMinutes);
    
    document.getElementById("result").innerHTML = `
        <p>Test completat în ${elapsedTime} secunde!</p>
        <p>Viteză: ${wpm} WPM</p>
        <p>Precizie: ${accuracy}%</p>
        <p>Erori totale: ${errors}</p>
    `;
    
    isTestActive = false;
    document.getElementById("start-button").textContent = "Start";
    document.getElementById("start-button").disabled = false;
}

function resetTest() {
    clearInterval(timerInterval);
    isTestActive = false;
    
    document.getElementById("text-to-type").textContent = "Programarea este arta de a comunica cu un computer. Încearcă să tastezi acest text fără erori și cât mai rapid posibil!";
    document.getElementById("input-text").value = "";
    document.getElementById("timer").textContent = "⏱️ Timp: 0s";
    document.getElementById("errors").textContent = "❌ Erori: 0";
    document.getElementById("words-per-minute").textContent = "🚀 Viteză: 0 WPM";
    document.getElementById("result").textContent = "";
    document.getElementById("start-button").textContent = "Start";
    document.getElementById("start-button").disabled = false;
    
    currentText = "";
    errors = 0;
    wordsWritten = 0;
}