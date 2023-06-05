import React, { Component, useEffect, useState } from "react";
import "./static/styles/brydz.css";
import table from './static/images/stol.png';
import karo from './static/images/diamonds.png';
import kier from './static/images/hearts.png';
import trefl from './static/images/clubs.png';
import pik from './static/images/spades.png';
import { RulesBrydz } from './Rules'
import { Link, useSearchParams } from 'react-router-dom';

class BPlayer extends Component {
  render() {
    return (
      <div className={JSON.parse(this.props.data).class} id={this.props.id}>
        <span className="fa-solid fa-circle-user ikona"></span>
        <div className="dane">
          <div>{JSON.parse(this.props.data).info}</div>
          <div>{JSON.parse(this.props.data).nickname}</div>
          <div>{JSON.parse(this.props.data).points}</div>
        </div>
      </div>
    )
  }
}
const GameBrydz = () => {

  const [showRules, setShowRules] = useState(false);
  const [searchParams] = useSearchParams();
  const game_id = searchParams.get('game_id');
  const [player, setNickname] = useState('')
  const player_number = searchParams.get('player_number');
  const [whoseTurn, setWhoseTurn] = useState(0);
  const [lastBet, setLastBet] = useState(0);
  const [color, setColorValue] = useState(0);
  const [trick, setTrickValue] = useState(0);
  const [waitForStart, setWaitForStart] = useState(false);
  const [waitingForResults, setWaitingForResults] = useState(false);
  const [playerCounter, seBPlayerCounter] = useState(0);
  const [isSeBPlayerCounter, setIsSeBPlayerCounter] = useState(false);

  const default_player_data = {
    class: "gracz hide",
    nickname: "",
    points: 0,
    last_bet: 0,
  }
  const MAX_PLAYERS = 4;
  const [playerData, seBPlayerData] = useState(
    Array(MAX_PLAYERS).fill(JSON.stringify(default_player_data))
  );
  const django_host = 'localhost:8000'
  const connectionString = 'ws://' + django_host + '/ws/karcianki/' + game_id + '/';

  useEffect(() => {
    let gameSocket = new WebSocket(connectionString);
    gameSocket.onopen = function open() {
      console.log('WebSockets connection created.');
      // on websocket open, send the START event.
      gameSocket.send(JSON.stringify({
        "event": "JOIN",
        "message": player_number,
      }));
    };

    gameSocket.onclose = function (e) {
      console.log('Socket is closed.', e.code);
      if (e.code !== 3000) {
        console.log('Reconnecting...');
        setTimeout(function () {
          window.location.reload(false);
        }, 1000);
      }
    };
    // Sending the info about the room
    gameSocket.onmessage = function (e) {
      // On getting the message from the server
      // Do the appropriate steps on each event.
      let data = JSON.parse(e.data);
      data = data["payload"];
      let message = data['message'];
      let event = data["event"];
      receive(event, message);
    };

    const quitButton = document.getElementById('quit');
    quitButton.onclick = function () {
      console.log("quitting");
      gameSocket.send(JSON.stringify({
        "event": "QUIT",
        "message": player_number,
      }));
      console.log("QUIT");
      gameSocket.onclose({
        'code': 3000,
      });
    }

    const gameBoard = document.getElementById('game_board');
    gameBoard.send = function (event, message) {
      gameSocket.send(JSON.stringify({
        "event": event,
        "message": message,
      }));
    }

    if (gameSocket.readyState === WebSocket.OPEN) {
      gameSocket.onopen();
    }
  }, [])

  const updateState = () => {
    updateGame();
    updatePlayers();
  }

  const updateGame = () => {
    fetch(`http://localhost:8000/api/karcianki/game/${game_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (response.status === 404) {
          return null;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setWaitForStart(data.status == "START");
          setLastBet(data.last_bet);
          setWaitingForResults(data.status == "END");
        }
        else {
          alert("Gra się zakończyła.");
        }
      })
  }

  const updatePlayers = () => {
    fetch(`http://localhost:8000/api/karcianki/players/${game_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (response.status === 404) {
          return null;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        let newData = Array(MAX_PLAYERS).fill(JSON.stringify(default_player_data));
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let player_data = {
              'nickname': data[i].nickname,
              'game': data[i].game,
              'player_number': data[i].player_number,
              'points': data[i].points,
              'info': data[i].info,
              'class': "gracz"
            }
            newData[data[i].player_number] = JSON.stringify(player_data);
          }
        }
        seBPlayerData(newData);
      })
  }

  useEffect(() => {
    updatePlayers();
  }, [])

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const showResults = (message) => {
    message = JSON.parse(message);
    var content = "<table>";
    message = message['results'];
    console.log(message);
    for (let i = 0; i < message.length; i+= 2) {
      content += "<tr><th>";
      content += i/2;
      content += "</th><th>";
      content += message[i]['player_name'] + ' i ' + message[i+1]['player_name'];
      content += "</th><th>";
      content += message[i]['points'];
      content += "</th></tr>";
    }
    content += "</table>";
    document.getElementById('results').innerHTML = content;
    document.getElementById('results_block').style.display = "block";
  }

  const gameBoard = document.getElementById('game_board');

  const receive = (event, message) => {
    console.log(event + " -> " + message);
    updateState();
    switch (event) {
      case "TURN":
        let info = JSON.parse(message);
        setWhoseTurn(info.player_number);
        // console.log(message);
        // console.log(info.player_count);
        let nickname = info.nickname;
        setNickname(nickname);
        if (!isSeBPlayerCounter && info.player_count != null) {
          // console.log("wszedlem");
          seBPlayerCounter(info.player_count);
          setIsSeBPlayerCounter(true);
        }
        break;
      case "START":
        setWaitForStart(true);
        seBPlayerCounter()
        break;
      case "END":
        // console.log("tak");
        break;
      case "END_GAME":
        showResults(message);
        console.log("Koniec");

      default:
        console.log("No event");
    }
  }

  const onStart = () => {
    setWaitForStart(false);
    gameBoard.send("BSTART", '');
  }

  const onPass = () => {
    console.log("pass " + whoseTurn + ' ' + player_number);
    if (whoseTurn != player_number) {
      return;
    }

    const message = JSON.stringify({
      "player_number": player_number,
      "type": "PASS",
      "bet": 0,
    });
    gameBoard.send("BTURN", message);
  }

  const handleNumberClick = (event) => {
    const chosen = document.getElementsByClassName('chosen_trick');
    if (chosen.length > 0) {
      chosen[0].classList.remove('chosen_trick');
    }
    event.target.classList.add('chosen_trick');
    setTrickValue(event.target.id);
    if (color != 0) {
      document.getElementById('zatwierdz').style.display = 'block';
    }
  }

  const handleColorClick = (event) => {
    var button = event.target;
    if (!event.target.classList.contains('game_button')) {
      button = event.target.parentElement;
    }
    const chosen = document.getElementsByClassName('chosen_color');
    if (chosen.length > 0) {
      chosen[0].classList.remove('chosen_color');
    }
    button.classList.add('chosen_color');
    setColorValue(button.id);
    if (trick != 0) {
      document.getElementById('zatwierdz').style.display = 'block';
    }
  }

  const onBidClick = (event) => {
    // console.log("bid " + bidValue + ' ' + whoseTurn + ' ' + player_number );
    console.log(lastBet)
    let bidValue = parseInt(trick) + parseInt(color);
    console.log(bidValue);
    if (whoseTurn != player_number || bidValue <= lastBet) {
      return;
    }
    const message = JSON.stringify({
      "player_number": player_number,
      "type": "BET",
      "bet": bidValue,
    });
    var buttons = document.getElementsByClassName('chosen_color');
    if (buttons.length > 0) {
      buttons[0].classList.remove('chosen_color');
    }
    buttons = document.getElementsByClassName('chosen_trick');
    if (buttons.length > 0) {
      buttons[0].classList.remove('chosen_trick');
    }
    setColorValue(0);
    setTrickValue(0);
    document.getElementById('zatwierdz').style.display = 'none';
    gameBoard.send("BTURN", message);
  }

  const onSetPoints = () => {
    console.log("winner: ");
    var para0Input = document.getElementById('Para0');
    var para1Input = document.getElementById('Para1');
    var para0Value = parseInt(para0Input.value, 10);
    var para1Value = parseInt(para1Input.value, 10);
    const players = [
      { id: 0, points: para0Value },
      { id: 1, points: para1Value },
      { id: 2, points: para0Value },
      { id: 3, points: para1Value },
    ];
    if (player_number == 0) {
      const message = JSON.stringify({
        "players": players,
      });
      gameBoard.send("BEND", message);
    }
  };

  const pairName = (index) => {
    var name = "";
    name += JSON.parse(playerData[0 + index]).nickname;
    name += " i ";
    name += JSON.parse(playerData[2 + index]).nickname;
    return name;
  }

  return (
    <div>
      <header>
        <div>
          BRYDŻ
        </div>
        <div className="game_header">
          player: {player} <br />
          number: {whoseTurn} <br />
          Numer gry {game_id} <br />
        </div>
        <button onClick={toggleRules} type="submit" aria-label="info" className="game_button"><span className="fa-solid fa-question"></span></button>
      </header>

      <div className="page_game" >
        <div className="plansza" id="game_board" game_id={game_id}>
          <div className="rzad">
            <BPlayer id="gracz1" data={playerData[1]} />
          </div>
          <div className="rzad" id="ze_stolem">
            <BPlayer id="gracz0" data={playerData[0]} />
            <img src={table} alt="" className="stol" />
            <BPlayer id="gracz2" data={playerData[2]} />
          </div>
          <div className="rzad">
            <BPlayer id="gracz3" data={playerData[3]} />
          </div>
        </div>
      </div>
      <div className={showRules ? "zasady show" : "zasady"}>
        <RulesBrydz />
      </div>
      <div className="brydz opcje">
        <div className="duzy">
          {player_number == 0 && waitForStart == true &&
            <button onClick={onStart} className="game_button brydz_button" type="submit" id="start">Start</button>
          }
        </div>
        <div className="duzy">
          <button type="submit" className="game_button" id="pass" onClick={onPass} > Pass </button>
        </div>
        <div className="wybor">
          <div className="lewy">
            <button type="submit" id="10" onClick={handleNumberClick} className="game_button"> 1 </button>
            <button type="submit" id="20" onClick={handleNumberClick} className="game_button"> 2 </button>
            <button type="submit" id="30" onClick={handleNumberClick} className="game_button"> 3 </button>
            <button type="submit" id="40" onClick={handleNumberClick} className="game_button"> 4 </button>
            <button type="submit" id="50" onClick={handleNumberClick} className="game_button"> 5 </button>
            <button type="submit" id="60" onClick={handleNumberClick} className="game_button"> 6 </button>
            <button type="submit" id="70" onClick={handleNumberClick} className="game_button"> 7 </button>
          </div>
          <div className="atut">
            <button type="submit" id="1" onClick={handleColorClick} className="game_button"> <img src={trefl} alt="trefl" width="30" height="30" /> </button>
            <button type="submit" id="2" onClick={handleColorClick} className="game_button"> <img src={karo} alt="karo" width="30" height="30" /> </button>
            <button type="submit" id="3" onClick={handleColorClick} className="game_button"> <img src={kier} alt="kier" width="30" height="30" /> </button>
            <button type="submit" id="4" onClick={handleColorClick} className="game_button"> <img src={pik} alt="pik" width="30" height="30" /> </button>
            <button type="submit" id="5" onClick={handleColorClick} className="game_button"> BA </button>
          </div>
        </div>
        <div className="duzy">
          <button type="submit" className="game_button" id="zatwierdz" onClick={onBidClick} style={{ display: 'none' }}> Zatwierdź </button>
        </div>
        <div className="duzy">
          <Link to='../'>
            <button className="game_button" type="submit" id="quit">Wyjdź</button>
          </Link>
        </div>
      </div>

      {player_number == 0 && waitingForResults == true &&
        <div class="tysiac_wyniki">
          <p>Wprowadź wyniki</p>
          <div>
            <label htmlFor="Para2">{pairName(0)}</label><br />
            <input type="number" id="Para0" name="Para0" required /> <br /><br />
          </div>
          <div>
            <label htmlFor="Para1">{pairName(1)}</label><br />
            <input type="number" id="Para1" name="Para1" required /><br /><br />
          </div>
          <button onClick={() => onSetPoints()} className="game_button tysiac_button" type="submit" id="start">Wprowadź wyniki</button>
        </div>
      }
      <div className="wyniki" id="results_block">
        <p>Wyniki</p>
        <div id="results"></div>
        <Link to='../'>
          <button className="game_button" type="submit" id="quit">Wyjdź</button>
        </Link>
      </div>
    </div>
  );
}
export default GameBrydz;