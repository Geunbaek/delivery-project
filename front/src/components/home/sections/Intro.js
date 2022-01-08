import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MOBILE_LAYOUT, PC_LAYOUT } from "../../../data/layout";

const Section = styled.div`
  width: 43%;
  height: 630px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    flex-direction: column;
  }

  @media screen and (max-width: ${PC_LAYOUT}px) {
    width: 60%;
  }
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

  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    font-size: 60px;
    padding-top: 200px;
  }
`;

const ExtraArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    font-size: 60px;
    align-items: center;
  }
`;

const Btn = styled.div`
  outline: none;
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 40px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
  }
`;

function Intro() {
  const history = useNavigate();

  const onClick = () => {
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
