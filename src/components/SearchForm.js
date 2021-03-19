import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import {useState} from "react";
import './SearchForm.css'

const SearchForm = (props) => {
    const [city, setCity] = useState(undefined);
    const [country, setCountry] = useState(undefined);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.getWeather(city, country);
    }
    return (
        <>
            <Row className="justify-content-md-center">
                <Form inline onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Control type="text" className="form-control" name="city" value={city}
                                          autoComplete="off"
                                          onChange={event => setCity(event.target.value)} placeholder="City"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="text" className="form-control" name="country" value={country}
                                          autoComplete="off"
                                          onChange={event => setCountry(event.target.value)} placeholder="Country"/>
                        </Col>
                    </Row>
                    <Button variant="warning" type="submit" className="m-3">
                        Get Weather
                    </Button>
                </Form>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <div>{props.error ? error() : ""}</div>
            </Row>
        </>
    )
}
const error = () => {
    return (
        <Alert variant="warning" className="mx-5">
            Please Enter City and Country...!
        </Alert>
    )
}
export default SearchForm;