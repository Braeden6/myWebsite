import React, {useEffect} from 'react';
import "../CSS/navBar.css";
import {Container, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { useMsal } from "@azure/msal-react";
import CreateAccount from "../helpers/callsAPI/createAccount";

// https://react-bootstrap.github.io/components/navbar/
export default function NavBar(style) {
  const { instance, accounts } = useMsal();
  const color = "black";

  useEffect(() => {
    if (accounts.length > 0) {
      CreateAccount(instance, accounts);
    }
  }, [accounts, instance]);

  return (
    <div id="navbar-wrapper">
        <div className="mt-5"></div>
        <Navbar bg="translucent" expand="md">
        <div className="mx-5"></div>
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
                <Nav.Link href="/map" style={{"color":style.color}}>Map</Nav.Link>
                <NavDropdown title={<span style={{color:style.color}}>Resume</span>} id="nav-dropdown" align="end">
                  <NavDropdown.Item href="/myResume">My Resume</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/resumeBuilder" >Resume Builder</NavDropdown.Item>
                </NavDropdown>
                <UnauthenticatedTemplate>
                  <SignInButton color={style.color}/>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                  <SignOutButton color={style.color}/>
                  <Nav.Link style={{"color":style.color}}>Welcome {accounts.length > 0 ?accounts[0].name: "..."} </Nav.Link>
                </AuthenticatedTemplate>
            </Nav>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
        <div className="mx-5"></div>
        </Navbar>
      </div>
    
  )
}