import React, { Component } from "react";
import flush from './static/images/poker_hands/Flush.png';
import full from './static/images/poker_hands/Full.png';
import no_pair from './static/images/poker_hands/No_Pair.png';
import one_pair from './static/images/poker_hands/One_Pair.png';
import poker from './static/images/poker_hands/Poker.png';
import royal_flush from './static/images/poker_hands/Royal_Flush.png';
import straight from './static/images/poker_hands/Straight.png';
import staright_flush from './static/images/poker_hands/Straight_Flush.png';
import three from'./static/images/poker_hands/Three_of_a_kind.png';
import two from'./static/images/poker_hands/Two_Pairs.png';

export function RulesPoker() {
 return(
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">układ</th>
            <th scope="col">przykład</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>poker królewski</td>
            <td>
              <img
                src={royal_flush}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>poker</td>
            <td>
              <img
                src={staright_flush}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>kareta</td>
            <td>
              <img
                src={poker}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>full</td>
            <td>
              <img
                src={full}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>kolor</td>
            <td>
              <img
                src={flush}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>strit</td>
            <td>
              <img
                src={straight}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>trójka</td>
            <td>
              <img
                src={three}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>dwie pary</td>
            <td>
              <img
                src={two}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>para</td>
            <td>
              <img
                src={one_pair}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
          <tr>
            <td>wysoka karta</td>
            <td>
              <img
                src={no_pair}
                alt="Błąd w załadowaniu zdjęcia"
              />
            </td>
          </tr>
        </tbody>
      </table>
<p>Etapy rozgrywki: </p>
<ol>
    <li> Jeden z graczy to rozdający, czyli dealer, a dwóch uczestników gry, którzy siedzą po jego lewej
        stronie, jest zmuszonych, aby włożyć do puli stawkę w ciemno;
    </li>
    <li>Pierwszy gracz od lewej wkłada niską stawkę w ciemno, czyli tzw. small blind;
    </li>
    <li>Drugi gracz siedzący na lewo od rozdającego wkłada do puli wysoką stawkę w ciemno, czyli big blind;
    </li>
    <li>Kolejny etap gry to rozdanie każdemu z graczy po dwie zakryte karty, czyli pocket cards — ich wartość
        może być znana tylko samym posiadaczom;
    </li>
    <li>Następnie przechodzi się do rundy licytacji — rozpoczyna ją pierwszy gracz siedzący po lewej stronie.
        Wówczas uczestnik ma do dyspozycji trzy ruchy: spasowanie, sprawdzenie lub podbicie;
    </li>
    <li>Po części licytacyjnej, w której trakcie każdy z graczy włożył określoną sumę pieniężną do puli,
        następuje odwrócenie trzeciej karty ze stołu (tzw. flop).
    </li>
    <li>Dalszy etap gry to kolejna licytacja. Kiedy gracze znów wykonają swoje ruchy, przechodzi się do
        wyłożenia na stół czwartej karty, jest to tzw. turn;
    </li>
    <li>Następuje trzecia licytacja, kolejne podbicie stawki, a na stole ląduje piąta karta — tzw. river;
    </li>
    <li>Kolejny etap rozgrywki to czwarta i zarazem ostatni licytacja.
    </li>
    <li>Ostatni krok w rozgrywce to wyłożenie wszystkich kart. Gracze mogą skorzystać z pięciu kart spośród
        dostępnych siedmiu (do dyspozycji jest 5 community card i dwie własne), by ułożyć najlepiej punktowany
        układ
    </li>
</ol>
</div>);
}

