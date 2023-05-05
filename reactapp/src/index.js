import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
 
  // Set up pages using the React Router Link element for navigation - instead of <a></a>
  const App = () => (
    <div>
      <h1>React Router Example</h1>
               
      <ul>
        <li><Link to="/login">Poker Login</Link></li>
      </ul>
      
    </div>
  )
  
  
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <div>
    <BrowserRouter>
    <div>
        <Routes>
            <Route path='' element={<App/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>       
      </div>
    <div>chuj</div>
    </BrowserRouter>
    </div>
  )