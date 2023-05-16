import React, { useState } from "react";
import "./static/styles/login.css";


function Host(props) {
    const [chips, setChips] = useState("");
    const [nickname, setNickname] = useState("");
    const [isValid, setIsValid] = useState(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "chips") {
            setChips(value);
        } else if (name === "nickname") {
            setNickname(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const chipsReg = /^\d{2,6}$/;
        const nickReg = /^[a-z]{4,10}$/;

        if (!chipsReg.test(chips) || !nickReg.test(nickname)) {
            setIsValid(false);
        } else {
            fetch(`http://localhost:8000/api/karcianki/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: nickname,
                    chips: chips,
                    type: props.id.toUpperCase(),
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                window.location.href = `/${props.id}?game_id=${data.game_id}&player_number=${0}`;
            })
        }
    };

    const classId = `${props.id}_login`;

    return (
        <div>
        <header>KARCIANKI</header>
        <div className="panel" id={classId}>
            <div className="game_form">
            <div className="game_name">{props.name}</div>
            <form onSubmit={handleSubmit}>
                { props.id == "poker" &&
                <div>
                <label htmlFor="chips">Podaj liczbę żetonów:</label>
                <input
                    type="number"
                    id="chips"
                    name="chips"
                    placeholder="10"
                    value={chips}
                    onChange={handleInputChange}
                />
                </div>
                }
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
                </div>
                { props.id == "poker" &&
                <div>
                <p className="help-text">
                    Liczba żetonów powinna być z zakresu od 10 do 1000000
                </p>
                </div>
                }
                <div>
                <p className="help-text">
                    Twój nick powinien zawierać tylko małe litery i mieć długość od 4 do
                    10 znaków
                </p>
                {isValid ? <p></p> : <p style={{color:"red"}}>Podałeś niepoprawne dane</p>}
                </div>
                <button type="submit">Stwórz grę</button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Host;