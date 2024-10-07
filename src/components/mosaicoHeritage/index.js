import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Typography, Button, Badge, Input } from 'antd';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/mosaicos.css';

const { Meta } = Card;
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export const MosaicoHeritage = () => {
  const [heritages, setHeritages] = useState([]);
  const [useLocalDescription, setUseLocalDescription] = useState(false);
  const [country, setCountry] = useState({ id: null, name: '' });
  const [state, setState] = useState({ id: null, name: '' });
  const { idCity } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { Search } = Input;
  const [searchText, setSearchText] = useState('');

  const { cityName, description, description_local, image, stateName } = location.state || {};

  useEffect(() => {
    console.log("ESTTOY AQUI")
    axios.get(`https://api.test-ocity.icu/api/heritage/lists/byCityId/${idCity}`)
      .then((response) => {
        console.log("CCITIE", response)
        const filteredHeritages = response.data.filter(heritage => heritage.city_id === parseInt(idCity));
        if (filteredHeritages.length > 0) {
          const { country, city } = filteredHeritages[0];
          setCountry({ id: country.id, name: country.name });
          setState({ id: city.state_id, name: stateName }); // Usar el stateName recibido en la navegación
        }
        setHeritages(filteredHeritages);
      })
      .catch((error) => console.error('Error fetching heritages:', error));
  }, [idCity, stateName]);

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
        stateName: state.name // Asegúrate de pasar el nombre del estado
      }
    });
  };

  const handleStateClick = () => {
    if (country.id && state.id) {
      navigate(`/country/${country.id}/state/${state.id}`, {
        state: { stateName: state.name, countryName: country.name }
      });
    } else {
      console.log('One of the IDs is missing:', { countryId: country.id, stateId: state.id });
    }
  };

  const handleCountryClick = () => {
    if (country.id) {
      navigate(`/country/${country.id}`, {
        state: { countryName: country.name }
      });
    } else {
      console.log('Country ID is missing:', { state: country.name });
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
      <Header style={{ backgroundColor: '#263238', height: 'auto', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: 'white'}}>
          <div style={{ marginBottom: '60px', maxWidth: '100%' }}>
            <Button type="link" onClick={handleClick} style={{ color: 'white', padding: 0 }}>Countries</Button>
            <span>&nbsp;&lt;&nbsp;</span>
            <Button type="link" onClick={handleCountryClick} style={{ color: 'white', padding: 0 }}>{country.name}</Button>
            <span>&nbsp;&lt;&nbsp;</span>
            <Button type="link" onClick={handleStateClick} style={{ color: 'white', padding: 0 }}>{state.name}</Button>
            <span>&nbsp;&lt;&nbsp;</span>
            <Button type="link" style={{ color: 'white', padding: 0 }}>{cityName}</Button>
          </div>
          <div style={{  marginLeft: '10px' }}>
            <Title level={1} style={{ color: 'white', margin: 0 }}>{cityName} Heritages</Title>
            <Button type="link" onClick={toggleDescription} style={{ color: '#fc4b08' }}>
              Change to {useLocalDescription ? 'Description' : 'Local Language'}
            </Button>
            <Paragraph style={{ color: 'white' }}>
              {useLocalDescription ? description_local : description}
            </Paragraph>
          </div>
        </div>
        <img
          onError={handleErrorImage}
          alt={cityName}
          src={`https://o-city.org/manifestations_media/picture_city/${image}`}
          className="city-image"
          style={{ width: '25rem' }} />
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
          <Row gutter={16}>
            {filteredHeritages.map((item, index) => (
              <Col span={8} key={item.id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(item.extended_heritage_description, item.extended_local_heritage_description, item.image, item.id)}
                  cover={<div className='image-container'>
                    <img
                      onError={handleErrorImage}
                      alt={item.name}
                      src={`https://o-city.org/manifestations_media/${item.image}`}
                      className='city-image' />
                  </div>}
                >
                  <Meta
                    title={<span>
                      <Badge
                        count={index + 1}
                        style={{ backgroundColor: '#fc4b08', color: 'white', boxShadow: '0 0 0 1px #d9d9d9 inset', marginRight: '8px' }} />
                      {item.name}
                    </span>}
                    className='meta-title' />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
