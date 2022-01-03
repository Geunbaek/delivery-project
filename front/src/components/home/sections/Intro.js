import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div`
  width: 43%;
  height: 50%;
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
`;

const TextArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  font-size: 100px;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  align-items: center;
`;

const ExtraArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const Btn = styled.div`
  /* width: 60%; */
  outline: none;
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 40px;
  cursor: pointer;
  /* margin-bottom: 10rem; */

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
  }
`;

function Intro() {
  const history = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    history("/survey");
  };
  return (
    <Section>
      <TextArea>
        뭐<br />
        먹을지
        <br /> 고민되시나요?
      </TextArea>
      <ExtraArea>
        <Btn onClick={onClick}>추천받기</Btn>
      </ExtraArea>
    </Section>
  );
}

export default Intro;
