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

function Rules() {
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

export default Rules;