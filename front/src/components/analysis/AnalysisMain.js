import styled from "styled-components";
import { useState } from "react";
import { Wrapper } from "../../styles/style/GlobalStyle";
import AnalysisTap from "./AnalysisTap";
import AnalysisResult from "./AnalysisResult";
import { chartType, chartTypeFunc, chartTypeInfo } from "../../data/resultData";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  width: 60%;
  /* height: 80%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const AnalysisArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
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

function AnalysisMain() {
  const [activeBtn, setActiveBtn] = useState(0);
  const history = useNavigate();
  const linkHome = () => {
    history("/");
  };

  return (
    <Wrapper color="violet">
      <Section>
        <div style={{ fontSize: "80px", marginBottom: "5%" }}>분석</div>
        <AnalysisTap
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          key={activeBtn}
        />
        <AnalysisArea>
          <AnalysisResult
            type={chartTypeInfo[chartType[activeBtn]]}
            func={chartTypeFunc[chartType[activeBtn]]}
            key={activeBtn}
          />
        </AnalysisArea>
        <Btn onClick={linkHome}>홈으로</Btn>
      </Section>
    </Wrapper>
  );
}

export default AnalysisMain;
