import React, { Component, useEffect, useState } from "react";
import "./static/styles/poker.css";
import table from './static/images/stol.png';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

class Player extends Component {
    render() {
        return (
            <div className={this.props.class} id={this.props.id}>
                <span className="fa-solid fa-circle-user ikona"></span>
                <div className="dane">
                    { this.props.name }
                </div>
            </div>
        )
    }
}

const Game = () => {
    const [showRules, setShowRules] = useState(false);
    const [players, setPlayers] = useState([]);

    const [searchParams] = useSearchParams();
    const game_id = searchParams.get('game_id');
    const nickname = searchParams.get('nickname');

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
            console.log('Socket is closed.', e.reason);
            // setTimeout(function () {
            //     connect();
            // }, 1000);
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
                    window.location.reload();
                    break;
                case "QUIT":
                    console.log("QUIT");
                    window.location.reload();
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
        fetch(`http://localhost:8000/api/karcianki/quit/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: nickname,
                game_id: game_id
            }),
        })
        .then(() => {
            gameSocket.send(JSON.stringify({
                "event": "QUIT",
                "message": ""
            })); 
            gameSocket.close();
        })
    };

    const update = () => {
        fetch(`http://localhost:8000/api/karcianki/players/${game_id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(data => setPlayers(data));
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/karcianki/players/${game_id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(data => setPlayers(data));
    }, [game_id]);

    function makePlayers() {
        const playersDisplay = [];
        var pls = [];
        for (let i = 0; i < 10; i++) {
            if (i < players.length) {
                pls.push(<Player id={`gracz${i}`} name={players[i].nickname}></Player>);
            } else {
                pls.push("");
            }
        }

        playersDisplay.push(
        <div className="rzad">
            {pls[0]}
            {pls[1]}
            {pls[2]}
            {pls[3]}
        </div>
        );

        playersDisplay.push(
            <div className="rzad" id="ze_stolem">
            {pls[4]}
            <img src={table} alt="" className="stol"/>
            {pls[5]}
        </div>);

        playersDisplay.push(
        <div className="rzad">
            {pls[6]}
            {pls[7]}
            {pls[8]}
            {pls[9]}
        </div>);

        return playersDisplay;
    }

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
                    {makePlayers()}
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
