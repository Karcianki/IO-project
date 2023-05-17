import React, { Component, useEffect, useState } from "react";
import "./static/styles/tysiac.css";
import table from './static/images/stol.png';
// import {RulesTysiac} from './Rules'
import { Link, useSearchParams} from 'react-router-dom';

class TPlayer extends Component {
    render() {
        return (
            <div className={ JSON.parse(this.props.data).class } id={this.props.id}>
                <span className="fa-solid fa-circle-user ikona"></span>
                <div className="dane">
                    <div>{ JSON.parse(this.props.data).info }</div>
                    <div>{ JSON.parse(this.props.data).nickname }</div>
                    <div>{ JSON.parse(this.props.data).points }</div>
                </div>
            </div>
        )
    }
}
const GameTysiac = () => {

    const [showRules, setShowRules] = useState(false);
    
    const [searchParams] = useSearchParams();
    const game_id = searchParams.get('game_id');
    const [player, setNickname ] = useState('')
    const player_number = searchParams.get('player_number');
    const [whoseTurn, setWhoseTurn] = useState(0);
    const [lastBet, setLastBet] = useState(0);
    const [bidValue, setBidValue] = useState(0);
    const [waitForStart, setWaitForStart] = useState(false);
    const [waitingForResults, setWaitingForResults] = useState(false);
    const [playerCounter, setPlayerCounter] = useState(0);
    const [isSetPlayerCounter,setIsSetPlayerCounter] = useState(false);
 
    const default_player_data = {
        class: "gracz hide",
        nickname: "",
        points: 0,
        last_bet: 0,
    }
    const MAX_PLAYERS=4; 
    const [playerData, setPlayerData] = useState(
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
        quitButton.onclick = function() {
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
        gameBoard.send = function(event, message) {
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
            if(data) {
                for (let i = 0; i < data.length; i++) {
                    let player_data = {
                        'nickname' :data[i].nickname,
                        'game' : data[i].game,
                        'player_number' : data[i].player_number,
                        'points' : data[i].points,
                        'info': data[i].info
                    }
                    newData[data[i].player_number] = JSON.stringify(player_data);
                }
            }
            setPlayerData(newData);    
        })  
    }

    useEffect(() => {
        updatePlayers();
    }, [])

    const toggleRules = () => {
        setShowRules(!showRules);
    };

    const gameBoard = document.getElementById('game_board');

    const receive = (event, message) => {
        console.log(event + " -> " + message);
        updateState();
        switch (event) {
            case "TURN":
                let info = JSON.parse(message);
                setWhoseTurn(info.player_number);
                console.log(message);
                console.log(info.player_count);
                let nickname = info.nickname;
                setNickname(nickname);
                if(!isSetPlayerCounter && info.player_count != null){
                    console.log("wszedlem");
                    setPlayerCounter(info.player_count);
                    setIsSetPlayerCounter(true);
                }
                break;
            case "START":
                setWaitForStart(true);
                // let info = JSON.parse(message);
                setPlayerCounter()
                break;
            case "END":
                console.log("tak");
                break;
            default:
                console.log("No event");
        }
    }

    const onStart = () => {
        setWaitForStart(false);
        gameBoard.send("TSTART", '');
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
        gameBoard.send("TTURN", message);
    }

    const onBidChange = (event) => {
        setBidValue(event.target.value);
    }

    const onBidClick = (event) => {
        console.log("bid " + bidValue + ' ' + whoseTurn + ' ' + player_number )
        if (whoseTurn != player_number || bidValue <= lastBet) {
            return;
        }
        const message = JSON.stringify({
            "player_number": player_number,
            "type": "BET",
            "bet": bidValue,
        });
        gameBoard.send("TTURN", message); 
    }

    const onSetPoints = () => {
        console.log("winner: ");
        var gracz0Input = document.getElementById('Gracz0');
        var gracz1Input = document.getElementById('Gracz1');
        var gracz0Value = parseInt(gracz0Input.value, 10);
        var gracz1Value = parseInt(gracz1Input.value, 10);
        const players = [
            { id: 0, points: gracz0Value },
            { id: 1, points: gracz1Value },
          ];
        if (playerCounter == 3){
            var gracz2Input = document.getElementById('Gracz2');
            var gracz2Value = parseInt(gracz2Input.value, 10);
            players.push( { id: 2, points: gracz2Value})
        }
        console.log(players);
        if (player_number == 0) {
            const message = JSON.stringify({
                "players": players, 
            });
            gameBoard.send("TEND", message);
        }
    };
    
    return (
        <div>
          <header>
            <div>
            TYSIĄC
            </div>
            <div className="game_header">
                player: {player} <br />
                number: {whoseTurn} <br />
                Numer gry {game_id} <br />
                {playerCounter}
            </div>
            <button onClick={toggleRules} type="submit" aria-label="info" className="game_button"><span className="fa-solid fa-question"></span></button>
          </header>
          <div className="page_game">
            <div className="plansza" id="game_board" game_id={game_id}>
                <div className="rzad">
                    <TPlayer id="gracz1" data={playerData[1]} /> 
                </div>
                <div className="rzad" id="ze_stolem">
                    <TPlayer id="gracz0" data={playerData[0]} />
                    <img src={table} alt="" className="stol"/>
                    <TPlayer id="gracz2" data={playerData[2]} />
                </div>
                <div className="rzad">
                    <TPlayer id="gracz3" data={playerData[3]} />
                    </div>
                </div>
            </div>
            <div className={showRules? "zasady show" : "zasady"}>
                    {/* <RulesTysiac /> */}
            </div>
            <div className="opcje">
                <div className = "host" id="start">
                    {player_number == 0 && waitForStart == true &&
                     <button onClick={onStart} className="game_button tysiac_button" type="submit" id="start">Start</button>
                     }

                     {/* {player_number == 0 && waitingForResults == true &&   */}

                      <label htmlFor="Gracz0">Gracz1</label> 
                      <input type="number" id="Gracz0" name="Gracz0" required /> <br /><br />
                      
                      <label htmlFor="Gracz1">Gracz2</label>
                      <input type="number" id="Gracz1" name="Gracz1" required/><br /><br />
 
                      <label htmlFor="Gracz2">Gracz3</label>
                      <input type="number" id="Gracz2" name="Gracz2" required/><br /><br /> 

                       {/* jest zmienna playerCounter*/}
                      {/* &&   */}
                       <button onClick={() => onSetPoints()} className="game_button tysiac_button" type="submit" id="start">Wyniki</button> 
                        
                </div>
                {/* <button className="game_button tysiac_button" type="submit" id="pass" onClick={() => playerButton()}>wyniki</button> */}
                <button className="game_button tysiac_button" type="submit" id="pass" onClick={onPass}>Pass</button>
                <input type="number" step="5" className="licytuj" min="0" max="10000" onChange={onBidChange} />
                <button className="game_button tysiac_button" id="bet" onClick={onBidClick}>Przebij</button>
                <Link to='../'>
                    <button className="game_button tysiac_button" type="submit" id="quit">Wyjdź</button>
                </Link>
            </div>
        </div>
      );
}
export default GameTysiac;

// naprawić jakiś losowy corner case
//wykryć zwyciężce