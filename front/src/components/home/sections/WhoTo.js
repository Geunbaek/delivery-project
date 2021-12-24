import styled from "styled-components";

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
  /* flex-direction: column; */
  justify-content: center;
  margin-bottom: 50px;
`;

const ExtraArea = styled.div`
  width: 100%;
  /* height: 50%; */
  display: flex;
  /* flex-direction: column-reverse; */
  flex-wrap: wrap;
  justify-content: center;
`;

function WhoTo() {
  return (
    <Section>
      <TextArea>이런 분들을 위해 만들었어요!</TextArea>
      <ExtraArea>
        <div style={{ width: "13rem", margin: "2rem" }}>
          <img src="img/1.png" alt="대상예시" />
        </div>
        <div style={{ width: "13rem", margin: "2rem" }}>
          <img src="img/2.png" alt="대상예시" />
        </div>
        <div style={{ width: "13rem", margin: "2rem" }}>
          <img src="img/3.png" alt="대상예시" />
        </div>
        <div style={{ width: "13rem", margin: "2rem" }}>
          <img src="img/3.png" alt="대상예시" />
        </div>
      </ExtraArea>
    </Section>
  );
}

export default WhoTo;
