import React, { useState } from 'react';
import { Button, Typography, Row, Col, Image } from 'antd';

const { Paragraph, Title } = Typography;

export const Description = ({ data }) => {
    const [showLocalDescription, setShowLocalDescription] = useState(false);
    const [buttonText, setButtonText] = useState("Change to Local Language");

    const toggleDescription = () => {
        setShowLocalDescription(!showLocalDescription);
        setButtonText(showLocalDescription ? "Change to Local Language" : "Change to English");
    };

    return (
        <div className='container max-width'>
            <Row gutter={[16, 16]} className='mb-2'>
                <Col xs={24} md={12} order={2}>
                    <div style={{ paddingLeft: '15px' }}>
                        <Button type="text" onClick={toggleDescription}>{buttonText}</Button>
                        <Title level={1} style={{ fontSize: '1.5em', marginTop: '20px' }}>
                            Description
                        </Title>
                        <Paragraph>
                            {showLocalDescription ? data.extended_local_heritage_description : data.extended_heritage_description}
                        </Paragraph>
                    </div>
                </Col>
                <Col xs={24} md={12} order={1}>
                    <div style={{ paddingRight: '10px', marginLeft: '10px' }}>
                        {/* Ajuste de espaciado y borde a la izquierda */}
                        <Image
                            src={`${process.env.REACT_APP_PRODU_S3_OBJECT_STORAGE}/heritage/images/${data.image}`}
                            alt='imagen'
                            width='100%'
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Description;
