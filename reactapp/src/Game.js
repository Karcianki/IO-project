import React, { Component, useState } from "react";
import "./static/styles/poker.css";
import table from './static/images/stol.png';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

class Player extends Component {
    render() {
        return (
            <div className="gracz" id={this.props.id}>
                <span className="fa-solid fa-circle-user ikona"></span>
                <div className="dane">
                    {this.props.name}
                </div>
            </div>
        )
    }
}

const Game = () => {
    const [showRules, setShowRules] = useState(false);

    const [searchParams] = useSearchParams();
    const game_id = searchParams.get('game_id');

    const django_host = 'localhost:8000'
    const connectionString = 'ws://' + django_host + '/ws/karcianki/' + game_id + '/';
    const gameSocket = new WebSocket(connectionString);

    function connect() {
        gameSocket.onopen = function open() {
            console.log('WebSockets connection created.');
            // on websocket open, send the START event.
            gameSocket.send(JSON.stringify({
                "event": "JOIN",
                "message": ""
            }));
        };

        gameSocket.onclose = function (e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            console.log(gameSocket.onclose)
            gameSocket.send(JSON.stringify({
                "event": "QUIT",
                "message": ""
            }));
            setTimeout(function () {
                connect();
            }, 1000);
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
                    break;
                case "QUIT":
                    console.log("QUIT");
                    break;
                default:
                    console.log("No event");
            }
        };
        if (gameSocket.readyState === WebSocket.OPEN) {
            gameSocket.onopen();
        }
    }

    //call the connect function at the start.
    connect();

    const toggleRules = () => {
        setShowRules(!showRules);
    };

    const quit = () => {
        alert("sending quit");
        gameSocket.send(JSON.stringify({
            "event": "QUIT",
            "message": ""
        })); 
        alert("quit sent");
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
                        <Player id="gracz1" name="chuj" /> 
                        <Player id="gracz4" name="siur" />
                        <Player id="gracz6" name="parówa" />
                        <Player id="gracz8" name="kutas" />
                    </div>
                    <div className="rzad" id="ze_stolem">
                        <Player id="gracz0" name="fiut" />
                        <img src={table} alt="" className="stol"/>
                        <Player id="gracz1" name="idk" />
                    </div>
                    <div className="rzad">
                        <Player id="gracz3" name="idk" />
                        <Player id="gracz5" name="idk" />
                        <Player id="gracz7" name="idk" />
                        <Player id="gracz9" name="idk" />
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
                        <button onClick={quit} type="submit" id="quit">Wyjdź</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Game;
