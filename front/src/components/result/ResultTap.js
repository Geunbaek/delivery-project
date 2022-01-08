import styled from "styled-components";
import { css } from "styled-components";
import { type } from "../../data/resultData";

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

function ResultTap({ activeBtn, setActiveBtn }) {
  return (
    <TapArea>
      {type.map((tapName, index) => {
        return (
          <Tap
            isActive={index === activeBtn}
            onClick={() => setActiveBtn(index)}
          >
            {tapName}
          </Tap>
        );
      })}
    </TapArea>
  );
}

export default ResultTap;