export function RulesTysiac() {
    return(
      <div>
      <ol className="rules">
          <li>
              Meldunek to król i dama jednego koloru. Wartości meldunku:
              <table>
                  <thead>
                      <tr>
                          <th scope="col">
                              meldunek
                          </th>
                          <th scope="col">
                              wartość
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>
                              pik
                          </td>
                          <td>
                              40
                          </td>
                      </tr>
                      <tr>
                          <td>
                              trefl
                          </td>
                          <td>
                              60
                          </td>
                      </tr>
                      <tr>
                          <td>
                              karo
                          </td>
                          <td>
                              80
                          </td>
                      </tr>
                      <tr>
                          <td>
                              kier
                          </td>
                          <td>
                              100
                          </td>
                      </tr>
                  </tbody>
              </table>
          </li>
          <li>Gdy nie masz meldunku, ale masz cztery dziewiątki lub suma oczek Twoich kart wynosi mniej niż 16 to
              możesz poprosić o kolejne rozdanie.
          </li>
          <li>
              Licytacja jest co 5 oczek.
          </li>
          <li>
              Nie można licytować bez meldunku powyżej 120 oczek.
          </li>
          <li>
              Jeżeli masz meldunek inny niż w piku, to musisz licytować.
          </li>
          Jeżeli jest as, to dostaje 50 punktów. Jeżeli jest meldunek, to zapisywana jest
          wartość meldunku. W przeciwnym przypadku, nie dostaje żadnych punktów.
          <li>
              Suma oczek zaokrągla się w dół do piątek.
          </li>
          <li>
              W czterosobowej wersji osoba rozdająca dostaje punkty z musiku:
              <ul>
                  <li>
                      jeżeli jest as, to dostaje 50 punktów;
                  </li>
                  <li>
                      jeżeli jest meldunek, to zapisywana jest
                      wartość meldunku;
                  </li>
                  <li>
                      w przeciwnym przypadku, nie dostaje żadnych punktów.
                  </li>
              </ul>
          </li>
          <li>
              Starszeństwo kart i ich wartości punktowe:
              <table>
                  <thead>
                      <tr>
                          <th scope="col">
                              karta
                          </th>
                          <th scope="col">
                              punkty
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>
                              as
                          </td>
                          <td>
                              11
                          </td>
                      </tr>
                      <tr>
                          <td>
                              10
                          </td>
                          <td>
                              10
                          </td>
                      </tr>
                      <tr>
                          <td>
                              król
                          </td>
                          <td>
                              4
                          </td>
                      </tr>
                      <tr>
                          <td>
                              dama
                          </td>
                          <td>
                              3
                          </td>
                      </tr>
                      <tr>
                          <td>
                              walet
                          </td>
                          <td>
                              2
                          </td>
                      </tr>
                      <tr>
                          <td>
                              9
                          </td>
                          <td>
                              0
                          </td>
                      </tr>
                  </tbody>
              </table>
          </li>
      </ol>
  </div>);}

export function RulesBrydz() {
  return(
    <div>
        Gra rozpoczyna się od rozdania 13 kart każdemu z graczy. Osoby siedzące naprzeciwko siebie stanowią pary (są w
        jednej drużynie).
        <ol class="etapy">
            <li>Licytacja<br/>
            Licytację rozpoczyna osoba rozdająca karty, a następnie licytują kolejne osoby zgodnie z ruchem wskazówek
            zegara. Ta faza rozgrywki kończy się wraz z trzema kolejnymi pasami.
            Każdy gracz w tej fazie ma dwie opcje: pas lub odzywka. Każda odzywka składa się z cyfry (tzw. "poziomu"),
            odpowiadającej całkowitej liczbie lew (patrz B. Rozgrywka), które dany gracz deklaruje zebrać (6 + podana
            cyfra), oraz koloru (tzw. "atutu"), wskazującego kolor atutowy (lub wskazuje jego brak - "bez atu").
            Każda odzywka musi być większa od poprzedniej, tzn. deklarować większą liczbę lew lub tę samą liczbę lew i
            starszy kolor niż poprzednia odzywka.
            </li>
            <li>Rozgrywka<br/>
            Po zakończeniu się licytacji, rozpoczyna się druga faza rozgrywki, w której gracze dzielą się na 3
            kategorie:
            <ol>
                <li>"Rozgrywający" - osoba, która jako pierwsza z pary, która wygrała licytację wskazała w licytacji
                    końcowy atut.</li>
                <li>"Dziadek" - partner rozgrywającego</li>
                <li>"Obrona" - drużyna przeciwna</li>
            </ol>
            </li>
        </ol>
        Grę rozpoczyna osoba siedząca po lewej od rozgrywającego. Po rozpoczęciu przez nią tury, dziadek odsłania swoje
        karty.
        Każda tura w tej fazie wygląda następująco:
        <ol>
            <li>Osoba, która wygrała poprzednią turę wykłada na stół jedną kartę.</li>
            <li>Zgodnie z ruchem wskazówek zegara, każda pozostała osoba wykłada po jednej karcie na stół, z czego
                rozgrywający podejmuje decyzję za dziadka. Każda osoba ma obowiązek dołożyć kartę tego samego koloru
                (chyba że takiej nie posiada).</li>
            <li>Osoba z najwyższą kartą koloru podanego przez pierwszą osobę wygrywa. Wyjątkiem jest przypadek, w którym
                jedna z pozostałych osób wyłożyła kolor atutowy - w tym przypadku wygrywa osoba z najwyższą kartą koloru
                atutowego.</li>
            <li>Cztery karty znajdujące się na stole (tzw. lewa) zostają zabrane przez parę, która wygrała tę turę.</li>
        </ol>
        Rozgrywka toczy się aż do wyłożenia wszystkich kart przez graczy. Następnie podliczane są lewy zebrane przez
        każdą z par i zgodnie z <a href="https://pl.wikipedia.org/wiki/Bryd%C5%BC#Punktacja">zasadami</a> obliczane są
        punkty zdobyte przez każdą z nich w danym rozdaniu.
    </div>
  );
}
