import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
 
  // Set up pages using the React Router Link element for navigation - instead of <a></a>
  const App = () => (
    <div>
      <h1>React Router Example</h1>
               
      <ul>
        <li><Link to="/client">Client Side</Link></li>
        <li><Link to="/server">Server Side</Link></li>
      </ul>
      
    </div>
  )
  

  class Client extends Component {
    render () {
        return (
            <div>CHUJEK</div>
        );
    }
  }
  // Populate sample pages. 
//   const Client= () => <h3>What is client side?<body><li>Browser</li><li>Runs on local machine</li><li>React renders user interface</li><li>React Router adds clickable links</li></body></h3>
  
  const Server= () => <h3>What is server side?<li>node.js - JavaScript everywhere!</li></h3>
  
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <div>
    <BrowserRouter>
    <div>
        <Routes>
            <Route path='/client' element={<Client/>} />
            <Route path='/server' element={<Server/>} />
            <Route path='' element={<App/>} />
        </Routes>       
      </div>
    <div>chuj</div>
    </BrowserRouter>
    </div>
  )