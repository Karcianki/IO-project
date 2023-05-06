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

    const MAX_PLAYERS=10; 
    const chips_per_player = 100;

    const default_player_data = {
        class: "gracz hide",
        nickname: "",
        chips: chips_per_player,
    }

    const [playerData, setPlayerData] = useState(
        Array(MAX_PLAYERS).fill(JSON.stringify(default_player_data))
    );

    const django_host = 'localhost:8000'
    const connectionString = 'ws://' + django_host + '/ws/karcianki/' + game_id + '/';

    useEffect(() => {
        const gameSocket = new WebSocket(connectionString);
        gameSocket.onopen = function open() {
            console.log('WebSockets connection created.');
            // on websocket open, send the START event.
            gameSocket.send(JSON.stringify({
                "event": "JOIN",
                "message": player_number,
            }));
        };

        gameSocket.onclose = function (e) {
            console.log('Socket is closed.', e.reason);
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
                    updatePlayers();
                    break;
                case "QUIT":
                    console.log("QUIT");
                    updatePlayers();
                    break;
                default:
                    console.log("No event");
            }
        };
        const quitButton = document.getElementById('quit');
        quitButton.onclick = function() {
            fetch(`http://localhost:8000/api/karcianki/quit/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    player_number: player_number,
                    game_id: game_id,
                }),
            })
            .then(() => {
                if (gameSocket.readyState === WebSocket.OPEN) {
                    gameSocket.send(JSON.stringify({
                        "event": "JOIN",
                        "message": player_number,
                    }));
                    gameSocket.close();
                }
            })
        }

        if (gameSocket.readyState === WebSocket.OPEN) {
            gameSocket.onopen();
        }
    }, [])

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
                        <Player id="gracz1" name="chuj" data={playerData[2]} /> 
                        <Player id="gracz4" name="siur" data={playerData[4]} />
                        <Player id="gracz6" name="parówa" data={playerData[6]} />
                        <Player id="gracz8" name="kutas" data={playerData[8]} />
                    </div>
                    <div className="rzad" id="ze_stolem">
                        <Player id="gracz0" name="fiut" data={playerData[0]} />
                        <img src={table} alt="" className="stol"/>
                        <Player id="gracz1" name="idk" data={playerData[1]} />
                    </div>
                    <div className="rzad">
                        <Player id="gracz3" name="idk" data={playerData[3]} />
                        <Player id="gracz5" name="idk" data={playerData[5]} />
                        <Player id="gracz7" name="idk" data={playerData[7]} />
                        <Player id="gracz9" name="idk" data={playerData[9]} />
                    </div>
                </div>

                <div className={showRules? "zasady show" : "zasady"}>
                    Zasady
                </div>

                <div className="opcje">
                    <button type="submit">Pass</button>
                    <button type="submit">Sprawdź</button>
                    <form>
                        <input type="number" step="5" className="licytuj" min="0" max="10000"/>
                        <button type="submit">Postaw</button>
                    </form>
                    <Link to='../'>
                        <button type="submit" id="quit">Wyjdź</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Game;