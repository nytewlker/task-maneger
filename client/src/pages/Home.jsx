import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import AboutUs from './About';
import ContactUs from './Contact';

const Home = () => {
  return (
    <div className="Universal-Container">
      <Row className="text-center">
        <Col>
          <h1>Task Manager</h1>
          <p>Stay organized and boost your productivity!</p>
        </Col>
      </Row>

      <Row className="justify-content-center ">
        <Col md={8}>
          <h2 className="text-center">Features</h2>
          <Card className="text-center  bg-light mb-4">
            <Card.Body>
              <ul className="list-unstyled">
                <li>✅ Create and manage projects easily</li>
                <li>✅ Create and Assign tasks easily</li>
                <li>✅ Set deadlines and reminders</li>
                <li>✅ Collaborate with team members</li>
                <li>✅ Track your progress</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={8} className="text-center">
          <h2>Get Started</h2>
          <p>Create an account to access all features!</p>
          <Button variant="light" href='/register' className="mx-2">Sign Up</Button>
          <Button variant="outline-dark" href='/regiter' className="mx-2">Log In</Button>
        </Col>
      </Row>
      {/* Unique wrapper for AboutUs */}
      <div className="about-wrapper">
        <AboutUs />
      </div>

      {/* Unique wrapper for ContactUs */}
      <div className="contact-wrapper">
        <ContactUs />
      </div>
      <AboutUs/>
    </div>
  );
};

export default Home;
