import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './static/styles/style.css';

function GameMenu(props){
// class GameMenu extends Component {
    // render() {
        return (
            <div className="panel" id={props.id}>
                <div className="srodek">
                    <div className="tekst">{props.name}</div>
                    <div>
                        <a href='/login'>
                            <button type="submit" className="login app_button" name="game" value="poker">Dołącz do gry</button>
                        </a>
                        <a href='/host'>
                            <button type="submit" className="create app_button" name="game" value="poker">Stwórz grę</button>
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
            </div> 
        );
    // }
}

export function Test() {
    return <p>Test</p>;
}

export default App;
