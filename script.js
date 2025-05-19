const formularzKomitetu = document.getElementById('formularz-komitetu');
const poleNazwaKomitetu = document.getElementById('nazwa-komitetu');
const checkboxCzyKoalicja = document.getElementById('czy-koalicja');
const poleLiczbaGlosow = document.getElementById('liczba-glosow');
const listaZarejestrowanychKomitetow = document.getElementById('lista-zarejestrowanych-komitetow');
const przyciskObliczWyniki = document.getElementById('przycisk-oblicz-wyniki');
const cialoTabeliWynikow = document.getElementById('cialo-tabeli-wynikow');
const przyciskEdytuj = document.getElementById('przycisk-edytuj');
const poleFiltracji = document.getElementById('pole-filtracji');
const przyciskSortuj = document.getElementById('przycisk-sortuj');
const przyciskUsun = document.getElementById('przycisk-usun');

let komitety = [];
const PROG_POJEDYNCZY = 5;
const PROG_KOALICYJNY = 8;

formularzKomitetu.addEventListener('submit', function(event) {
    event.preventDefault();

    const nazwa = poleNazwaKomitetu.value.trim();
    const czyKoalicja = checkboxCzyKoalicja.checked;
    const glosy = parseInt(poleLiczbaGlosow.value, 10);

    let nazwaIstnieje = false;
    for (let i = 0; i < komitety.length; i++) {
        if (komitety[i].nazwa.toLowerCase() === nazwa.toLowerCase()) {
            nazwaIstnieje = true;
            break;
        }
    }

    if (nazwaIstnieje) {
       alert(`Komitet o nazwie "${nazwa}" już istnieje!`);
       poleNazwaKomitetu.focus();
       return;
    }

    let progDoPrzypisania;
    if (czyKoalicja) {
        progDoPrzypisania = PROG_KOALICYJNY;
    } else {
        progDoPrzypisania = PROG_POJEDYNCZY;
    }

    const nowyKomitet = {
        nazwa: nazwa,
        czyKoalicja: czyKoalicja,
        glosy: glosy,
        progWyborczy: progDoPrzypisania
    };

    komitety.push(nowyKomitet);


przyciskUsun.addEventListener('click', function() {
    const index = document.getElementById('lista-zarejestrowanych-komitetow').selectedIndex;
    if (index !== -1) {
        komitety.splice(index, 1);
        listaZarejestrowanychKomitetow.innerHTML = '';
        for (let i = 0; i < komitety.length; i++) {
            const komitet = komitety[i];
            const elementListy = document.createElement('li');
            elementListy.textContent = `${i + 1}. ${komitet.nazwa} - ${komitet.glosy} głosów`;
            listaZarejestrowanychKomitetow.appendChild(elementListy);
        }
    } else {
        alert('Wybierz komitet do usunięcia!');
    }
});


przyciskEdytuj.addEventListener('click', function() {
    const index = document.getElementById('lista-zarejestrowanych-komitetow').selectedIndex;
    if (index !== -1) {
        const komitet = komitety[index];
        const nazwa = prompt('Wprowadź nową nazwę komitetu:', komitet.nazwa);
        const glosy = parseInt(prompt('Wprowadź nową liczbę głosów:', komitet.glosy));
        if (nazwa !== null && glosy !== null) {
            komitet.nazwa = nazwa;
            komitet.glosy = glosy;
            listaZarejestrowanychKomitetow.innerHTML = '';
            for (let i = 0; i < komitety.length; i++) {
                const komitet = komitety[i];
                const elementListy = document.createElement('li');
                elementListy.textContent = `${i + 1}. ${komitet.nazwa} - ${komitet.glosy} głosów`;
                listaZarejestrowanychKomitetow.appendChild(elementListy);
            }
        }
    } else {
        alert('Wybierz komitet do edycji!');
    }
});


poleFiltracji.addEventListener('input', function() {
    const filtr = poleFiltracji.value.toLowerCase();
    listaZarejestrowanychKomitetow.innerHTML = '';
    for (let i = 0; i < komitety.length; i++) {
        const komitet = komitety[i];
        if (komitet.nazwa.toLowerCase().includes(filtr)) {
            const elementListy = document.createElement('li');
            elementListy.textContent = `${i + 1}. ${komitet.nazwa} - ${komitet.glosy} głosów`;
            listaZarejestrowanychKomitetow.appendChild(elementListy);
        }
    }
});


przyciskSortuj.addEventListener('click', function() {
    const kryterium = document.getElementById('kryterium-sortowania').value;
    komitety.sort(function(a, b) {
        if (kryterium === 'nazwa') {
            return a.nazwa.localeCompare(b.nazwa);
        } else if (kryterium === 'glosy') {
            return a.glosy - b.glosy;
        } else {
            return 0;
        }
    });
    listaZarejestrowanychKomitetow.innerHTML = '';
    for (let i = 0; i < komitety.length; i++) {
        const komitet = komitety[i];
        const elementListy = document.createElement('li');
        elementListy.textContent = `${i + 1}. ${komitet.nazwa} - ${komitet.glosy} głosów`;
        listaZarejestrowanychKomitetow.appendChild(elementListy);
    }
});

    listaZarejestrowanychKomitetow.innerHTML = '';
    if (komitety.length === 0) {
         listaZarejestrowanychKomitetow.innerHTML = '<li>Brak zarejestrowanych komitetów.</li>';
    } else {
        for (let i = 0; i < komitety.length; i++) {
            const komitet = komitety[i];
            const elementListy = document.createElement('li');

            let tekstKoalicji; 
            if (komitet.czyKoalicja) { 
                tekstKoalicji = 'jest koalicją'; 
            } else {
                tekstKoalicji = 'nie jest koalicją'; 
            }

            elementListy.innerHTML = `${i + 1}. <strong>${komitet.nazwa}</strong> ${tekstKoalicji}, ilość głosów: <strong>${komitet.glosy.toLocaleString('pl-PL')}</strong>`;
            listaZarejestrowanychKomitetow.appendChild(elementListy);
        }
    }

    formularzKomitetu.reset();
    poleNazwaKomitetu.focus();
});

