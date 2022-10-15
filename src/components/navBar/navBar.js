import React, {useEffect} from 'react';
import './navBar.css'
import {Container, Nav, Navbar, NavDropdown, Offcanvas, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { SignInButton } from '../SignInButton';
import { SignOutButton } from '../SignOutButton';
import { useMsal } from "@azure/msal-react";
import CreateAccount from "../../helpers/createAccount"

// https://react-bootstrap.github.io/components/navbar/
export default function NavBar(style) {
  const { instance, accounts } = useMsal();


  useEffect(() => {
    if (accounts.length > 0) {
      CreateAccount(instance, accounts);
    }
  }, [accounts]);


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Login To Use
    </Tooltip>
  );

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
                <NavDropdown.Item href="/myResume">My Resume</NavDropdown.Item>
                
                <NavDropdown.Divider />
                <AuthenticatedTemplate>
                  <NavDropdown.Item href="/resumeBuilder">Resume Builder</NavDropdown.Item>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <OverlayTrigger placement="top" delay={{ show: 250, hide: 0 }}overlay={renderTooltip}>
                    <span>
                      <NavDropdown.Item href="#" disabled>Resume Builder</NavDropdown.Item>
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" delay={{ show: 250, hide: 0 }}overlay={renderTooltip}>
                    <span>
                      <NavDropdown.Item href="#" disabled>Preview Your Resumes</NavDropdown.Item>
                    </span>
                  </OverlayTrigger>
                </UnauthenticatedTemplate>
                </NavDropdown>
                <UnauthenticatedTemplate>
                  <SignInButton/>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                  <SignOutButton/>
                  <Nav.Link>Welcome {accounts.length > 0 ?accounts[0].name: "..."} </Nav.Link>
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