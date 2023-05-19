import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';
import Login from '../src/Login';
import Host from '../src/Host';
import GamePoker from '../src/Poker';
import GameTysiac from '../src/Tysiac';
import fetchMock from 'jest-fetch-mock';

fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));



jest.mock('../src/static/styles/style.css', () => ({}));
jest.mock('../src/static/styles/login.css', () => ({}));
jest.mock('../src/static/styles/poker.css', () => ({}));
jest.mock('../src/static/styles/tysiac.css', () => ({}));
jest.mock('../src/static/images/stol.png', () => ({}));

jest.mock('../src/static/images/poker_hands/Flush.png', () => ({}));
jest.mock('../src/static/images/poker_hands/Full.png', () => ({}));
jest.mock('../src/static/images/poker_hands/No_Pair.png', () => ({}));
jest.mock('../src/static/images/poker_hands/One_Pair.png', () => ({}));
jest.mock('../src/static/images/poker_hands/Poker.png', () => ({}));
jest.mock('../src/static/images/poker_hands/Royal_Flush.png', () => ({}));
jest.mock('../src/static/images/poker_hands/Straight.png', () => ({}));
jest.mock('../src/static/images/poker_hands/Straight_Flush.png', () => ({}));
jest.mock('../src/static/images/poker_hands/Three_of_a_kind.png', () => ({}));
jest.mock('../src/static/images/poker_hands/Two_Pairs.png', () => ({}));

describe('App', () => {
  test('renders App component', () => {
    render(
      <App />
    );
  });
});

describe('Login', () => {
  test('renders Login component for poker', () => {
    render(
      <Login id="poker" name="POKER" />
    );
  });
  test('renders Login component for tysiac', () => {
    render(
      <Login id="tysiac" name="TYSIĄC" />
    );
  });
  test('renders Login component for brydz', () => {
    render(
      <Login id="brydz" name="BRYDŻ" />
    );
  });
});

describe('Host', () => {
  test('renders Host component for poker', () => {
    render(
      <Host id="poker" name="POKER"/>
    );
  });
  test('renders Host component for tysiac', () => {
    render(
      <Host id="tysiac" name="TYSIĄC"/>
    );
  });
  test('renders Host component for brydz', () => {
    render(
      <Host id="brydz" name="BRYDŻ"/>
    );
  });
});

describe('GamePoker', () => {
  test('renders GamePoker component', () => {
    render(
      <BrowserRouter>
        <GamePoker />
      </BrowserRouter>
    );
  });
});

describe('GameTysiac', () => {
  test('renders GameTysiac component', () => {
    render(
      <BrowserRouter>
        <GameTysiac />
      </BrowserRouter>
    );
  });
});