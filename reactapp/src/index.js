import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import Login from './Login';
import Host from './Host';
import Game from './Game';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './static/styles/style.css'
 
  // Set up pages using the React Router Link element for navigation - instead of <a></a>
  
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <BrowserRouter>
    <div>
        <Routes>
            <Route path='' element={<App/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/host' element={<Host/>} />
            <Route path='/poker' element={<Game name="POKER" />} />
        </Routes>       
      </div>
    </BrowserRouter>
  )