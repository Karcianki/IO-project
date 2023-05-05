import React, { Component, useState } from "react";
import "./static/styles/login.css"

class Login extends Component {
    state = {
        game_id: '',
        nickname: '',
        errors: {},
      };
    
      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
      handleSubmit = (event) => {
        
      };

    render () {
        const { game_id, nickname } = this.state;
        return (
        <div>
            <header>
                Karcianki
            </header>
            <div class="panel" id="poker">
                <div class="game_form">
                    <div class="game_name">
                        POKER
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="game_id">Podaj numer gry:</label>
                            <input
                            type="number"
                            id="game_id"
                            name="game_id"
                            placeholder="123456"
                            value={game_id}
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
                            />
                            <p className="help-text">
                            Twój nick powinien zawierać tylko małe litery i mieć długość od 4 do
                            10 znaków
                            </p>
                        </div>
                        <button type="submit">Dołącz do gry</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default Login;

