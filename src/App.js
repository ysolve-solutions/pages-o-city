import React from 'react';
import DashboardRoutes from './router';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import { CityProvider } from './contexto/CityContext'; // Importar el contexto

function App() {
  return (
    <CityProvider>
    <div className="App">
      <BrowserRouter>  
        <DashboardRoutes />
      </BrowserRouter>
    </div>
    </CityProvider>
  );
}

export default App;
