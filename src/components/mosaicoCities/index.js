import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Button } from 'antd';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../mosaicos.css'; // Importar el archivo CSS para estilos personalizados

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;

export const MosaicoCities = () => {
  const [cities, setCities] = useState([]);
  const { idState } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { stateName, countryName } = location.state || {};

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/city_ocity?limit=0&offset=0`)
      .then((response) => {
        // Verificar la estructura de response.data
        console.log('Response data:', response.data);

        // Asegurarse de que response.data.result es un array antes de filtrarlo
        if (Array.isArray(response.data.result)) {
          const filteredCities = response.data.result.filter(city => city.state_id === parseInt(idState));
          setCities(filteredCities);
          console.log(filteredCities);
        } else {
          console.error('Expected response data result to be an array');
        }
      })
      .catch((error) => console.error('Error fetching cities:', error));
  }, [idState]);

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable'; // Ruta de la imagen de respaldo
  };

  const handleCardClick = (id, name, description, description_local, image) => {
    navigate(`/country/:idCountry/state/${idState}/city/${id}`, {
      state: { stateName, cityName: name, description, description_local, image }
    });
  };

  const handleClick = () => {
    navigate(`/`);
  };

  const handleCountryClick = () => {
    // Verificar si hay al menos una ciudad en la lista
    if (cities.length > 0) {
      const countryId = cities[0].country.id; // Obtener el country.id de la primera ciudad en la lista
      navigate(`/country/${countryId}`, { state: { countryName } });
    } else {
      console.log('No cities available to determine country ID');
    }
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#263238', height: '10rem', padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '20px', left: '20px', color:'white' }}>
          <Button type="link" onClick={handleClick} style={{ color: 'white', padding: 0 }}>Countries</Button>
          <span>&nbsp;&lt;&nbsp;</span>
          <Button type="link" style={{ color: 'white', padding: 0, }} onClick={handleCountryClick}>{countryName}</Button>
          <span>&nbsp;&lt;&nbsp;</span>
          <Button type="link" style={{ color: 'white', padding: 0, }}>{stateName}</Button>
        </div>
        <Title level={1} style={{ color: 'white', margin: 0, textAlign: 'center', lineHeight: '10rem' }}>{stateName} Cities</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div className="container">
          <Row gutter={[16, 16]}>
            {cities.length === 0 ? (
              <Col span={24}>
                <p>No cities available for this state.</p>
              </Col>
            ) : (
              cities.map((item) => (
                <Col xs={24} sm={12} md={8} lg={8} key={item.id}>
                  <Card
                    hoverable
                    onClick={() => handleCardClick(item.city.id, item.city.name, item.description, item.description_local, item.image)}
                    cover={
                      <div className="image-container">
                        <img
                          onError={handleErrorImage}
                          alt={item.city.name}
                          src={`https://o-city.org/manifestations_media/picture_city/${item.image}`}
                          className="city-image"
                        />
                      </div>
                    }
                  >
                    <Meta title={item.city.name} className="meta-title" />
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
