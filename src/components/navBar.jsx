import React, {useEffect} from 'react';
import "../CSS/navBar.css";
import {Container, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap'

// https://react-bootstrap.github.io/components/navbar/
export default function NavBar(style) {

  return (
    <div id="navbar-wrapper">
        <Navbar bg="translucent" expand="md" variant={style.color==="black"?"light":"dark"}>
          <Container fluid>
            <Navbar.Brand href="/" style={{"color":style.color}}>Braeden Norman</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" style={{"color":style.color}}>
                  <Nav.Link href="/" style={{"color":style.color}}>Home</Nav.Link>
                  <Nav.Link href="/map" style={{"color":style.color}} disabled>Map</Nav.Link>
                  <NavDropdown title={<span style={{color:style.color}} id="dropdown-title">Resume</span>} id="nav-dropdown" align="end" disabled>
                    <NavDropdown.Item href="/myResume">My Resume</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/resumeBuilder" >Resume Builder</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    
  )
}