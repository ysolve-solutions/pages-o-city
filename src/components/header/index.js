import React from 'react';
import { Typography, Row, Col } from 'antd';
import { TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import './index.css';

const { Title, Link } = Typography;

const transformName = (name) => {
  // Convierte el nombre a minúsculas y reemplaza los espacios por guiones
  return name.toLowerCase().replace(/ /g, '-');
};

export const Header = ({ data }) => {
  console.log("Header data:", data);  // Verificar los datos en la consola

  // Ajustar según la estructura real de `data`
  const cityName = data?.city?.name || "City not available";
  const transformedName = transformName(data.name);

  return (
    <div className="header-container">
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
