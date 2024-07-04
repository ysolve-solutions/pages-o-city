import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button } from 'antd';
import { TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.css';

const { Title, Link } = Typography;

const transformName = (name) => {
  // Convierte el nombre a minúsculas y reemplaza los espacios por guiones
  return name.toLowerCase().replace(/ /g, '-');
};

export const Header = ({ data }) => {
  const navigate = useNavigate();
  const [stateName, setStateName] = useState('');
  const idestado = data.city.state_id;

  useEffect(() => {
    axios.get(`https://api.test-ocity.icu/api/State/${idestado}`)
      .then((response) => {
        if (response.data) {
          setStateName(response.data.name);
        } else {
          console.error("State data not found:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching state:", error);
      });
  }, [idestado]);

  const cityName = data?.city?.name || "City not available";
  const countryName = data.country ? data.country.name : '';

  const cityId = data.city ? data.city.id : null;
  const countryId = data.country ? data.country.id : null;
  const stateId = data.city ? data.city.state_id : null;

  const handleCityClick = () => {
    if (countryId && stateId && cityId) {
      navigate(`/country/${countryId}/state/${stateId}/city/${cityId}`, { state: { cityName } });
    } else {
      console.log('One of the IDs is missing:', { countryId, stateId, cityId });
    }
  };

  const handleStateClick = () => {
    if (countryId && stateId) {
      navigate(`/country/${countryId}/state/${stateId}`, { state: { stateName, countryName } });
    } else {
      console.log('One of the IDs is missing:', { countryId, stateId });
    }
  };

  const handleCountryClick = () => {
    if (countryId) {
      navigate(`/country/${countryId}`, { state: { countryName } });
    } else {
      console.log('Country ID is missing:', { countryId });
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  const transformedName = transformName(data.name);

  return (
    <div className="header-container">
      <div style={{ color: 'white' }}>
              <Button type="text" onClick={handleClick} style={{ color: 'white', padding: 0 }}>Countries</Button>
              <span>&nbsp;&lt;&nbsp;</span>
              <Button type="text" onClick={handleCountryClick} style={{ color: 'white', padding: 0 }}>{countryName}</Button>
              <span>&nbsp;&lt;&nbsp;</span>
              <Button type="text" onClick={handleStateClick} style={{ color: 'white', padding: 0 }}>{stateName}</Button>
              <span>&nbsp;&lt;&nbsp;</span>
              <Button type="text" onClick={handleCityClick} style={{ color: 'white', padding: 0 }}>{cityName}</Button>
            </div>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col>
          <div className='mt-4' style={{ marginBottom: '20px' }}>
            <Title level={1} style={{ fontSize: '2.5em', textAlign: 'center', marginTop: '20px', color:'#f0f0f0' }}>
              {data.name} ({cityName})
            </Title>
            <Title level={2} style={{ fontSize: '1.5em', textAlign: 'center' }}>
              <Link href={`https://o-city.org/dashboard/map/heritage/${transformedName}-${cityName.toLowerCase()}`} target="_blank" style={{fontSize:'1.54rem'}}>
                View on OCity map
              </Link>
            </Title>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <Link href="https://twitter.com" target="_blank" className="social-icon">
                <TwitterOutlined style={{ fontSize: '40px', color: '#1DA1F2' }} />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="social-icon">
                <FacebookOutlined style={{ fontSize: '40px', color: '#4267B2' }} />
              </Link>
            </div>
            
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
