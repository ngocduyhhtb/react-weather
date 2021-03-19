import React from 'react';
import {Card, Row, Col, Container} from 'react-bootstrap';
import styled from 'styled-components';

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    font-size: 40px;
`
const Weather = (props) => {
    const {city, country, icon, temp, temp_max, temp_min, feels_like, description} = props;
    const minMaxTemp = (min, max) => {
        return (
            <h3>
                <span className="px-4">Max Celsius: {min}&deg;</span>
                <span className="px-4">Min Celsius: {max}&deg;</span>
            </h3>
        )
    }
    const closeForm = () => {
        props.onCloseForm();
    }
    return (
         <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs={6} lg={6}>
                    <Card>
                        <Card.Body className="cards">
                            <Row className="d-flex justify-content-center">
                                <h1>{city}, {country}</h1>
                                <CloseButton type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true" onClick={closeForm}>&times;</span>
                                </CloseButton>
                            </Row>
                            <h5 className="py-4">
                                <i className={`wi ${icon} display-1`}/>
                            </h5>
                            <h1 className="py-2">
                                {temp}&deg;
                            </h1>
                            {minMaxTemp(temp_min, temp_max)}
                            <h3>
                                <span className="px-4">Feel Like: {feels_like}&deg;</span>
                            </h3>
                            <h4 className="py-3">{description.toUpperCase()}</h4>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Weather;