import React from 'react';
import './App.css';
import Header from './components/header';
// import { SegundoComponente } from './components/links/SegundoComponente';
// import {data } from './_ocity'
import { MosaicoPatrimonios } from './components/herritage/mosaico';
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
