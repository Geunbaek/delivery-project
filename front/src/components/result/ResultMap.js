import { useState } from "react";
import { Wrapper } from "../../styles/style/GlobalStyle";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ResultTap from "./ResultTap";
import ResultArea from "./ResultArea";
import { type, typeFunc, typeInfo } from "../../data/resultData";
import { useNavigate } from "react-router-dom";
import { Btn } from "../etc/button";

const Section = styled.div`
  width: 60%;
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
`;

const TotalResultArea = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  margin-bottom: 5%;
  justify-content: center;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  div + div {
    margin-left: 2rem;
  }
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
          <div style={{ fontSize: "100px", marginBottom: "5%" }}>결과</div>
          <ResultTap activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
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
