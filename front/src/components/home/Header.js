import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PC_LAYOUT } from "../../data/layout";

const NavLink = styled(Nav.Link)`
  font-size: 50px;
  color: white;
  & + & {
    margin-left: 20px;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledContainer = styled(Container)`
  width: 100%;
  left: 50%;
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: ${PC_LAYOUT}px) {
    max-width: 1100px;
  }
`;

const Title = styled.h1`
  font-size: 60px;
  color: white;
`;

function Header() {
  const history = useNavigate();
  const linkSurvey = () => {
    history("/survey");
  };
  const linkHome = () => {
    history("/");
  };
  return (
    <Navbar bg="bg-*" expand={false} fixed="top" style={{ marginTop: "60px" }}>
      <StyledContainer>
        <Navbar.Brand href="#">
          <Title onClick={linkHome}>삼시카페</Title>
        </Navbar.Brand>

        <Nav style={{ display: "flex", flexDirection: "row" }}>
          <NavLink onClick={linkSurvey} style={{ color: "white" }}>
            뭐먹지
          </NavLink>
        </Nav>
      </StyledContainer>
    </Navbar>
  );
}

export default Header;
