import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './static/styles/style.css'

class GameMenu extends Component {
    render() {
        return (
            <div className="panel" id={this.props.id}>
                <div className="srodek">
                    <div className="tekst">{this.props.name}</div>
                    <div>
                        <Link to='/login'>
                            <button type="submit" className="login app_button" name="game" value="poker">Dołącz do gry</button>
                        </Link>
                        <Link to='/host'>
                            <button type="submit" className="create app_button" name="game" value="poker">Stwórz grę</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

class App extends Component {
    render () {
        return (
            <div className="page">
                <header> KARCIANKI </header>
                <GameMenu id="poker" name="POKER"/>
            </div> 
        );
    }
}

export default App;