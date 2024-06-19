import React from 'react';
import { TercerComponente } from '../pages/TercerComponente';
import { Button, Flex } from 'antd';
import { Row, Col, Typography } from 'antd';
const { Text, Link } = Typography;

const boxStyle = {
  width: '100%',
  height: 90,
  borderRadius: 6,
  //border: '1px solid #40a9ff',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

export const SegundoComponente = ({ data }) => {
  const rawLinksInteres = data.links_interest || "[]";
  let linksinteres = [];

  try {
    linksinteres = JSON.parse(rawLinksInteres);
  } catch (error) {
    console.error("Error parsing links_interest:", error);
  }

  return (
    <div className='container max-width'>
      <Flex gap="middle" align="start" vertical>
        <Flex style={boxStyle}>
          <Button type="text">Countries</Button>
          <Button type="text">{data.country}</Button>
          <Button type="text">Comunidad Valenciana</Button>
          <Button type="text">{data.city_name_aux}</Button>
        </Flex>
      </Flex>
      <TercerComponente data={data} />
      <div className='mt-4'>
        <Text strong>Links of interest:</Text>
        {linksinteres.length > 0 ? (
          linksinteres.map((link, index) => (
            <Row key={index} gutter={[16, 16]} className='mb-2'>
              <Col span={24}>
                <Text strong>Description:</Text> {link.description}
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
