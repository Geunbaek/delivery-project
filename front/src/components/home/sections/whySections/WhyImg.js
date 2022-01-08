import styled from "styled-components";
import rightMan from "../../../../assets/man2.png";
import leftMan from "../../../../assets/man1.png";
import watch from "../../../../assets/watch.png";

const Section = styled.div`
  width: 60%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: "뭐 먹지?";
    font-size: 25px;
    position: absolute;
    right: 40px;
  }

  background: url("${(props) => props.bg}") no-repeat;
  background-size: contain;
  position: relative;
`;

const Mid = styled.div`
  width: 10%;
  height: 120%;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: "1시간 후...";
    font-size: 25px;
  }

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: url("${(props) => props.bg}") no-repeat;
    background-size: contain;
  }
`;

const Right = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: url("${(props) => props.bg}") no-repeat;
  background-size: contain;

  &::before {
    content: "...";
    font-size: 40px;
    position: absolute;
    left: 120px;
  }
`;

const TextArea = styled.div`
  width: 100%;
  text-align: center;
`;

function WhyImg() {
  return (
    <Section>
      <ImgWrapper>
        <Left bg={leftMan} />
        <Mid bg={watch} />
        <Right bg={rightMan} />
      </ImgWrapper>
      <TextArea>배달을 시키고 싶지만 선택이 어려운 사람들...</TextArea>
    </Section>
  );
}

export default WhyImg;
