# Aplikacja do przeprowadzania gier karcianych
## Opis projektu:
  Aplikacja ma na celu umożliwić bezproblemowe przeprowadzanie rozgrywki w sytuacji, gdy mamy dostęp wyłącznie do kart i internetu. Jej zadaniem będzie przeprowadzać grę, tzn. informować użytkownika o jego turze, a następnie przetwarzać jego decyzję, informując o tym pozostałych graczy. Przez cały czas trwania rozgrywki będzie monitorowany jej bilans (między innymi liczba punktów każdego z graczy).

  Obsługiwane będą następujące gry:
* Poker
* Brydż
* Tysiąc
## Grupy użytkowników / role (dla kogo przeznaczony projekt):
Projekt jest przeznaczony dla osób chcących zagrać w grę karcianą, które nie mają dostępu do potrzebnych akcesoriów, takich jak żetony, czy pudełka licytacyjne. Aplikacja będzie zapewniać ich wirtualną wersję oraz dodatkowo będzie obsługiwać przebieg rozgrywki, ułatwiając jej koordynację.
## Funkcjonalności:
* Host tworzy grę, modyfikując konfigurację rozgrywki, po czym dostaje numer identyfikacyjny.
* Pozostali gracze dołączają do utworzonej rozgrywki poprzez podanie numeru identyfikacyjnego rozgrywki oraz (unikalnej) nazwy gracza.
* Przebieg rozgrywki (zależny od rodzaju gry):
  * licytacja
  * przeprowadzenie partii za pomocą kart z pozostałymi graczy
  * zapisanie wyników do aplikacji, dokonuje tego host
  * podsumowanie tury
  * w przypadku pokera  (przez całą rozgrywkę):
    * dostępny podgląd układów pokerowych
    * wskazówki dotyczące przebiegu rozgrywki (np. informacja o odsłonięciu kart wspólnych)
* Aplikacja przerywa grę w przypadku zwycięstwa jednego z graczy. Zostają wyświetlone aktualne punkty wraz z zajętym miejscem.
## Założenia:
* Dostęp do Internetu
* Dostęp do pełnej talii kart (jednej dla wszystkich graczy)
* Możliwość rozegrania fizycznej gry
* Liczba graczy:
  * od 2 do 10 dla pokera
  * 4 dla brydża
  * od 2 do 4 dla tysiąca 
## Technologie:
* Python (framework Django)
* HTML/CSS
* JavaScript (framework React)
## Narzędzia:
* repozytorium (GitHub)
* GitHub Issues
* GitHub Projects
* Discord
