import styled from "styled-components";
import { MOBILE_LAYOUT } from "../../../../data/layout";

const Section = styled.div`
  width: 50%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    width: 90%;
  }
`;

const TextArea1 = styled.p`
  width: 100%;
  font-size: 33px;
  @media screen and (max-width: 580px) {
    font-size: 25px;
  }
`;

const TextArea2 = styled.p`
  width: 100%;
  font-size: 50px;
  margin-top: 10px;
  @media screen and (max-width: 580px) {
    font-size: 40px;
  }
`;

const SpanArea1 = styled.span`
  color: #453fa3;
  font-size: 39px;

  @media screen and (max-width: 580px) {
    font-size: 30px;
  }
`;
const SpanArea2 = styled.span`
  color: #ffdf43;
`;

const PArea = styled.p`
  font-size: 20px;
  color: #dbdbdb;
  @media screen and (max-width: 580px) {
    font-size: 15px;
  }
`;

function WhyText() {
  return (
    <Section>
      <TextArea1>
        "미국 캘리포니아공과대 행동경제학과 연구팀은 결정장애는 <br /> 지나치게
        <SpanArea1> 많은 선택지</SpanArea1> 때문에 뇌가 과부하에 걸리기 때문에
        <br /> 나타나는 현상이라는 연구결과를 ..."
      </TextArea1>
      <PArea>출처 : 서울신문</PArea>
      <TextArea2>
        그래서 <SpanArea2>삼시카페가</SpanArea2> 선택지를{" "}
        <SpanArea2>확!</SpanArea2> 줄여드립니다!
      </TextArea2>
    </Section>
  );
}

export default WhyText;
