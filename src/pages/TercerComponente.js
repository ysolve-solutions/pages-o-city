import React, { useState } from 'react';
import { Button, Typography, Row, Col, Image } from 'antd';

const { Title, Paragraph, Link } = Typography;

export const TercerComponente = ({ data }) => {
    const [showLocalDescription, setShowLocalDescription] = useState(false);
    const [buttonText, setButtonText] = useState("Change to Local Language");

    const toggleDescription = () => {
        setShowLocalDescription(!showLocalDescription); // Cambia el estado de showLocalDescription
        setButtonText(showLocalDescription ? "Change to Local Language" : "Change to English"); // Actualiza el texto del botón basado en el estado anterior de showLocalDescription
    };
    

    return (
        <div className='container max-width'>
            <div className='mt-10'>
                <Title level={1}>{data.manifestation_name} ({data.city_name_aux})</Title>
                <Title level={2}>
                    <Link href='https://google.com' target="_blank">View on OCity map</Link>
                </Title>
            </div>
            <Row gutter={[16, 16]} className='mt-4'>
                <Col xs={24} md={12}>
                    <Image
                        src={`https://o-city.org/manifestations_media/${data.image}`}
                        alt='imagen'
                        width='100%'
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Button type="primary" onClick={toggleDescription}>{buttonText}</Button>
                    <Paragraph>
                        {showLocalDescription ? data.manifestation_description_local : data.manifestation_description}
                    </Paragraph>
                </Col>
            </Row>
        </div>
    );
};
