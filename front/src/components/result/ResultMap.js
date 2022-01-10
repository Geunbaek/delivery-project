import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ResultTap from "./ResultTap";
import ResultArea from "./ResultArea";
import { type, typeFunc, typeInfo } from "../../data/resultData";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../styles/style/GlobalStyle";
import { Btn } from "../etc/button";
import {
  SMALL_MOBILE_LAYOUT,
  MOBILE_LAYOUT,
  TABLET_LAYOUT,
  PC_LAYOUT,
} from "../../data/layout";

const Section = styled.div`
  width: 80%;
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    width: 100%;
  }
`;

const TotalResultArea = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  margin-bottom: 5%;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    flex-direction: column-reverse;
    height: 60vh;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  div + div {
    margin-left: 2rem;
  }
`;

const ResultTitle = styled.div`
  font-size: 65px;
  margin-bottom: 5%;
`;

function ResultMap() {
  const { data: userInfo } = useSelector((state) => state.address);
  const [activeBtn, setActiveBtn] = useState(0);
  const history = useNavigate();

  const HomeNavHandle = () => {
    history("/", { replace: true });
  };

  const SurveyNavHandle = () => {
    history("/survey", { replace: true });
  };

  if (!userInfo)
    return (
      <Wrapper color="violet">
        <div>잘못된 접근 입니다.</div>
      </Wrapper>
    );
  return (
    <>
      <Wrapper color="violet">
        <Section col>
          <ResultTitle>결과</ResultTitle>
          <ResultTap
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
            key={activeBtn}
          />
          <TotalResultArea>
            <ResultArea
              userInfo={userInfo}
              type={typeInfo[type[activeBtn]]}
              func={typeFunc[type[activeBtn]]}
              key={activeBtn}
            />
          </TotalResultArea>
          <BtnWrapper>
            <Btn onClick={SurveyNavHandle}>다시하기</Btn>
            <Btn onClick={HomeNavHandle}>홈으로</Btn>
          </BtnWrapper>
        </Section>
      </Wrapper>
    </>
  );
}

export default ResultMap;
