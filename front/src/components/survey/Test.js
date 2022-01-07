import styled from "styled-components";
// import Seoul from "./Seoul";
import { ReactComponent as Seoul } from "../../assets/Seoul_districts.svg";

const SeoulMap = styled(Seoul)`
  path {
    stroke: black;
    transform-origin: 100 100;
  }
  path:hover {
    transform: scale(2);
  }
  /* #Gangdong-gu {
    fill: black;
  }
  #Gangdong-gu:hover {
    transform: scale(2 2);
    fill: red;
  } */
`;

function Test() {
  return (
    <>
      <SeoulMap />
    </>
  );
}

export default Test;
