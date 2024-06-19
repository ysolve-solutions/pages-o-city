import React from 'react';
import { Typography, Row, Col} from 'antd';

const { Title, Link } = Typography;

export const Header = ({ data }) => {
  return (
    <div style={{ 
      backgroundColor: '#f0f0f0', /* Color de fondo gris */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //minHeight: '100vh', /* Usar minHeight en lugar de height para evitar que el contenido se desborde */
      padding: '20px 0' /* Añadir un padding vertical de 20px */
    }}>
       
      <Row justify="center" align="middle" style={{ width: '35%%' }}>
        <Col>
          <div className='mt-4' style={{ marginBottom: '20px' }}> {/* Añadir margen arriba y espacio abajo */}
            <Title level={1} style={{ fontSize: '2.5em', textAlign: 'center', marginTop: '20px' }}>{data.manifestation_name} ({data.city_name_aux})</Title> {/* Añadir margen arriba al título */}
            <Title level={2} style={{ fontSize: '1.5em', textAlign: 'center' }}>
              <Link href='https://google.com' target="_blank">View on OCity map</Link>
            </Title>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
