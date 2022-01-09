import styled from "styled-components";
import { css } from "styled-components";
import { chartType } from "../../data/resultData";

const TapArea = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const Tap = styled.button`
  border: none;
  color: white;
  background-color: rgba(255, 255, 255, 0);
  ${(props) => {
    return (
      props.isActive &&
      css`
        border-bottom: 1px solid white;
      `
    );
  }}
`;

function AnalysisTap({ activeBtn, setActiveBtn }) {
  return (
    <TapArea>
      {chartType.map((tapName, index) => {
        return (
          <Tap
            isActive={index === activeBtn}
            onClick={() => setActiveBtn(index)}
            key={index}
          >
            {tapName}
          </Tap>
        );
      })}
    </TapArea>
  );
}

export default AnalysisTap;
