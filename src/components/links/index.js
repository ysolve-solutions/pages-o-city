import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Description } from '../description';
import { Button, Row, Col, Typography } from 'antd';
import { Flex } from 'antd';
import axios from 'axios';

const { Text, Link } = Typography;

const boxStyle = {
  width: '100%',
  height: 90,
  borderRadius: 6,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const Links = ({ data }) => {
  const navigate = useNavigate();
  const { idCountry } = useParams();
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

  const cityName = data.city ? data.city.name : '';
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
      navigate(`/country/${countryId}/state/${stateId}`, { state: { stateName } });
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
    navigate(`/`);
  };

  return (
    <div className='container max-width'>
      <Flex gap="middle" align="start" vertical>
        <Flex style={boxStyle}>
          <Button type="text" onClick={handleClick}>Countries</Button>
          <Button type="text" onClick={handleCountryClick}>{countryName}</Button>
          <Button type="text" onClick={handleStateClick}>{stateName}</Button>
          <Button type="text" onClick={handleCityClick}>{cityName}</Button>
        </Flex>
      </Flex>
      <Description data={data} />
      <div className='mt-4'>
        <Text strong>Links of interest:</Text>
        {linksInteres.length > 0 ? (
          linksInteres.map((link, index) => (
            <Row key={index} gutter={[16, 16]} className='mb-2'>
              <Col span={24}>
                <Text strong>Description:</Text> {link.name}
              </Col>
              <Col span={24}>
                <Text strong>URL:</Text> <Link href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</Link>
              </Col>
            </Row>
          ))
        ) : (
          <Row>
            <Col span={24}>
              <Text>No links available</Text>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Links;
