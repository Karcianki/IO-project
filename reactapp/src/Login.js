import React, { useState } from "react";
import "./static/styles/login.css";

const Login = () => {
    const [game_id, setGameId]        = useState("");
    const [nickname, setNickname]     = useState("");
    const [is_valid, setIsValid]      = useState(true);
    const [inGame, setInGame]         = useState(false);
    const [gameExists, setGameExists] = useState(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "game_id") {
            setGameId(value);
        } else if (name === "nickname") {
            setNickname(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const gameReg = /^\d{6}$/;
        const nickReg = /^[a-z]{4,10}$/;

        if (!gameReg.test(game_id) || !nickReg.test(nickname)) {
            setIsValid(false);
        } else {
            fetch(`http://localhost:8000/api/karcianki/players/${game_id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                if (response.status === 404) {
                    setGameExists(false);
                } else {
                    return response.json()
                }
            })
            .then((data) => {
                if (gameExists) 
                    setInGame(data.some(player => player.nickname === nickname));
            })
        }

        if (gameExists) {
            fetch(`http://localhost:8000/api/karcianki/join/`, {
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
                window.location.href = `/poker?game_id=${game_id}`;
            })
        }
    };

    return (
        <div>
        <header>Karcianki</header>
        <div className="panel" id="poker">
            <div className="game_form">
            <div className="game_name">POKER</div>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="game_id">Podaj numer gry:</label>
                <input
                    type="number"
                    id="game_id"
                    name="game_id"
                    placeholder="123456"
                    value={game_id}
                    onChange={handleInputChange}
                />
                </div>
                <div>
                <label htmlFor="nickname">Podaj swój nick:</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="Nick gracza"
                    value={nickname}
                    onChange={handleInputChange}
                />
                <p className="help-text">
                    Numer gry powinien zawierać 6 cyfr.
                </p>
                <p className="help-text">
                    Twój nick powinien zawierać tylko małe litery i mieć długość od 4 do
                    10 znaków
                </p>
                {is_valid ? <p></p> : <p style={{color:"red"}}>Podałeś niepoprawne dane</p>}
                {inGame ? <p style={{color:"red"}}>Podany gracz jest już w grze</p> : <p></p>}
                {gameExists ? <p></p> : <p style={{color:"red"}}>Podana gra nie istnieje</p>}
                </div>
                <button type="submit">Dołącz do gry</button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Login;