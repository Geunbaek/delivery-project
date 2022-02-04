import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MOBILE_LAYOUT, PC_LAYOUT, TABLET_LAYOUT } from "../../data/layout";

const NavLink = styled(Nav.Link)`
  font-size: 32.5px;
  color: white;

  border-radius: 5px;
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
    max-width: 900px;
  }
  @media screen and (min-width: ${TABLET_LAYOUT}px) {
    max-width: 700px;
  }
`;

const StyledNavbar = styled(Navbar)`
  margin-top: 40px;
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    margin-top: 20px;
  }
`;

const Title = styled.h1`
  font-size: 40px;
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
  const linkApiDocs = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}`);
  };
  const linkAnalysis = () => {
    history("/analysis");
  };
  return (
    <StyledNavbar bg="bg-*" expand={false} fixed="top">
      <StyledContainer>
        <Navbar.Brand>
          <Title onClick={linkHome}>삼시카페</Title>
        </Navbar.Brand>

        <Nav style={{ display: "flex", flexDirection: "row" }}>
          <NavLink onClick={linkAnalysis} style={{ color: "white" }}>
            분석
          </NavLink>
          <NavLink onClick={linkApiDocs} style={{ color: "white" }}>
            API
          </NavLink>
          <NavLink onClick={linkSurvey} style={{ color: "white" }}>
            뭐먹지
          </NavLink>
        </Nav>
      </StyledContainer>
    </StyledNavbar>
  );
}

export default Header;
