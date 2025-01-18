import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Button, Input } from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import imagen from '../../assets/images/region2.jpeg';
import { useCity } from '../../contexto/CityContext'; // Importar el contexto
import '../../styles/mosaicos.css';

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export const MosaicoStates = () => {
  const [states, setStates] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { idCountry } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { countryName } = location.state || {};

  const { setSelectedCity } = useCity();

  useEffect(() => {
    axios.get(`https://api.o-city.org/api/state/country/${idCountry}`)
      .then((response) => setStates(response.data));
  }, [idCountry]);

  const styles = [
    'brightness(0.9)',
    'contrast(1.2)',
    'grayscale(1)',
    'hue-rotate(90deg)',
    'invert(1)',
    'opacity(0.8)',
    'saturate(1.5)',
    'sepia(1)',
    'drop-shadow(2px 4px 6px black)'
  ];

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable';
  };

  const getRandomStyle = () => {
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
  };

  const handleCardClick = (id, name) => {
    setSelectedCity((prevCity) => ({
      ...prevCity,
      stateName: name,
    }));
    navigate(`/country/${idCountry}/state/${id}`, { state: { countryName, stateName: name } });
  };

  const handleNavigationToHome = () => {
    navigate(`/`);
  };

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: '#263238', height: '10rem', padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
          <Button type="link" onClick={handleNavigationToHome} style={{ color: 'white', padding: 0 }}>Countries</Button>
          <span>&nbsp;&lt;&nbsp;</span>
          <Button type="link" style={{ color: 'white', padding: 0 }}>{countryName}</Button>
        </div>
        <Title level={1} style={{ color: 'white', margin: 0, textAlign: 'center', lineHeight: '10rem' }}>{countryName} States</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div className="container">
          {/* Campo de búsqueda */}
          <Search
            placeholder="Search states"
            allowClear
            enterButton="Search"
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Row gutter={[16, 16]}>
            {filteredStates.length === 0 ? (
              <Col span={24}>
                <p>No states available for this country.</p>
              </Col>
            ) : (
              filteredStates.map((item) => (
                <Col xs={24} sm={12} md={8} lg={8} key={item.id}>
                  <Card
                    hoverable
                    onClick={() => handleCardClick(item.id, item.name)}
                    cover={
                      <div className="image-container">
                        <img
                          onError={handleErrorImage}
                          alt={item.name}
                          src={imagen}
                          className="city-image"
                          style={{ filter: getRandomStyle() }} // Aplicar estilo aleatorio
                        />
                      </div>
                    }
                  >
                    <Meta title={item.name} className="meta-title" />
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

export default MosaicoStates;
