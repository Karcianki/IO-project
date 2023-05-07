import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';
import Login from '../src/Login';
import Host from '../src/Host';
import Game from '../src/Game';
import fetchMock from 'jest-fetch-mock';

fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));



jest.mock('../src/static/styles/style.css', () => ({}));
jest.mock('../src/static/styles/login.css', () => ({}));
jest.mock('../src/static/styles/poker.css', () => ({}));
jest.mock('../src/static/images/stol.png', ()=>({}));

jest.mock('../src/static/images/poker_hands/Flush.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/Full.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/No_Pair.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/One_Pair.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/Poker.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/Royal_Flush.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/Straight.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/Straight_Flush.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/Three_of_a_kind.png', ()=>({}));
jest.mock('../src/static/images/poker_hands/Two_Pairs.png', ()=>({}));

describe('App', () => {
    test('renders App component', () => {
        render(
          <App />
      );
    });
  });
  
  describe('Login', () => {
    test('renders Login component', () => {
       render(
                <Login />
            );
     });
  });
  
  describe('Host', () => {
    test('renders Host component', () => {
      render(
          <Host />
      );
    });
  });
  
  describe('Game', () => {
    test('renders Game component', () => {
      render(
        <BrowserRouter>
          <Game name="POKER" />
        </BrowserRouter>
      );
    });
  });