import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography } from 'antd';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import '../mosaicos.css';

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;

export const MosaicoHeritage = () => {
  const [heritages, setHeritages] = useState([]);
  const { idCountry, idState, idCity } = useParams();
  const location = useLocation();
  const { cityName } = location.state || {};

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/heritage/lists`)
      .then((response) => {
        const filteredHeritages = response.data.filter(heritage => heritage.city_id === parseInt(idCity));
        setHeritages(filteredHeritages);
      })
      .catch((error) => console.error('Error fetching heritages:', error));
  }, [idCity]);

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable'; // Ruta de la imagen de respaldo
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#263238', height:'10rem'}}>
        <Title level={1} style={{ color: 'white', margin: 0 }}>{cityName} Heritages</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div className="container">
          <Row gutter={16}>
            {heritages.map((item) => (
              <Col span={8} key={item.id}>
                <Link to={`/country/${idCountry}/state/${idState}/city/${idCity}/heritage/${item.id}`}>
                  <Card
                    hoverable
                    cover={
                      <div className='image-container'>
                        <img onError={handleErrorImage} 
                        alt={item.name} 
                        src={`https://o-city.org/manifestations_media/${item.image}`} 
                        className='city-image'/>
                        </div>}
                  >
                    <Meta title={item.name} description={item.description} className='meta-title'/>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
