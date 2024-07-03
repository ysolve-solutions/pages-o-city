import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Flex, Button } from 'antd';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../mosaicos.css';
import imagen from '../../images/region2.jpeg'

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;

export const MosaicoStates = () => {
  const [states, setStates] = useState([]);
  const { idCountry } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { countryName } = location.state || {};
  const boxStyle = {
    width: '100%',
    height: 90,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/State`)
      .then((response) => {
        const filteredStates = response.data.filter(state => state.country_id === parseInt(idCountry));
        setStates(filteredStates);
      });
  }, [idCountry]);

  const styles = [
    'brightness',
    'contrast',
    'grayscale',
    'hue-rotate',
    'invert',
    'opacity',
    'saturate',
    'sepia',
    'drop-shadow',
  ];

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable'; // Ruta a la imagen de respaldo
  };

  const getRandomStyle = () => {
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
  };

  const handleCardClick = (id, name) => {
    const randomStyle = getRandomStyle();
    navigate(`/country/${idCountry}/state/${id}`, { state: { countryName, stateName: name, randomStyle } });
  };
  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#263238', height:'10rem' }}>
        <Title level={1} style={{ color: 'white', margin: 0 }}>{countryName} States</Title>
      </Header>
      <Flex gap="middle" align="start" vertical>
        <Flex style={boxStyle}>
          <Button type="text" onClick={handleClick}>Countries</Button>
          <Button type="text">{countryName}</Button>
        </Flex>
      </Flex>
      <Content style={{ padding: '20px' }}>
        <div className="container">
          <Row gutter={16}>
            {states.map((item) => (
              <Col span={8} key={item.id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(item.id, item.name)}
                  cover={<div className={`image-container ${getRandomStyle()}`}><img onError={handleErrorImage} alt={item.name} src={imagen} className='city-image' /></div>}
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
