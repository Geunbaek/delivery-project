import styled, { css } from "styled-components";
import { categories } from "../../../data/categories";
import { ReactComponent as FastFood } from "../../../assets/fastFood.svg";
import { useState } from "react";
import * as Btns from "./Buttons";

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

function LikeFood({ swiperHandle, preferenceFood, preferenceFoodHandle }) {
  // const [likeFood, setLikeFood] = useState(categories);

  // const addLikeFood = (category) => {
  //   setLikeFood((food) => {
  //     return { ...food, [category]: food[category] === 0 ? 1 : 0 };
  //   });
  // };

  return (
    <>
      <Section col>
        <TextArea>선호하는 음식을 선택해주세요.</TextArea>
        <BtnArea>
          {Object.entries(Btns.btns).map((btnInfo, idx) => {
            const [btnName, Btn] = btnInfo;
            return (
              <BtnWrapper key={idx}>
                <Btn
                  $isactivated={preferenceFood[btnName]}
                  like
                  status={preferenceFood[btnName]}
                  onClick={() => preferenceFoodHandle(btnName, 1)}
                />
                <div style={{ fontSize: "20px", color: "black" }}>
                  {btnName}
                </div>
              </BtnWrapper>
            );
          })}
        </BtnArea>
      </Section>
    </>
  );
}

export default LikeFood;
