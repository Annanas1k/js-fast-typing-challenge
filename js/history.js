// Cheia pentru localStorage
const STORAGE_KEY = "typingResults";

// Funcția de formatare a datei
function formatDate(dateString) {
    const options = { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
    };
    return new Date(dateString).toLocaleString('ro-RO', options);
}

// Funcția care afișează istoricul testelor
function displayHistory() {
    const historyContainer = document.getElementById('history-container');
    let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-history">
                <p>Nu există teste salvate în istoric.</p>
                <p>Completează cel puțin un test de tastare pentru a vedea statistici.</p>
            </div>
        `;
        return;
    }

    // Sortare descrescătoare (cele mai recente primele)
    history.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generăm tabelul cu date
    let tableHTML = `
        <table class="history-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Dată</th>
                    <th>Viteză (WPM)</th>
                    <th>Precizie</th>
                    <th>Erori</th>
                    <th>Cuvinte Corecte</th>
                </tr>
            </thead>
            <tbody>
    `;

    history.forEach((test, index) => {
        tableHTML += `
            <tr id="row-${test.id}">
                <td>${index + 1}</td>
                <td>${formatDate(test.date)}</td>
                <td>${test.wpm}</td>
                <td>${test.accuracy}%</td>
                <td>${test.errors}</td>
                <td>${test.correctWords}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
        <p class="history-count">Total teste: ${history.length}</p>
    `;

    historyContainer.innerHTML = tableHTML;
}


// Funcția care șterge întreg istoricul
function clearHistory() {
    if (!confirm('Sigur dorești să ștergi tot istoricul? Această acțiune nu poate fi anulată.')) return;

    localStorage.removeItem(STORAGE_KEY);
    displayHistory(); // Reafișează lista
}

// Adăugăm event listener pentru butonul de ștergere a întregului istoric
document.getElementById('clear-history').addEventListener('click', clearHistory);

// Afișăm istoricul la încărcarea paginii
document.addEventListener('DOMContentLoaded', displayHistory);

window.onload = displayHistory;
