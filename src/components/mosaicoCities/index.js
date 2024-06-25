import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography } from 'antd';
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
  const { stateName } = location.state || {};

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/city_ocity`)
      .then((response) => {
        console.log('Cities data:', response.data);  // Verificar la estructura de response.data

        // Eliminar duplicados basados en id
        const uniqueCities = Array.from(new Set(response.data.map(city => city.id)))
          .map(id => response.data.find(city => city.id === id));

        // Filtrar por state_id
        const filteredCities = uniqueCities.filter(city => city.state_id === parseInt(idState));

        console.log('Filtered Cities:', filteredCities);
        setCities(filteredCities);
      })
      .catch((error) => console.error('Error fetching cities:', error));
  }, [idState]);

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable'; // Ruta de la imagen de respaldo
  };

  const handleCardClick = (id, name) => {
    navigate(`/country/:idCountry/state/${idState}/city/${id}`, { state: { stateName, cityName: name } });
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#001529' }}>
        <Title level={1} style={{ color: 'white', margin: 0 }}>{stateName} Cities</Title>
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
                    onClick={() => handleCardClick(item.city_id, item.city.name)}
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
