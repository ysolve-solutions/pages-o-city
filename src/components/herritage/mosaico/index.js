import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios'
const { Meta } = Card;

export const MosaicoCountries = () => {

  const [countries, setCountries] = useState([])

  useEffect(()=>{
    const countries = axios.get(`https://api.test-ocity.icu/api/country`).then((response) => setCountries(response.data))
    console.log(countries.data)
  }, [])

  const handleErrorImage = (event) => {
    event.target.src = 'https://via.placeholder.com/500x300?text=Image No Available'; // Ruta a la imagen de respaldo
  };

  return (
    <Row gutter={16}>
      {countries.map((item) => (
        <Col span={8} key={item.id}>
            <Card
              hoverable
              //  onClick={setSelectedCountry(item)}
              cover={<img onError={handleErrorImage}  alt={item.name} src={`https://o-city.org/manifestations_media/${item.image}` } />}
            >
              <Meta title={item.name} />
            </Card>
        </Col>
      ))}
    </Row>
  );
};
