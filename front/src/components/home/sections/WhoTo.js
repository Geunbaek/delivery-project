import styled from "styled-components";
import testImg from "../../../assets/1.png";

const Section = styled.div`
  width: 60%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  /* font-size: 100px; */
  /* flex-direction: column; */
  justify-content: center;
  margin-bottom: 50px;
`;

const ExtraArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-size: contain;
  & .pic {
    width: 20%;
    margin: 1rem;
  }
`;

function WhoTo() {
  return (
    <Section>
      <TextArea>이런 분들을 위해 만들었어요!</TextArea>
      <ExtraArea>
        <div className="pic">
          <img src={testImg} alt="대상예시" />
        </div>
        <div className="pic">
          <img src={testImg} alt="대상예시" />
        </div>
        <div className="pic">
          <img src={testImg} alt="대상예시" />
        </div>
        <div className="pic">
          <img src={testImg} alt="대상예시" />
        </div>
      </ExtraArea>
    </Section>
  );
}

export default WhoTo;
