import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import styled from "styled-components";

function Header() {
  return (
    <Navbar bg="bg-*" expand={false} fixed="top">
      <Container fluid={false} style={{ width: "55%" }}>
        <Navbar.Brand href="#">
          <h1>오늘 뭐먹지?</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">메뉴</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#action2">추천</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
