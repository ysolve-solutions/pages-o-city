import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Button, Input } from 'antd';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCity } from '../../contexto/CityContext'; // Importar el contexto
import '../../styles/mosaicos.css';

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export const MosaicoCities = () => {
  const [cities, setCities] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { idState } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { stateName, countryName } = location.state || {};

  // Obtener el contexto de la ciudad
  const { setSelectedCity } = useCity();

  useEffect(() => {
    axios.post(`https://api.o-city.org/api/city_ocity?limit=0&offset=0`)
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          const filteredCities = response.data.result.filter(city => city.state_id === parseInt(idState));
          setCities(filteredCities);
        } else {
          console.error('Expected response data result to be an array');
        }
      })
      .catch((error) => console.error('Error fetching cities:', error));
  }, [idState]);

  const handleCardClick = (cityData, image, description, description_local) => {
    setSelectedCity({ ...cityData, image,description, description_local, stateName}); // Guardar el estado de la ciudad en el contexto
    navigate(`city/${cityData.id}`, {
      state: { stateName, cityName: cityData.name, image }
    });
  };

  const handleClick = () => {
    navigate(`/`);
  };

  const handleCountryClick = () => {
    if (cities.length > 0) {
      const countryId = cities[0].country.id;
      navigate(`/country/${countryId}`, { state: { countryName } });
    } else {
      console.log('No cities available to determine country ID');
    }
  };

  // Filtrar ciudades según el texto de búsqueda
  const filteredCities = cities.filter((city) =>
    city.city?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable'; // Ruta a la imagen de respaldo
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#263238', height: '10rem', padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '20px', left: '20px', color:'white' }}>
          <Button type="link" onClick={handleClick} style={{ color: 'white', padding: 0 }}>Countries</Button>
          <span>&nbsp;&lt;&nbsp;</span>
          <Button type="link" style={{ color: 'white', padding: 0 }} onClick={handleCountryClick}>{countryName}</Button>
          <span>&nbsp;&lt;&nbsp;</span>
          <Button type="link" style={{ color: 'white', padding: 0 }}>{stateName}</Button>
        </div>
        <Title level={1} style={{ color: 'white', margin: 0, textAlign: 'center', lineHeight: '10rem' }}>{stateName} Cities</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div className="container">
          {/* Campo de búsqueda */}
          <Search
            placeholder="Search cities"
            allowClear
            enterButton="Search"
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Row gutter={[16, 16]}>
            {filteredCities.length === 0 ? (
              <Col span={24}>
                <p>No cities available for this state.</p>
              </Col>
            ) : (
              filteredCities.map((item) => (
                <Col xs={24} sm={12} md={8} lg={8} key={item.id}>
                  <Card
                    hoverable
                    onClick={() => handleCardClick(item.city, item.image, item.description, item.description_local)}
                    cover={
                      <div className="image-container">
                        <img
                        onError={handleErrorImage}
                          alt={item.city ? item.city.name : 'CITY_NAME_NOT_AVAILABLE'}
                          src={`${process.env.REACT_APP_PRODU_S3_OBJECT_STORAGE}/city_ocity/images/${item?.image}`}
                          className="city-image"
                        />
                      </div>
                    }
                  >
                    <Meta title={item.city ? item.city.name : 'CITY_NAME_NOT_AVAILABLE'} className="meta-title" />
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

export default MosaicoCities;
