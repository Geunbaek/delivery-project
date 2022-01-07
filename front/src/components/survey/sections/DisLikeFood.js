import styled from "styled-components";
import { categories } from "../../../data/categories";
import * as Btns from "./Buttons";

import { useState } from "react";

const Section = styled.div`
  width: 43%;
  height: 50%;
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 10rem;
`;

const BtnArea = styled.div`
  width: 120%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
`;

const BtnWrapper = styled.div`
  width: 105px;
  height: 130px;
  display: flex;
  flex-direction: column;
`;

const GetPosBtn = styled.button`
  width: 5rem;
  height: 4rem;
  background-color: #b197fc;
  border-radius: 1rem;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  border: 2px solid black;
  text-align: center;
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

function DislikeFood({ swiperHandle, preferenceFood, preferenceFoodHandle }) {
  // const [dislikeFood, setDislikeFood] = useState(categories);
  // const addLikeFood = (category) => {
  //   setDislikeFood((food) => {
  //     return { ...food, [category]: !food[category] };
  //   });
  // };
  return (
    <>
      <Section col>
        <TextArea>싫어하는 음식을 선택해주세요.</TextArea>
        <BtnArea>
          {Object.entries(Btns.btns).map((btnInfo, idx) => {
            const [btnName, Btn] = btnInfo;
            return (
              <BtnWrapper key={idx}>
                <Btn
                  $isactivated={preferenceFood[btnName]}
                  dislike
                  status={preferenceFood[btnName]}
                  onClick={() => preferenceFoodHandle(btnName, 2)}
                />
                <div style={{ fontSize: "20px", color: "black" }}>
                  {btnName}
                </div>
              </BtnWrapper>
            );
          })}
        </BtnArea>
        <GetPosBtn onClick={swiperHandle}>다음</GetPosBtn>
      </Section>
    </>
  );
}

export default DislikeFood;
