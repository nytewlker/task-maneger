import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram,  } from 'react-bootstrap-icons'; // Importing icons from React Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className='bg-dark text-light py-3'>
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className="text-center text-md-left mb-3 mb-md-0">
            <h6>Task Manager</h6>
            <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
            <p>Your ultimate solution for organizing tasks efficiently.</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-left mb-3 mb-md-0">
            <h6>Contact Us</h6>
            <p>Email: support@taskmanager.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Task Ave, Manage City, USA</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-left">
            <h6>Follow Us</h6>
            <div className="d-flex justify-content-center">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <Facebook size={24} className="text-light" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <Twitter size={24} className="text-light" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} className="text-light" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
