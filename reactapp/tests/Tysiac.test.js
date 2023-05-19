import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, act, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import GameTysiac, { TPlayer } from "../src/Tysiac";
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));

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

describe("GameTysiac component", () => {
  test("renders the GameTysiac component", () => {
    render(
      <BrowserRouter>
        <GameTysiac />
      </BrowserRouter>
    );

    const headerElement = screen.getByText("TYSIĄC");
    expect(headerElement).toBeInTheDocument();
  });

  test('renders game header', () => {
    const { getByText } = render(<BrowserRouter><GameTysiac /></BrowserRouter>);
    const gameHeader = getByText('TYSIĄC');
    expect(gameHeader).toBeInTheDocument();
  });
});

describe('TPlayer component', () => {
  it('renders correctly with props', () => {
    const data = {
      class: 'player-class',
      info: 'Player Info',
      nickname: 'Player Nickname',
      points: 100
    };
    const id = 'player1';

    const { container, getByText } = render(
      <TPlayer data={JSON.stringify(data)} id={id} />
    );

    const playerElement = container.querySelector(`#${id}`);
    expect(playerElement).toBeInTheDocument();

    const infoElement = getByText(data.info);
    expect(infoElement).toBeInTheDocument();

    const nicknameElement = getByText(data.nickname);
    expect(nicknameElement).toBeInTheDocument();

    const pointsElement = getByText(data.points.toString());
    expect(pointsElement).toBeInTheDocument();
  });
});
