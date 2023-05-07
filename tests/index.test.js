 import React from 'react';
 import { render, screen } from '@testing-library/react';
 import { BrowserRouter } from 'react-router-dom';
 import App from '../reactapp/src/App';



 describe('Routing', () => {
   test('renders App component when path is empty', () => {
     render(
         <BrowserRouter>
           <App />
       </BrowserRouter>
     );
     const appElement = screen.getByRole('heading', { name: 'App' });
     expect(appElement).toBeInTheDocument();
   });


 });
