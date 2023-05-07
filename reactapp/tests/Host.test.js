import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Host from '../src/Host';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));

jest.mock('../src/static/styles/login.css', () => ({}));

describe("Host component", () => {


  it("should render the form inputs and button", () => {
    render(<Host />);
    const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
    const nicknameInput = screen.getByLabelText("Podaj swój nick:");
    const submitButton = screen.getByRole("button", { name: "Stwórz grę" });
    expect(chipsInput).toBeInTheDocument();
    expect(nicknameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should validate inputs and show error message", async () => {
    render(<Host />);
    const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
    const nicknameInput = screen.getByLabelText("Podaj swój nick:");
    const submitButton = screen.getByRole("button", { name: "Stwórz grę" });

    // try to submit form with invalid inputs
    fireEvent.change(chipsInput, { target: { value: "1" } });
    fireEvent.change(nicknameInput, { target: { value: "nick" } });
    fireEvent.click(submitButton);

    // wait for fetch to complete and error message to appear
    await waitFor(() => expect(screen.getByText("Podałeś niepoprawne dane")).toBeInTheDocument());
  });

  it("should submit form with valid inputs and redirect", async () => {
    render(<Host />);
    const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
    const nicknameInput = screen.getByLabelText("Podaj swój nick:");
    const submitButton = screen.getByRole("button", { name: "Stwórz grę" });

    // try to submit form with valid inputs
    fireEvent.change(chipsInput, { target: { value: "100" } });
    fireEvent.change(nicknameInput, { target: { value: "my-nick" } });
    fireEvent.click(submitButton);

  });

 
});