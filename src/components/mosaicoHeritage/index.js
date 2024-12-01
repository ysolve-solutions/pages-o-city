import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Button, Badge, Input } from 'antd';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCity } from '../../contexto/CityContext';
import '../../styles/mosaicos.css';

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Search } = Input;

export const MosaicoHeritage = () => {
  const [heritages, setHeritages] = useState([]);
  const [useLocalDescription, setUseLocalDescription] = useState(false);
  const [country, setCountry] = useState({ id: null, name: '' });
  const [state, setState] = useState({ id: null, name: '' });
  const { idCity } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const { cityName } = location.state || {};
  const { selectedCity } = useCity();

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/heritage/lists/byCityId/${idCity}`)
      .then((response) => {
        const filteredHeritages = response.data.filter(heritage => heritage.city_id === parseInt(idCity));
        if (filteredHeritages.length > 0) {
          const { country, city } = filteredHeritages[0];
          setCountry({ id: country.id, name: country.name });
          setState({ id: city.state_id, name: selectedCity.stateName });
        }
        setHeritages(filteredHeritages);
      })
      .catch((error) => console.error('Error fetching heritages:', error));
  }, [idCity, selectedCity.stateName]);

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable';
  };

  const toggleDescription = () => {
    setUseLocalDescription(prevState => !prevState);
  };

  const handleCardClick = (description, description_local, image, id) => {
    navigate(`/country/${country.id}/state/${state.id}/city/${idCity}/heritage/${id}`, {
      state: {
        description,
        description_local,
        image,
        stateName: state.name
      }
    });
  };

  const handleStateClick = () => {
    if (country.id && state.id) {
      navigate(`/country/${country.id}/state/${state.id}`, {
        state: { stateName: state.name, countryName: country.name }
      });
    }
  };

  const handleCountryClick = () => {
    if (country.id) {
      navigate(`/country/${country.id}`, {
        state: { countryName: country.name }
      });
    }
  };

  const handleClick = () => {
    navigate(`/`);
  };

  const filteredHeritages = heritages.filter((state) =>
    state.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: '#263238', height: 'auto', padding: '20px' }}>
  <div style={{ color: 'white', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    {/* Contenedor de texto y botones */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '70%' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button type="link" onClick={handleClick} style={{ color: 'white', padding: 0 }}>Countries</Button>
        <span>&nbsp;&lt;&nbsp;</span>
        <Button type="link" onClick={handleCountryClick} style={{ color: 'white', padding: 0 }}>{country.name}</Button>
        <span>&nbsp;&lt;&nbsp;</span>
        <Button type="link" onClick={handleStateClick} style={{ color: 'white', padding: 0 }}>{selectedCity.stateName}</Button>
        <span>&nbsp;&lt;&nbsp;</span>
        <Button type="link" style={{ color: 'white', padding: 0 }}>{cityName}</Button>
      </div>
      <Title level={1} style={{ color: 'white', marginBottom: '10px' }}>{cityName} Heritages</Title>

      {/* Imagen para pantallas pequeñas (dispositivos móviles) */}
      <img
        onError={handleErrorImage}
        alt={selectedCity?.name || cityName}
        src={`https://o-city.org/manifestations_media/picture_city/${selectedCity?.image}`}
        className='imagenciudad mobile-image'
        style={{
          width: '100%', // Ajustar al ancho del contenedor
          height: 'auto',
          marginBottom: '10px', // Margen inferior
        }}
      />

      <Button type="link" onClick={toggleDescription} style={{ color: '#fc4b08' }}>
        Change to {useLocalDescription ? 'Description' : 'Local Language'}
      </Button>
      <Paragraph style={{ color: 'white' }}>
        {useLocalDescription ? selectedCity?.description_local : selectedCity?.description}
      </Paragraph>
    </div>

    {/* Imagen para pantallas grandes (escritorio) */}
    <img
      onError={handleErrorImage}
      alt={selectedCity?.name || cityName}
      src={`https://o-city.org/manifestations_media/picture_city/${selectedCity?.image}`}
      className='imagenciudad desktop-image'
      style={{
        width: '300px',
        height: 'auto',
        marginLeft: 'auto', // Mantener a la derecha en escritorio
      }}
    />
  </div>

  {/* CSS para controlar la visibilidad */}
  <style>{`
    @media (max-width: 768px) {
      .desktop-image {
        display: none; /* Ocultar imagen de escritorio en móvil */
      }
      .mobile-image {
        display: block; /* Mostrar imagen de móvil */
      }
    }
    @media (min-width: 769px) {
      .mobile-image {
        display: none; /* Ocultar imagen de móvil en escritorio */
      }
      .desktop-image {
        display: block; /* Mostrar imagen de escritorio */
      }
    }
  `}</style>
</Header>

      <Content style={{ padding: '20px' }}>
        <div className="container">
          <Search
            placeholder="Search states"
            allowClear
            enterButton="Search"
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <Row gutter={[16, 16]}>
            {filteredHeritages.length === 0 ? (
              <Col span={24}>
                <p>No heritages available for this city.</p>
              </Col>
            ) : (
              filteredHeritages.map((item, index) => (
                <Col xs={24} sm={12} md={8} lg={8} key={item.id}>
                  <Card
                    hoverable
                    onClick={() => handleCardClick(item.extended_heritage_description, item.extended_local_heritage_description, item.image, item.id)}
                    cover={
                      <div className="image-container">
                        <img
                          onError={handleErrorImage}
                          alt={item.name}
                          src={`https://o-city.org/manifestations_media/${item.image}`}
                          className="city-image"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    }
                  >
                    <Meta title={<span>
                      <Badge
                        count={index + 1} // Manteniendo la enumeración
                        style={{ backgroundColor: '#fc4b08', color: 'white', marginRight: '8px' }} />
                      {item.name}
                    </span>}
                    />
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
