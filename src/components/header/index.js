import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button } from 'antd';
import { TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import './index.css';

const { Title, Link } = Typography;

export const Header = ({ data }) => {
  const navigate = useNavigate();
  const [stateName, setStateName] = useState('');
  const { city, country, name, id: heritageId } = data;
  const { name: cityName = "City not available", state_id: stateId, id: cityId } = city || {};
  const { name: countryName = '', id: countryId } = country || {};

  useEffect(() => {
    if (stateId) {
      axios.get(`https://api.test-ocity.icu/api/State/${stateId}`)
        .then((response) => {
          response.data ? setStateName(response.data.name) : console.error("State data not found:", response.data);
        })
        .catch(error => console.error("Error fetching state:", error));
    }
  }, [stateId]);

  const handleNavigation = (path, params) => {
    if (Object.values(params).every(Boolean)) {
      navigate(path, { state: params });
    } else {
      console.log('Missing navigation parameters:', params);
    }
  };

  return (
    <div className="header-container">
      <div style={{ color: 'white', display: 'flex', gap: '4px' }}>
        <Button type="text" onClick={() => navigate('/')} style={{ color: 'white', padding: 0 }}>Countries</Button>
        <span>&gt;</span>
        <Button type="text" onClick={() => handleNavigation(`/country/${countryId}`, { countryName })} style={{ color: 'white', padding: 0 }}>{countryName}</Button>
        <span>&gt;</span>
        <Button type="text" onClick={() => handleNavigation(`/country/${countryId}/state/${stateId}`, { stateName, countryName })} style={{ color: 'white', padding: 0 }}>{stateName}</Button>
        <span>&gt;</span>
        <Button type="text" onClick={() => handleNavigation(`/country/${countryId}/state/${stateId}/city/${cityId}`, { cityName })} style={{ color: 'white', padding: 0 }}>{cityName}</Button>
      </div>

      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col>
          <div className='mt-4' style={{ marginBottom: '20px' }}>
            <Title level={1} style={{ fontSize: '2.5em', textAlign: 'center', marginTop: '20px', color:'#f0f0f0' }}>
              {name} ({cityName})
            </Title>
            <Title level={2} style={{ fontSize: '1.5em', textAlign: 'center' }}>
              <Link href={`https://test-ocity.icu/city/${data.city_id}/heritage/${heritageId}`} target="_blank" style={{ fontSize:'1.54rem' }}>
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

Header.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.shape({
      name: PropTypes.string,
      state_id: PropTypes.number,
      id: PropTypes.number,
    }),
    country: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
    city_id: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};

export default Header;
