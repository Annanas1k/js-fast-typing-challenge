async function loadUselessFact() {
    try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=ro", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Eroare la cererea API!');
        }

        const data = await response.json();
        // Verificăm dacă avem un fapt disponibil
        const fact = data.text || "Nu am găsit un fapt inutil.";
        document.getElementById("useless-fact").textContent = fact;
    } catch (error) {
        document.getElementById("useless-fact").textContent = `Eroare: ${error.message}`;
    }
}

window.onload = loadUselessFact;
document.getElementById("alt-text").addEventListener("click", loadUselessFact)
