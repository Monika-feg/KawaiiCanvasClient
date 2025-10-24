import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "../components/css/Navbar.css";
function CustomNavbar() {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand href="#/">KawaiiCanvas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#canvas">Tavlor</Nav.Link>
            <Nav.Link href="#cart">🛒</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
