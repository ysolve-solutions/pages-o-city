import React from 'react';
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
