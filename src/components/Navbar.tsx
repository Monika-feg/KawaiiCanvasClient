import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/Navbar.css";

import "../components/css/Navbar.css";
const catUrl =
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1761573740/mushroom-7882746_640_vfdsc8.png";
function CustomNavbar() {
  return (
    <Navbar className="navbar">
      <img src={catUrl} alt="Kawaii Cat" className="mushroom-img" />
      <Container>
        <Navbar.Brand href="#/">KawaiiCanvas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav-custom">
            <Nav.Link href="#canvas">Tavlor</Nav.Link>
            <Nav.Link href="#cart" className="cart-link">
              <span className="cart-emoji">🛒</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
