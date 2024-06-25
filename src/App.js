import React from 'react';
import './App.css';
// import { SegundoComponente } from './components/links/SegundoComponente';
// import {data } from './_ocity'
import DashboardRoutes from './router';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

function App() {
  return (
    <div className="App">
      <BrowserRouter>  
        <DashboardRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
