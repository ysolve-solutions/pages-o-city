import React from 'react';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

export const MosaicoPatrimonios = ({ data }) => {
  return (
    <Row gutter={16}>
      {data.map((item) => (
        <Col span={8} key={item.id}>
          <a href={`${item.id}-${item.city_name_aux}.html`}>
            <Card
              hoverable
              cover={<img alt={item.manifestation_name} src={`https://o-city.org/manifestations_media/${item.image}`} />}
            >
              <Meta title={item.manifestation_name} />
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  );
};