przyciskObliczWyniki.addEventListener('click', function() {
    cialoTabeliWynikow.innerHTML = '';

    if (komitety.length === 0) {
         const wiersz = cialoTabeliWynikow.insertRow();
         const komorka = wiersz.insertCell();
         komorka.colSpan = 5;
         komorka.textContent = 'Brak komitetów do wyświetlenia wyników.';
         komorka.style.textAlign = 'center';
        return;
    }

    let sumaGlosow = 0;
    for (let i = 0; i < komitety.length; i++) {
        sumaGlosow += komitety[i].glosy;
    }

    for (let i = 0; i < komitety.length; i++) {
        const komitet = komitety[i];

        let procent;
        if (sumaGlosow > 0) {
            procent = (komitet.glosy / sumaGlosow) * 100;
        } else {
            procent = 0;
        }

        let czyPrzekraczaProg; 
        if (procent >= komitet.progWyborczy) {
            czyPrzekraczaProg = true; 
        } else {
            czyPrzekraczaProg = false; 
        }       

        const wiersz = cialoTabeliWynikow.insertRow();

        let klasaWiersza;
        if (czyPrzekraczaProg) {
            klasaWiersza = 'powyzej-progu';
        } else {
            klasaWiersza = 'ponizej-progu';
        }
        wiersz.className = klasaWiersza;

        const komorkaLp = wiersz.insertCell();
        komorkaLp.textContent = i + 1;

        const komorkaNazwa = wiersz.insertCell();
        komorkaNazwa.textContent = komitet.nazwa;

        const komorkaProg = wiersz.insertCell();
        komorkaProg.textContent = komitet.progWyborczy;

        const komorkaGlosy = wiersz.insertCell();
        komorkaGlosy.textContent = komitet.glosy.toLocaleString('pl-PL');

        const komorkaProcent = wiersz.insertCell();
        komorkaProcent.textContent = procent.toFixed(2)
    }
});