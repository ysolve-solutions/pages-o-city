import React from 'react';
import { Typography, Row, Col} from 'antd';
import './index.css'

const { Title, Link } = Typography;

// eslint-disable-next-line react/prop-types
export const Header = ({ data }) => {
  return (
    <div className="header-container" >
      <Row justify="center" align="middle" style={{ width: '35%%' }}>
        <Col>
          <div className='mt-4' style={{ marginBottom: '20px' }}> 
            <Title level={1} style={{ fontSize: '2.5em', textAlign: 'center', marginTop: '20px' }}>{data?.manifestation_name} ({data?.city_name_aux})</Title>
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
