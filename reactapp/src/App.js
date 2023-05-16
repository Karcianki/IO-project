import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './static/styles/style.css';

function GameMenu(props){
// class GameMenu extends Component {
    // render() {
    const loginUrl = `${props.id}/login`
    const hostUrl = `${props.id}/host`

        return (
            <div className="panel" id={props.id}>
                <div className="srodek">
                    <div className="tekst">{props.name}</div>
                    <div>
                        <a href={loginUrl}>
                            <button type="submit" className="login app_button" name="game" value={props.id}>Dołącz do gry</button>
                        </a>
                        <a href={hostUrl}>
                            <button type="submit" className="create app_button" name="game" value={props.id}>Stwórz grę</button>
                        </a>
                    </div>
                </div>
            </div>
        )
    // }
}

function App() {
    // render () {
        return (
            <div className="page">
                <header> KARCIANKI </header>
                <GameMenu id="poker" name="POKER"/>
                <GameMenu id="tysiac" name="TYSIĄC"/>
                <GameMenu id="brydz" name="BRYDŻ"/>
            </div> 
        );
    // }
}

export default App;
