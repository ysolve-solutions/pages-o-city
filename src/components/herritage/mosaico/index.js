import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Button, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imagen from '../../../assets/images/mapaMundi.jpeg';  // Ajusta la ruta a tu imagen de logo
import '../../../styles/mosaicos.css';

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export const MosaicoCountries = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`https://api.test-ocity.icu/api/country?limit=0&offset=0`)
      .then((response) => {
        setCountries(response.data.result);
      });
  }, []);

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable';
  };

  // Función para aplicar un estilo aleatorio a cada imagen
  const getRandomStyle = () => {
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
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
  };

  const handleCardClick = (id, name) => {
    navigate(`/country/${id}`, { state: { countryName: name } });
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: '#263238', height: '10rem', padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
          <Button type="link" onClick={() => navigate(`/`)} style={{ color: 'white', padding: 0 }}>Home</Button>
        </div>
        <Title level={1} style={{ color: 'white', margin: 0, textAlign: 'center', lineHeight: '10rem' }}>Countries</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div className="container">
          {/* Campo de búsqueda */}
          <Search
            placeholder="Search countries"
            allowClear
            enterButton="Search"
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Row gutter={[16, 16]}>
            {filteredCountries.length === 0 ? (
              <Col span={24}>
                <p>No countries available.</p>
              </Col>
            ) : (
              filteredCountries.map((item) => (
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

export default MosaicoCountries;
