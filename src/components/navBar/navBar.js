import './navBar.css'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'

// https://react-bootstrap.github.io/components/navbar/
export default function Menu() {
  return (
    <Container>
    <div className="mt-5"></div>
        <Navbar bg="translucent" variant="dark" expand="md">
        <div className="mx-5"></div>
        <Container>
            <Navbar.Brand href="/">
                Braeden Norman
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/resume" class="font-weight-bold">Resume</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        <div className="mx-5"></div>
        </Navbar>
        </Container>
  )
}