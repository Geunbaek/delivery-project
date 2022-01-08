import styled from "styled-components";
import ReactPlayer from "react-player/youtube";

const Section = styled.div`
  width: 60%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.div`
  width: 100%;
  display: flex;
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

function WhoTo2() {
  return (
    <Section>
      <TextArea>이런 분들을 위해 만들었어요!</TextArea>
      <ExtraArea>
        <ReactPlayer
          url="https://youtu.be/Pyr4HUpT1tg"
          controls
          width={"1200px"}
          height={"800px"}
        />
      </ExtraArea>
    </Section>
  );
}

export default WhoTo2;
