import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [stateName, setStateName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');

  return (
    <GlobalStateContext.Provider value={{ stateName, setStateName, countryName, setCountryName, cityName, setCityName }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
