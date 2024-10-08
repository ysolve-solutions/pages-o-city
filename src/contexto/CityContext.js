import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CityContext = createContext();

// Hook personalizado para usar el contexto
export const useCity = () => useContext(CityContext);

// Proveedor del contexto
export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState({});

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
