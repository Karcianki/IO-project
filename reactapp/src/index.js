import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import Login from './Login';
import Host from './Host';
import GamePoker from './Poker';
import GameTysiac from './Tysiac';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 
  // Set up pages using the React Router Link element for navigation - instead of <a></a>
  
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <BrowserRouter>
    <div>
        <Routes>
            <Route path='' element={<App/>} />
            <Route path='poker/login' element={<Login id="poker" name="POKER"/>} />
            <Route path='poker/host' element={<Host id="poker" name="POKER"/>} />
            <Route path='tysiac/login' element={<Login id="tysiac" name="TYSIĄC"/>} />
            <Route path='tysiac/host' element={<Host id="tysiac" name="TYSIĄC"/>} />
            <Route path='brydz/login' element={<Login id="brydz" name="BRYDŻ"/>} />
            <Route path='brydz/host' element={<Host id="brydz" name="BRYDŻ"/>} />
            <Route path='/poker' element={<GamePoker />} />
            <Route path='/tysiac' element={<GameTysiac/>} />
            {/* <Route path='/brydz' element={<GameBrydz/>} /> */}
        </Routes>       
      </div>
    </BrowserRouter>
  )