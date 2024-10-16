import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imagen from '../../../images/mapaMundi.jpeg';  // Ajusta la ruta a tu imagen de logo

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export const MosaicoCountries = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState(''); // Estado para la búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`https://api.test-ocity.icu/api/country?limit=0&offset=0`)
      .then((response) => {
        console.log(response);
        setCountries(response.data.result);
      });
  }, []);

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=ImageNoAvailable'; // Ruta a la imagen de respaldo
  };

  const getRandomStyle = () => {
    const styles = ['brightness',
      'contrast',
      'grayscale',
      'hue-rotate',
      'invert',
      'opacity',
      'saturate',
      'sepia',
      'drop-shadow'];
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex];
  };

  const handleCardClick = (id, name) => {
    navigate(`/country/${id}`, { state: { countryName: name } });
  };

  // Filtrado de países según el texto de búsqueda
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#263238', height: '10rem' }}>
        <Title level={1} style={{ color: 'white', margin: 0 }}>Countries</Title>
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
          <Row gutter={16}>
            {filteredCountries.map((item) => (
              <Col span={8} key={item.id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(item.id, item.name)}
                  cover={
                    <div className={`image-container ${getRandomStyle()}`}>
                      <img onError={handleErrorImage} alt={item.name} src={imagen} className='city-image' />
                    </div>
                  }
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

export default MosaicoCountries;
