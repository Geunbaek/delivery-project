import styled from "styled-components";

const Section = styled.div`
  width: 43%;
  height: 71%;
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
`;
const TextArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
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
  border: 2px solid black;
  border-radius: 6px;
  padding: 5px 20px;
  font-size: 30px;
  cursor: pointer;
  margin-bottom: 10rem;

  &:hover {
    background: #fff0f6;
  }
`;

function Intro() {
  return (
    <Section>
      <TextArea>
        뭐<br />
        먹을지
        <br /> 고민되시나요?
      </TextArea>
      <ExtraArea>
        <Btn>추천받기</Btn>
      </ExtraArea>
    </Section>
  );
}

export default Intro;
