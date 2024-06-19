import React, { useState } from 'react';
import { Button, Typography, Row, Col, Image } from 'antd';

const { Paragraph } = Typography;

export const TercerComponente = ({ data }) => {
    const [showLocalDescription, setShowLocalDescription] = useState(false);
    const [buttonText, setButtonText] = useState("Change to Local Language");

    const toggleDescription = () => {
        setShowLocalDescription(!showLocalDescription);
        setButtonText(showLocalDescription ? "Change to Local Language" : "Change to English");
    };

    return (
        <div className='container max-width'>
            <Row gutter={[16, 16]} className='mb-2'>
                <Col xs={24} md={12} order={2}> {/* Orden 2 para cambiar posición con la imagen */}
                    <div style={{ paddingLeft: '15px' }}> {/* Ajuste de espaciado */}
                        <Button type="primary" onClick={toggleDescription}>{buttonText}</Button>
                        <Paragraph>
                            {showLocalDescription ? data.manifestation_description_local : data.manifestation_description}
                        </Paragraph>
                    </div>
                </Col>
                <Col xs={24} md={12} order={1}>
                    <div style={{ paddingRight: '10px', marginLeft: '10px' }}> {/* Ajuste de espaciado y borde a la izquierda */}
                        <Image
                            src={`https://o-city.org/manifestations_media/${data.image}`}
                            alt='imagen'
                            width='100%'
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TercerComponente;
