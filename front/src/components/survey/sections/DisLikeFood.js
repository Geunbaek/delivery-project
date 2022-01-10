import styled from "styled-components";
import * as Btns from "./foodButtons";
import { useSelector, useDispatch } from "react-redux";
import { setDislike } from "../../../modules/preference";
import { Btn } from "../../etc/button";
import {
  MOBILE_LAYOUT,
  PC_LAYOUT,
  SMALL_MOBILE_LAYOUT,
  TABLET_LAYOUT,
} from "../../../data/layout";

const Section = styled.div`
  width: 43%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: ${PC_LAYOUT}px) {
    width: 60%;
  }
  @media screen and (max-width: ${TABLET_LAYOUT}px) {
    width: 80%;
  }
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    width: 100%;
  }
`;

const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: ${(props) => props.size}px;
  @media screen and (max-width: ${PC_LAYOUT}px) {
    width: 100%;
    font-size: ${(props) => props.size - 10}px;
  }
`;

const BtnArea = styled.div`
  width: 120%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  @media screen and (max-width: ${PC_LAYOUT}px) {
    width: 80%;
    font-size: ${(props) => props.size - 10}px;
  }
`;

const BtnWrapper = styled.div`
  width: 105px;
  height: 130px;
  display: flex;
  flex-direction: column;
  & div {
    font-size: 20px;
    color: black;
  }
  @media screen and (max-width: ${PC_LAYOUT}px) {
    width: 80px;
    height: 105px;
  }
  @media screen and (max-width: ${TABLET_LAYOUT}px) {
    width: 60px;
    height: 85px;
    & div {
      font-size: 15px;
    }
  }
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    width: 40px;
    height: 85px;
    & div {
      font-size: 13px;
    }
  }
  @media screen and (max-width: ${SMALL_MOBILE_LAYOUT}px) {
    & div {
      font-size: 10px;
    }
  }
`;

function DislikeFood({ swiperHandle }) {
  const { categories } = useSelector((state) => state.preference);
  const dispatch = useDispatch();
  return (
    <>
      <Section>
        <TextArea size={50}>
          싫어하는 음식을 선택해주세요. (필수 X)<span> &#128078; </span>
        </TextArea>
        <BtnArea>
          {Object.entries(Btns.btns).map((btnInfo, idx) => {
            const [btnName, Btn] = btnInfo;
            return (
              <BtnWrapper key={idx}>
                <Btn
                  $isactivated={categories[btnName]}
                  dislike="true"
                  status={categories[btnName]}
                  onClick={() =>
                    dispatch(setDislike(btnName, categories[btnName]))
                  }
                />
                <div>{btnName}</div>
              </BtnWrapper>
            );
          })}
        </BtnArea>
        <Btn onClick={swiperHandle}>완료</Btn>
      </Section>
    </>
  );
}

export default DislikeFood;
