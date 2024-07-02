import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;

export const MosaicoCountries = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/country`)
      .then((response) => setCountries(response.data));
  }, []);

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable'; // Ruta a la imagen de respaldo
  };

  const handleCardClick = (id, name) => {
    navigate(`/country/${id}`, { state: { countryName: name } });
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#263238', height:'10rem' }}>
        <Title level={1} style={{ color: 'white', margin: 0 }}>Countries</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div className="container">
          <Row gutter={16}>
            {countries.map((item) => (
              <Col span={8} key={item.id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(item.id, item.name)}
                  cover={<div className='image-container'><img onError={handleErrorImage} alt={item.name} src={`https://o-city.org/manifestations_media/${item.image}`} className='city-image' /></div>}
                >
                  <Meta title={item.name} className='meta-title' />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
