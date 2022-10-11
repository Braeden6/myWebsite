import React from 'react';
import './navBar.css'
import {Container, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { SignInButton } from '../SignInButton';
import { SignOutButton } from '../SignOutButton';

// https://react-bootstrap.github.io/components/navbar/
export default function NavBar(style) {
  return (
    <>
        <div className="mt-5"></div>
        <Navbar bg="translucent"variant={style.variant} expand="md">
        <div className="mx-5"></div>
        <Container fluid>
            <Navbar.Brand href="/">Braeden Norman</Navbar.Brand>
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
            <Nav
                className="justify-content-end flex-grow-1 pe-3"
            >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
                <NavDropdown title="Resume" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="/resume">My Resume</NavDropdown.Item>
                <NavDropdown.Item href="/resumeBuilder">Resume Builder</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                    Something else here
                </NavDropdown.Item>
                </NavDropdown>
                <UnauthenticatedTemplate>
                  <SignInButton/>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                  <Nav.Link>Welcome ... </Nav.Link>
                  <SignOutButton/>
                </AuthenticatedTemplate>
            </Nav>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
        <div className="mx-5"></div>
        </Navbar>
    </>
    
  )
}