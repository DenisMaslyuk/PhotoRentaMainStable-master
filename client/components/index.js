import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import './Index.css'

import { Link } from "react-router-dom";
import axios from "axios";

class Index extends Component {
  render() {
    return (
      <Container>
<div className="Carousel">

        <Row>
            <Col>
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('./media/1.jpg')}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('./media/2.jpg')}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('./media/3.jpg')}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
            </Col>
        </Row>









<div className="Cameras">
            <div className="Grid">
                <Row>
                    <Col>
                        <img className="d-block w-100" src={require('./media/logo.jpg')} alt="Third slide"/>
                    </Col>
                    <Col>
                        <img className="d-block w-100" src={require('./media/logo.jpg')} alt="Third slide"/>
                    </Col>
                </Row>
            </div>
            <div className="Grid">
                <Row>
                    <Col>
                        <img className="d-block w-100" src={require('./media/logo.jpg')} alt="Third slide"/>
                    </Col>
                    <Col>
                        <img className="d-block w-100" src={require('./media/logo.jpg')} alt="Third slide"/>
                    </Col>
                </Row>
            </div>
        </div>
</div>
</Container>
    );
  }
}
export default Index;
