import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const AboutUs = () => {
  return (
    <Container className="mt-5 p-5 h-100" >
      <Row className="text-center">
        <Col>
          <h1>About Us</h1>
          <p>Learn more about our mission and team.</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2>Our Mission</h2>
              <p>
                At Task Manager, our mission is to empower individuals and teams 
                to achieve their goals through effective task management. We believe 
                in enhancing productivity and organization to help you stay focused 
                and accomplish more every day.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2>Meet the Team</h2>
              <Row>
                <Col md={4}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Jane Doe</Card.Title>
                      <Card.Text>CEO & Founder</Card.Text>
                      <Card.Text>Jane leads our vision and strategy.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>John Smith</Card.Title>
                      <Card.Text>CTO</Card.Text>
                      <Card.Text>John oversees our tech development.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title>Alice Johnson</Card.Title>
                      <Card.Text>Product Manager</Card.Text>
                      <Card.Text>Alice ensures our product meets user needs.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
