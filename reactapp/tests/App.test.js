import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import {Test} from '../src/App';
import '@testing-library/jest-dom';

jest.mock('../src/static/styles/style.css', () => ({}));


describe('App', () => {
    test('renders with the correct text content', () => {
        render(
                <App />
        );
        
        const headerElement = screen.getByText('KARCIANKI');
        expect(headerElement).toBeInTheDocument();

        const nameElementP = screen.getByText('POKER');
        expect(nameElementP).toBeInTheDocument();

        const nameElementT = screen.getByText('TYSIĄC');
        expect(nameElementT).toBeInTheDocument();

        const nameElementB = screen.getByText('BRYDŻ');
        expect(nameElementB).toBeInTheDocument();

        const loginButtons = screen.getAllByRole('button', { name: 'Dołącz do gry' });
        expect(loginButtons.length).toBe(3);
        for (let i = 0; i < loginButtons.length; i++) {
            expect(loginButtons[i]).toBeInTheDocument();
        }

        const hostButton = screen.getAllByRole('button', { name: 'Stwórz grę' });
        expect(hostButton.length).toBe(3);
        for (let i = 0; i < hostButton.length; i++) {
            expect(hostButton[i]).toBeInTheDocument();
        }
    });
});
