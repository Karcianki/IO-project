import React, { Component, useEffect, useState } from "react";
import "./static/styles/tysiac.css";
import table from './static/images/stol.png';
import {RulesTysiac} from './Rules'
import { Link, useSearchParams} from 'react-router-dom';

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
const GameTysiac = () => {

    const [showRules, setShowRules] = useState(false);
    
    const [searchParams] = useSearchParams();
    const game_id = searchParams.get('game_id');
    const [player, setNickname ] = useState('')
    const player_number = searchParams.get('player_number');
    const [whoseTurn, setWhoseTurn] = useState(0);
    const [lastBet, setLastBet] = useState(0);
    const [bidValue, setBidValue] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
 
    const default_player_data = {
        class: "gracz hide",
        nickname: "",
        points: "",
        last_bet: "",
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
        fetch(`http://localhost:8000/api/karcianki/game/${game_id}/tysiac`, {
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
                setWhoseTurn(data.player_number);
                console.log(data);
                setIsStarted(data.status != "START");
                setLastBet(data.last_bet);
            }
            else {
                alert("Gra się zakończyła.");
            }
        })
    }

    const updatePlayers = () => {
        fetch(`http://localhost:8000/api/karcianki/players/${game_id}/tysiac`, {
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
                        "points": data[i].points,
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

    const toggleRules = () => {
        setShowRules(!showRules);
    };

    const gameBoard = document.getElementById('game_board');

    const receive = (event, message) => {
        console.log(event + " -> " + message);
        updateState();
        switch (event) {
            case "TTURN":
                let info = JSON.parse(message);
                setWhoseTurn(info.player_number);
                let nickname = info.nickname
                setNickname(nickname)
                break;
            case "TSTART":
                setIsStarted(false);
                break;
            case "TEND":
                break;
            default:
                console.log("No event");
        }
    }

    const onStart = () => {
        setIsStarted(true);
        gameBoard.send("TSTART", '');
    }
    const onWriteResults = () => {
        let players =' ';
        for (let i = 0; i < 4; i++) {
            let player = {
                "id": i,
                "points": 100,
            }
            players.append(player);
            // newData[data[i].player_number] = JSON.stringify(player_data);
        }
        
        const message = JSON.stringify({
            "players": players
        });

        gameBoard.send("TPLAY", message);
    }

    //dać hostowi mozliwosc wpisania punktow

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
        if (whoseTurn != player_number || bidValue < lastBet) {
            return;
        }
        const player_data = JSON.parse(playerData[player_number]);
        if (player_data.chips < bidValue) {
            console.log("Not enough chips.");
            return;
        }
        const message = JSON.stringify({
            "player_number": player_number,
            "type": "BET",
            "bet": bidValue,
        });
        gameBoard.send("TTURN", message); 
    }

    return (
        <div>
          <header>
            <div>
            TYSIĄC
            </div>
            <div className="game_header">
                player: {player} <br />
                number: {whoseTurn} <br />
                Numer gry {game_id}
            </div>
            <button onClick={toggleRules} type="submit" aria-label="info" className="game_button"><span className="fa-solid fa-question"></span></button>
          </header>
          <div className="page_game">
            <div className="plansza" id="game_board" game_id={game_id}>
                <div className="rzad">
                    <Player id="gracz1" data={playerData[1]} /> 
                    {/* <Player id="gracz4" data={playerData[2]} /> */}
                    {/* <Player id="gracz6" data={playerData[3]} /> */}
                    {/* <Player id="gracz8" data={playerData[4]} /> */}
                </div>
                <div className="rzad" id="ze_stolem">
                    <Player id="gracz0" data={playerData[0]} />
                    <img src={table} alt="" className="stol"/>
                    <Player id="gracz2" data={playerData[2]} />
                </div>
                <div className="rzad">
                    <Player id="gracz3" data={playerData[3]} />
                    {/* <Player id="gracz5" data={playerData[8]} /> */}
                    {/* <Player id="gracz7" data={playerData[7]} /> */}
                    {/* <Player id="gracz9" data={playerData[6]} /> */}
                    </div>
                </div>
            </div>
            <div className={showRules? "zasady show" : "zasady"}>
                    <RulesTysiac />
            </div>
            <div className="opcje">
                <div className = "host" id="start">
                    {player_number == 0 && isStarted == false && <button onClick={onStart} className="game_button tysiac_button" type="submit" id="start">Start</button>}
                    {player_number == 0 && 
                    <form>
                        Pierwszy :<input type="number" step="5" className="licytuj" onChange={onBidChange(1)}></input> 
                        Drugi: <input type="number" step="5" className="licytuj"></input> 
                        Trzeci: <input type="number" step="5" className="licytuj"></input> 
                        Czwarty: <input type="number" step="5" className="licytuj"></input> 
                    <button onClick={onWriteResults} 
                    className="result_button tysiac_button"
                    type="submit" id="start">Wysślij</button>
                    </form>
                    }
                </div>
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