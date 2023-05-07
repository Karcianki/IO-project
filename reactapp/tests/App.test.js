import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import {Test} from '../src/App';
import '@testing-library/jest-dom';

jest.mock('../src/static/styles/style.css', () => ({}));


// describe('App', () => {
    test('renders with the correct text content', () => {
        render(
            // <MemoryRouter>
                <App />
            // </MemoryRouter>
        );
        
        const headerElement = screen.getByText('KARCIANKI');
        expect(headerElement).toBeInTheDocument();

        const nameElement = screen.getByText('POKER');
        expect(nameElement).toBeInTheDocument();

        const loginButton = screen.getByRole('button', { name: 'Dołącz do gry' });
        expect(loginButton).toBeInTheDocument();

        const hostButton = screen.getByRole('button', { name: 'Stwórz grę' });
        expect(hostButton).toBeInTheDocument();
    });
// });

test('test' , () => {
    render(
        <Test />
    );
});