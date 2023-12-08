import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './SGI/Maquetado/Home';
import { Login } from './SGI/Login/Login';

function App() {
  
  return (
    <Router>
       <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element ={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;
