import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Nav.Link)`
  font-size: 30px;
  & + & {
    margin-left: 20px;
  }
`;

function Header() {
  const history = useNavigate();
  const onClickHandle = () => {
    history("/survey");
  };
  return (
    <>
      <Navbar
        bg="bg-*"
        expand={false}
        fixed="top"
        style={{ marginTop: "30px" }}
      >
        <Container style={{ width: "1000px" }}>
          {/*40%*/}
          <Navbar.Brand href="#">
            <h1 style={{ fontSize: "40px", color: "white" }}>오늘 뭐먹지?</h1>
          </Navbar.Brand>
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          <Nav style={{ display: "flex", flexDirection: "row" }}>
            <NavLink onClick={onClickHandle} style={{ color: "white" }}>
              뭐먹지
            </NavLink>
          </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
