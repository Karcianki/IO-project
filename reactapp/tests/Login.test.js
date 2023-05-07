import React from "react";
import { render, fireEvent, act, waitFor, screen } from "@testing-library/react";
import Login from '../src/Login';
import '@testing-library/jest-dom';

import fetchMock from 'jest-fetch-mock';

fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));

jest.mock('../src/static/styles/login.css', () => ({}));

describe("Login component", () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
      },
    });
  });


  it("should render correctly", () => {
    const { getByText, getByLabelText } = render(<Login />);
    expect(getByText("KARCIANKI")).toBeInTheDocument();
    expect(getByText("POKER")).toBeInTheDocument();
    expect(getByLabelText("Podaj numer gry:")).toBeInTheDocument();
    expect(getByLabelText("Podaj swój nick:")).toBeInTheDocument();
    expect(getByText("Dołącz do gry")).toBeInTheDocument();
  });

  it("should show error message for invalid input", () => {
    const { getByText, getByLabelText } = render(<Login />);
    const gameIdInput = getByLabelText("Podaj numer gry:");
    const nicknameInput = getByLabelText("Podaj swój nick:");
    const submitButton = getByText("Dołącz do gry");

    fireEvent.change(gameIdInput, { target: { value: "123" } });
    fireEvent.change(nicknameInput, { target: { value: "a" } });
    fireEvent.click(submitButton);

    expect(getByText("Podałeś niepoprawne dane")).toBeInTheDocument();
  });

  it("should show error message if game does not exist", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([]), status: 404 })
    );
    global.fetch = mockFetch;

    const { getByText, getByLabelText } = render(<Login />);
    const gameIdInput = getByLabelText("Podaj numer gry:");
    const nicknameInput = getByLabelText("Podaj swój nick:");
    const submitButton = getByText("Dołącz do gry");

    fireEvent.change(gameIdInput, { target: { value: "123456" } });
    fireEvent.change(nicknameInput, { target: { value: "test" } });
    fireEvent.click(submitButton);

    await act(async () => {});

    expect(getByText("Podana gra nie istnieje")).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/karcianki/players/123456/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });


  it('should send a GET request to the server and display an error message if the game does not exist', async () => {
    // Mock the response to the GET request
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
        status: 404,
      })
    );

    render(<Login />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Podaj numer gry:'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Podaj swój nick:'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Dołącz do gry'));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Podana gra nie istnieje')).toBeInTheDocument();
    });

    // Reset the mock
    global.fetch.mockRestore();
  });

  it('should send a GET request to the server and display an error message if the player is already in the game', async () => {
    // Mock the response to the GET request
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ nickname: 'test' }]),
        status: 200,
      })
    );

    render(<Login />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Podaj numer gry:'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Podaj swój nick:'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Dołącz do gry'));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Podany gracz jest już w grze')).toBeInTheDocument();
    });

    // Reset the mock
    global.fetch.mockRestore();
  });
  
});