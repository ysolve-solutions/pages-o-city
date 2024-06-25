import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header';
import Links from '../links';
import axios from 'axios';

function HeritageIndividual() {
  const { idHerritage } = useParams();
  const [heritage, setHeritage] = useState(null);

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/heritage/lists`)
      .then((response) => {
        // Filtrar para encontrar el patrimonio con el idHerritage
        const foundHeritage = response.data.find(item => item.id === parseInt(idHerritage));
        setHeritage(foundHeritage);
      })
      .catch((error) => console.error('Error fetching heritages:', error));
  }, [idHerritage]);

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
