import styled from "styled-components";

const Section = styled.div`
  width: 50%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TextArea = styled.p`
  width: 100%;
  font-size: 50px;
`;

function WhyText() {
  return (
    <Section>
      <TextArea>
        미국 캘리포니아공과대 행동경제학과 연구팀은 결정장애는 <br /> 지나치게
        "많은 선택지" 때문에 뇌가 과부하에 걸리기 때문에 <br /> 나타나는
        현상이라는 연구결과를 내놓은 바있다..
      </TextArea>
      <TextArea>그래서 선택지를 줄여드립니다!</TextArea>
    </Section>
  );
}

export default WhyText;
