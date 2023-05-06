import React, { Component, useEffect, useState } from "react";
import "./static/styles/poker.css";
import table from './static/images/stol.png';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

class Player extends Component {
    render() {
        return (
            <div className={ JSON.parse(this.props.data).class } id={this.props.id}>
                <span className="fa-solid fa-circle-user ikona"></span>
                <div className="dane">
                    <div>{ JSON.parse(this.props.data).last_bet }</div>
                    <div>{ JSON.parse(this.props.data).nickname }</div>
                    <div>{ JSON.parse(this.props.data).chips }</div>
                </div>
            </div>
        )
    }
}

const Game = () => {
    const [showRules, setShowRules] = useState(false);
    
    const [searchParams] = useSearchParams();
    const game_id = searchParams.get('game_id');
    const player_number = searchParams.get('player_number');
    const [whoseTurn, setWhoseTurn] = useState(3);
    const [lastBet, setLastBet] = useState(0);
    const [bidValue, setBidValue] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    const MAX_PLAYERS=10; 
    const chips_per_player = 100;

    const default_player_data = {
        class: "gracz hide",
        nickname: "",
        chips: chips_per_player,
        last_bet: "",
    }

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
            if (e.code === 1000) {
                console.log('Reconnecting...');
                setTimeout(function () {
                    gameSocket = new WebSocket(connectionString);
                    gameSocket.onopen()
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
            switch (event) {
                case "JOIN":
                    console.log("JOIN");
                    updateState();
                    break;
                case "QUIT":
                    console.log("QUIT");
                    updateState();
                    break;
                case "TURN":
                    console.log("TURN " + message);
                    let info = JSON.parse(message);
                    setWhoseTurn(info.player_number);
                    setLastBet(info.last_bet);
                    updateState();
                    break;
                default:
                    console.log("No event");
            }
        };
        const quitButton = document.getElementById('quit');
        quitButton.onclick = function() {
            gameSocket.send(JSON.stringify({
                "event": "QUIT",
                "message": player_number,
            }));
            gameSocket.onclose({
                'code': 3000,
            });
        }

        const passButton = document.getElementById('pass');
        passButton.onclick = function() {
            console.log(whoseTurn + ' ' + player_number);
            if (whoseTurn != player_number) {
                console.log("returning");
                return;
            }
            console.log("sending TURN to socket");
            gameSocket.send(JSON.stringify({
                "event": "TURN",
                "message": JSON.stringify({
                    "player_number": player_number,
                    "type": "PASS",
                })
            }));
        }

        const startButton = document.getElementById('start');
        startButton.onclick = function () {
            gameSocket.send(JSON.stringify({
                "event": "START",
                "message": '',
            }));
        }

        const checkButton = document.getElementById('check');
        checkButton.onclick = function() {
            if (whoseTurn !== player_number) {
               return; 
            }
            gameSocket.send(JSON.stringify({
                "event": "TURN",
                "message": JSON.stringify({
                    "player_number": player_number,
                    "type": "BET",
                    "bet": 0,
                })
            }));
        }

        const betButton = document.getElementById('bet');
        betButton.onbet = function(value) {
            console.log("bet submit");
            console.log(value);
            gameSocket.send(JSON.stringify({
                "event": "TURN",
                "message": JSON.stringify({
                    "player_number": player_number,
                    "type": "BET",
                    "bet": value,
                })
            }));
        }

        if (gameSocket.readyState === WebSocket.OPEN) {
            gameSocket.onopen();
        }
    }, [])

    const updateState = () => {
        updatePlayers();
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
                        "class": "gracz",
                        "nickname": data[i].nickname,
                        "chips": data[i].chips,
                        "last_bet": data[i].last_bet,
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

    useEffect(() => {
        console.log("did update? " + bidValue); 
    }, [bidValue])

    const toggleRules = () => {
        setShowRules(!showRules);
    };

    const onBidChange = (event) => {
        console.log("bid change "  + event.target.value);
        setBidValue(event.target.value);
        console.log(bidValue);
    }

    const onBidClick = (event) => {
        console.log("sending " + bidValue);
        const betButton = document.getElementById('bet');
        betButton.onbet(bidValue); 
    }
    const setStarted = () => {
        setIsStarted(!isStarted);
    };

    return (
        <div>
            <header>
                <div>
                    Poker
                </div>
                <div>
                    Numer gry {game_id}
                </div>
                <button onClick={toggleRules} type="submit" aria-label="info"><span className="fa-solid fa-question"></span></button>
            </header>

            <div className="page">
                <div className="plansza" id="game_board" game_id={game_id}>
                    <div className="rzad">
                        <Player id="gracz1" data={playerData[2]} /> 
                        <Player id="gracz4" data={playerData[4]} />
                        <Player id="gracz6" data={playerData[6]} />
                        <Player id="gracz8" data={playerData[8]} />
                    </div>
                    <div className="rzad" id="ze_stolem">
                        <Player id="gracz0" data={playerData[0]} />
                        <img src={table} alt="" className="stol"/>
                        <Player id="gracz1" data={playerData[1]} />
                    </div>
                    <div className="rzad">
                        <Player id="gracz3" data={playerData[3]} />
                        <Player id="gracz5" data={playerData[5]} />
                        <Player id="gracz7" data={playerData[7]} />
                        <Player id="gracz9" data={playerData[9]} />
                    </div>
                </div>

                <div className={showRules? "zasady show" : "zasady"}>
                    Zasady
                </div>

                <div className="opcje">
                    <div className = "host" id="start">
                       {player_number == 0 && isStarted == false && <button onClick={setStarted} type="submit" id="check">Start</button>}
                    </div>
                    <button type="submit" id="pass">Pass</button>
                    <button type="submit" id="check">Sprawdź</button>
                    <input type="number" step="5" className="licytuj" min="0" max="10000" onChange={onBidChange} />
                    <button id="bet" onClick={onBidClick}>Postaw</button>
                    <Link to='../'>
                        <button type="submit" id="quit">Wyjdź</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Game;
