import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Game extends Component {
    render() {
        return (
            <div class="panel" id={this.props.id}>
                <div class="srodek">
                    <div class="tekst">{this.props.name}</div>
                    <div>
                        <Link to='/join'>
                            <button type="submit" class="login" name="game" value="poker">Dołącz do gry</button>
                        </Link>
                        <Link to='/host'>
                            <button type="submit" class="create" name="game" value="poker">Stwórz grę</button>
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
            <div class="page">
                <header> KARCIANKI </header>
                <Game id="poker" name="POKER"/>
                <Game id="brydz" name="BRYDŻ"/>
                <Game id="tysiac" name="TYSIĄC"/>
            </div> 
        );
    }
}

export default App;