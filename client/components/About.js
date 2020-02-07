import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Conditions.css"

const Conditions = () => (

<Container>
    <div className="con img">
        <Row>
            <Col>
                <img className="d-block w-100" src={require('./media/logo.jpg')}></img>
            </Col>
        </Row>
    </div>

    <div className="Text">
        О компании
    </div>
</Container>
)
export default Conditions;
