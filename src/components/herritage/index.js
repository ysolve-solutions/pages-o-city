import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header';
import Links from '../links';
import axios from 'axios';

function HeritageIndividual() {
  const { idCity, idHerritage } = useParams(); // Asegúrate de que estás obteniendo idCity e idHerritage de los parámetros de la ruta
  const [heritage, setHeritage] = useState(null);

  useEffect(() => {
    axios.get(`https://api.o-city.org/api/heritage/lists/byCityId/${idCity}`)
      .then((response) => {
        // Filtrar para encontrar el patrimonio con el idHerritage
        const foundHeritage = response.data.find(item => item.id === parseInt(idHerritage));
        setHeritage(foundHeritage);
      })
      .catch((error) => console.error('Error fetching heritages:', error));
  }, [idCity, idHerritage]);

  if (!heritage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header data={heritage} />
      <Links data={heritage} />
    </div>
  );
}

export default HeritageIndividual;
