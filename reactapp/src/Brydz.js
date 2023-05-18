//przygotowane pod brydza


import React, { Component, useEffect, useState } from "react";
import "./static/styles/brydz.css";
import table from './static/images/stol.png';
import {RulesBrydz} from './Rules'
import { Link, useSearchParams} from 'react-router-dom';

class TPlayer extends Component {
    render() {
        return (
            <div className={ JSON.parse(this.props.data).class } id={this.props.id}>
                <span className="fa-solid fa-circle-user ikona"></span>
                <div className="dane">
                    <div>{ JSON.parse(this.props.data).info }</div>
                    <div>{ JSON.parse(this.props.data).nickname }</div>
                    <div>{ JSON.parse(this.props.data).points }</div>
                </div>
            </div>
        )
    }
}
const GameBrydz = () => {
    return (
        <div>
        </div>
      );
}
export default GameBrydz;