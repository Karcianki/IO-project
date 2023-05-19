import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import GamePoker, { Player } from "../src/Poker";
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));

jest.mock('../src/static/styles/poker.css', () => ({}));
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

describe("GamePoker", () => {

    test("renders the GamePoker component", () => {
        render(
            <BrowserRouter>
                <GamePoker />
            </BrowserRouter>
        );

        const headerElement = screen.getByText("POKER");
        expect(headerElement).toBeInTheDocument();
    });

});

describe('Player component', () => {
    it('renders correctly with props', () => {
        const data = {
            class: 'player-class',
            info: 'Player Info',
            nickname: 'Player Nickname',
            chips: 100
        };
        const id = 'player1';

        const { container, getByText } = render(
            <Player data={JSON.stringify(data)} id={id} />
        );

        const playerElement = container.querySelector(`#${id}`);
        expect(playerElement).toBeInTheDocument();

        const infoElement = getByText(data.info);
        expect(infoElement).toBeInTheDocument();

        const nicknameElement = getByText(data.nickname);
        expect(nicknameElement).toBeInTheDocument();

        const pointsElement = getByText(data.chips.toString());
        expect(pointsElement).toBeInTheDocument();
    });
});