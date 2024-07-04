import React from 'react';
import { Description } from '../description';
import { Typography, Layout, Row, Col } from 'antd';

import logo from '../../images/O-CITY_Logo.jpeg';  // Ajusta la ruta a tu imagen de logo

const { Text, Link } = Typography;
const { Footer } = Layout;

const footerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f0f2f5',
};

const logoStyle = {
  width: 150,
  height: 'auto',
};

const Links = ({ data }) => {
 

  const rawLinksInteres = Array.isArray(data.links) ? data.links : [];
  let linksInteres = [];

  try {
    linksInteres = rawLinksInteres.map(link => ({
      name: link.name,
      url: link.url
    }));
  } catch (error) {
    console.error("Error parsing links of interest:", error);
  }

  return (
    <div>
      <Description data={data} />
      <Footer style={footerStyle}>
        <div>
          <Text strong>Links of interest:</Text>
          {linksInteres.length > 0 ? (
            linksInteres.map((link, index) => (
              link.name && link.url ? (
                <Row key={index} gutter={[16, 16]} className='mb-2'>
                  <Col span={24}>
                    <Text strong>Description:</Text> {link.name}
                  </Col>
                  <Col span={24}>
                    <Text strong>URL:</Text> <Link href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</Link>
                  </Col>
                </Row>
              ) : null
            ))
          ) : (
            <Row>
              <Col span={24}>
                <Text>No links available</Text>
              </Col>
            </Row>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={logo} alt="Logo" style={logoStyle} />
          <Text>hello@o-city.org</Text>
        </div>
        <div>
          <Text strong>{data.heritageField ? data.heritageField.name : 'No heritage field name'}</Text>
        </div>
      </Footer>
    </div>
  );
};

export default Links;
