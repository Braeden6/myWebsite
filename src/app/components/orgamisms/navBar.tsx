import React, {useEffect} from 'react';
import "./navBar.css";
import {Container, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap'


interface Props {
  color: string
}

// https://react-bootstrap.github.io/components/navbar/
export default function NavBar(props: Props) {

  return (
    <div id="navbar-wrapper">
        <Navbar bg="translucent" expand="md" variant={props.color==="black"?"light":"dark"}>
          <Container fluid>
            <Navbar.Brand href="/" style={{"color":props.color}}>Braeden Norman</Navbar.Brand>
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
                <Nav className="justify-content-end flex-grow-1 pe-3" style={{"color":props.color}}>
                  <Nav.Link href="/" style={{"color":props.color}}>Home</Nav.Link>
                  <Nav.Link href="/map" style={{"color":props.color}} disabled>Map</Nav.Link>
                  <NavDropdown title={<span style={{color:props.color}} id="dropdown-title">Resume</span>} id="nav-dropdown" align="end">
                    <NavDropdown.Item href="/myResume">My Resume</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/resumeBuilder">Resume Builder</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    
  )
}