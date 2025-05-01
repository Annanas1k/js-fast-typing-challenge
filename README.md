# Test de Tastare

Această aplicație web este un test de tastare care ajută utilizatorii să își măsoare viteza de tastare în cuvinte pe minut (WPM) și precizia. Aplicația furnizează un text aleatoriu de tastat, iar utilizatorii trebuie să tasteze textul corect într-un interval de timp dat (1 minut). Testul urmărește și afișează erorile și viteza de tastare în timp real, iar la final, utilizatorul poate vedea statistici despre performanța sa.

## Funcționalități principale:

- **Test de Tastare**: Permite utilizatorilor să efectueze un test de tastare cu un timp de 1 minut.
- **Calcularea Vitezei**: Viteza de tastare este calculată în cuvinte pe minut (WPM).
- **Monitorizarea Erorilor**: Se afișează numărul de erori în timp real pe măsură ce utilizatorul tastează.
- **Rezultate și Istoric**: După finalizarea testului, se salvează rezultatele (viteza, precizia și erorile) într-un istoric, care poate fi vizualizat oricând.
- **Fapte Inutile**: Se afișează un fapt inutil aleatoriu pentru a distra utilizatorul între teste.

## Tehnologii utilizate:

- **HTML**: Structura paginii.
- **CSS**: Stilizarea paginii pentru o experiență plăcută.
- **JavaScript**: Logica aplicației, inclusiv testul de tastare, calculul vitezei și preciziei, gestionarea rezultatelor și istoricului.
- **Local Storage**: Salvarea rezultatelor testelor pentru a fi vizualizate ulterior.

## Cum să utilizezi aplicația

1. **Clonare repo:**
   ```bash
   git clone <repository-url>
   ```

2. **Deschide aplicația:**
   - Deschide fișierul `index.html` în browser-ul tău preferat.

3. **Cum să faci un test de tastare:**
   - Apasă butonul „Start” pentru a începe un test.
   - Tastează textul afișat cât mai rapid și precis posibil.
   - La final, vei vedea viteza ta de tastare (WPM), precizia și numărul de erori.

4. **Vizualizează istoricul testelor:**
   - Accesează istoricul pentru a vedea toate testele tale anterioare.

5. **Șterge istoricul:**
   - Dacă dorești să ștergi istoricul testelor, există un buton pentru a face acest lucru.

## Descriere detaliată a funcționalităților:

### Test de Tastare:
- Aplicația selectează un text aleatoriu dintr-un fișier JSON (`texts.json`) și îl afișează.
- Utilizatorul trebuie să tasteze acest text într-un interval de 60 de secunde.
- În timpul testului, viteza de tastare (WPM) și numărul de erori sunt actualizate în timp real.

### Calculul Vitezei și Preciziei:
- La finalul testului, viteza de tastare (WPM) este calculată pe baza numărului de cuvinte tastate corect într-un minut.
- Precizia este calculată ca procentajul de caractere corecte în raport cu totalul de caractere.

### Istoricul Testelor:
- Rezultatele fiecărui test sunt salvate în `localStorage` și pot fi vizualizate ulterior.
- În istoricul testelor, vei găsi data fiecărui test, viteza (WPM), precizia și numărul de erori.

