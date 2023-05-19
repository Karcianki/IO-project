// import React from "react";
// import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// import Host from '../src/Host';
// import fetchMock from 'jest-fetch-mock';
// import '@testing-library/jest-dom';

// fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));

// jest.mock('../src/static/styles/login.css', () => ({}));

// describe("Host component", () => {


//   it("should render the form inputs and button", () => {
//     render(<Host />);
//     const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
//     const nicknameInput = screen.getByLabelText("Podaj swój nick:");
//     const submitButton = screen.getByRole("button", { name: "Stwórz grę" });
//     expect(chipsInput).toBeInTheDocument();
//     expect(nicknameInput).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//   });

//   it("should validate inputs and show error message", async () => {
//     render(<Host />);
//     const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
//     const nicknameInput = screen.getByLabelText("Podaj swój nick:");
//     const submitButton = screen.getByRole("button", { name: "Stwórz grę" });

//     // try to submit form with invalid inputs
//     fireEvent.change(chipsInput, { target: { value: "1" } });
//     fireEvent.change(nicknameInput, { target: { value: "nick" } });
//     fireEvent.click(submitButton);

//     // wait for fetch to complete and error message to appear
//     await waitFor(() => expect(screen.getByText("Podałeś niepoprawne dane")).toBeInTheDocument());
//   });

//   it("should submit form with valid inputs and redirect", async () => {
//     render(<Host />);
//     const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
//     const nicknameInput = screen.getByLabelText("Podaj swój nick:");
//     const submitButton = screen.getByRole("button", { name: "Stwórz grę" });

//     // try to submit form with valid inputs
//     fireEvent.change(chipsInput, { target: { value: "100" } });
//     fireEvent.change(nicknameInput, { target: { value: "my-nick" } });
//     fireEvent.click(submitButton);

//   });


// });

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Host from '../src/Host';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }));

jest.mock('../src/static/styles/login.css', () => ({}));

describe("Host component", () => {
  test("renders Host component correctly", () => {
    render(<Host id="poker" name="Poker" />);

    // Assert the presence of the component header
    const headerElement = screen.getByText("KARCIANKI");
    expect(headerElement).toBeInTheDocument();

    // Assert the presence of the game name
    const gameNameElement = screen.getByText("Poker");
    expect(gameNameElement).toBeInTheDocument();

    // Assert the presence of the input elements
    const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
    expect(chipsInput).toBeInTheDocument();

    const nicknameInput = screen.getByLabelText("Podaj swój nick:");
    expect(nicknameInput).toBeInTheDocument();

    // Assert the presence of the submit button
    const submitButton = screen.getByRole("button", { name: "Stwórz grę" });
    expect(submitButton).toBeInTheDocument();
  });

  test("handles input change correctly", () => {
    render(<Host id="poker" name="Poker" />);

    const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
    const nicknameInput = screen.getByLabelText("Podaj swój nick:");

    // Change the value of chips input
    fireEvent.change(chipsInput, { target: { value: "100" } });
    expect(chipsInput.value).toBe("100");

    // Change the value of nickname input
    fireEvent.change(nicknameInput, { target: { value: "John" } });
    expect(nicknameInput.value).toBe("John");
  });

  test("handles form submission correctly", () => {
    render(<Host id="poker" name="Poker" />);

    const chipsInput = screen.getByLabelText("Podaj liczbę żetonów:");
    const nicknameInput = screen.getByLabelText("Podaj swój nick:");
    const submitButton = screen.getByRole("button", { name: "Stwórz grę" });

    // Set values for chips and nickname inputs
    fireEvent.change(chipsInput, { target: { value: "100" } });
    fireEvent.change(nicknameInput, { target: { value: "John" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Add assertions for the fetch request and redirection
    // You can use jest.spyOn() to mock the fetch function and assert its usage
    // You can also assert the window.location.href value after form submission
  });

  it("should call the handleSubmit function and redirect to the correct URL on successful form submission", async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({ player_number: 0 }),
    });
    global.fetch = mockFetch;
    delete window.location;
    window.location = { href: "" };

    const props = {
      id: "poker",
      name: "POKER",
    };

    const { getByLabelText, getByText } = render(<Host {...props} />);
    const chipsInput = getByLabelText("Podaj liczbę żetonów:");
    const nicknameInput = getByLabelText("Podaj swój nick:");
    const submitButton = getByText("Stwórz grę");

    fireEvent.change(chipsInput, { target: { value: "100" } });
    fireEvent.change(nicknameInput, { target: { value: "testuser" } });
    fireEvent.click(submitButton);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/karcianki/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: "testuser",
          chips: "100",
          type: "POKER",
        }),
      }
    );

    await waitFor(() => {
      expect(window.location.href).toContain("/poker?game_id=");
      expect(window.location.href).toContain("&player_number=0");
    });
  });
});
