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
                    <div>{ JSON.parse(this.props.data).info }</div>
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
    const [whoseTurn, setWhoseTurn] = useState(0);
    const [player, setNickane ] = useState('') //domyslnie ustawic hosta
    const [lastBet, setLastBet] = useState(0);
    const [bidValue, setBidValue] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [nextStage, setNextStage] = useState(false);

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
            receive(event, message);
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
                        "info": data[i].info,
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

                let nickname = info.nickname
                setNickane(nickname)

                setLastBet(info.last_bet);
                break;
            case "NEXT":
                setNextStage(false);
                //ustawic host jako nickname
                break;
            case "START":
                setIsStarted(false);
                break;
            case "END":
                break;
            default:
                console.log("No event");
        }
    }

    const onStart = () => {
        setIsStarted(true);
        gameBoard.send("START", '');
    }

    const onNext = () => {
        setNextStage(true);
        //ustawic kolejna osobe po hoscie
        gameBoard.send("NEXT", '');
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
        gameBoard.send("TURN", message);
    }

    const onCheck = () => {
        console.log("check " + whoseTurn + player_number);
        let data = JSON.parse(playerData[whoseTurn]).last_bet 
        let value =  lastBet - data
        
        console.log(value)
        if (whoseTurn != player_number) {
            return;
        }
        const message = JSON.stringify({
            "player_number": player_number,
            "type": "CHECK",
            "bet": value,
        });
        gameBoard.send("TURN", message);
    }

    const onBidChange = (event) => {
        setBidValue(event.target.value);
    }

    const onBidClick = (event) => {
        console.log("bid " + bidValue + ' ' + whoseTurn + ' ' + player_number )
        if (whoseTurn !== player_number) {
            return;
        }
        const message = JSON.stringify({
            "player_number": player_number,
            "type": "BET",
            "bet": bidValue,
        });
        gameBoard.send("TURN", message); 
    }
    // Maciek w consumers sprawdza i bierze maxa z Twoich żetonów, beta więc tu już nie trzeba tego robic 
    return (
        <div>
            <header>
                <div>
                    Poker<br />
                    {player} <br />
                    {whoseTurn}
                </div>
                <div>
                    Numer gry {game_id}
                </div>
                <button onClick={toggleRules} type="submit" aria-label="info" className="game_button"><span className="fa-solid fa-question"></span></button>
            </header>

            <div className="page_game">
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
                       {player_number == 0 && isStarted == false && <button onClick={onStart} className="game_button poker_button" type="submit" id="start">Start</button>}
                    </div>
                    <div className = "host_next" id="next">
                    {player_number == 0 && nextStage == false && <button onClick={onNext} className="game_button poker_button" type="submit" id="next">Next</button>}
                    </div>
                    <button className="game_button poker_button" type="submit" id="pass" onClick={onPass}>Pass</button>
                    <button className="game_button poker_button" type="submit" id="check" onClick={onCheck}>Sprawdź</button>
                    <input type="number" step="5" className="licytuj" min="0" max="10000" onChange={onBidChange} />
                    <button className="game_button poker_button" id="bet" onClick={onBidClick}>Postaw</button>
                    <Link to='../'>
                        <button className="game_button poker_button" type="submit" id="quit">Wyjdź</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Game;
