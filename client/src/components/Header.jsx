import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { navConfig } from '../config/navConfig'; // Ensure this path is correct for your project structure

const Header = ({ panel }) => {
  const navLinks = navConfig[panel];
  const [navbarClass, setNavbarClass] = useState('navbar navbar-dark bg-dark');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token or any stored user data
    navigate('/login'); // Redirect to login page after logout
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarClass('bg-transparent');
      } else {
        setNavbarClass('navbar navbar-dark bg-dark');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar expand="lg" className={navbarClass} fixed="top" style={{ transition: 'background-color 0.3s ease' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={`${process.env.PUBLIC_URL}/task.png`} 
            style={{ width: '35px', height: '35px', marginLeft: '10px' }} 
            alt="NexTaskFlow" 
            className="logo" 
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '10px' }}>NexTaskFlow</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ml-auto mb-2 mb-lg-0">
            {navLinks.map((link, index) => (
              link.dropdown ? (
                <NavDropdown title={link.title} id={`nav-dropdown-${index}`} key={index} menuVariant="dark">
                  {link.items.map((item, subIndex) => (
                    item.divider ? (
                      <NavDropdown.Divider key={subIndex} />
                    ) : (
                      <NavDropdown.Item as={Link} to={item.path} key={subIndex}>
                        {item.label}
                      </NavDropdown.Item>
                    )
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to={link.path} key={index}>
                  {link.label}
                </Nav.Link>
              )
            ))}
            {panel === 'userPanel' && (
              <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
