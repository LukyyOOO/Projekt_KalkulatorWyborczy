# Kalkulator Wyborczy

## Opis

Prosta aplikacja webowa, która pozwala użytkownikom na rejestrowanie komitetów wyborczych (partii lub koalicji), wprowadzanie liczby głosów otrzymanych przez każdy komitet, a następnie obliczanie wyników procentowych. Aplikacja wizualizuje również, które komitety przekroczyły odpowiedni próg wyborczy (5% dla pojedynczych komitetów, 8% dla koalicji).

## Funkcjonalności

*   **Rejestracja komitetów:** Umożliwia dodawanie nowych komitetów, podając ich nazwę, określając czy są koalicją, oraz wprowadzając liczbę zdobytych głosów.
*   **Dynamiczna lista:** Wyświetla na bieżąco listę zarejestrowanych komitetów wraz z ich statusem (koalicja/nie koalicja) i liczbą głosów.
*   **Obliczanie wyników:** Po kliknięciu przycisku "Sprawdź wynik procentowy", oblicza całkowitą sumę głosów i procentowy udział każdego komitetu.
*   **Progi wyborcze:** Automatycznie przypisuje próg wyborczy (5% lub 8%) w zależności od tego, czy komitet jest koalicją.
*   **Wizualizacja wyników:** Prezentuje wyniki w przejrzystej tabeli, zawierającej:
    *   Liczbę porządkową (LP)
    *   Nazwę komitetu
    *   Wymagany próg wyborczy (%)
    *   Liczbę głosów
    *   Wynik procentowy (zaokrąglony do dwóch miejsc po przecinku)
*   **Wyróżnianie wyników:** Wiersze w tabeli wyników są kolorowane w zależności od tego, czy dany komitet przekroczył próg wyborczy:
    *   Zielone tło dla komitetów powyżej progu.
    *   Czerwone tło dla komitetów poniżej progu.
*   **Interfejs użytkownika:** Prosty i czytelny interfejs stworzony przy użyciu HTML i stylowany za pomocą CSS.

## Pliki projektu

*   **`index.html`**: Struktura HTML strony, zawierająca formularz do dodawania komitetów, listę zarejestrowanych komitetów oraz tabelę na wyniki.
*   **`style.css`**: Arkusz stylów CSS definiujący wygląd i układ elementów na stronie, w tym responsywność podstawową, style formularza, listy, tabeli oraz wyróżnienia wierszy wyników.
*   **`script.js`**: Kod JavaScript obsługujący logikę aplikacji:

## Użyte biblioteki
Chart.js

## Autor

Bury 4I