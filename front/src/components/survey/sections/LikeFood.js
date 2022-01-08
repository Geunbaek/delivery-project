import styled from "styled-components";
import * as Btns from "./foodButtons";
import { useSelector, useDispatch } from "react-redux";
import { setLike } from "../../../modules/preference";
import { useEffect, useState } from "react";
import { Btn } from "../../etc/button";

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

function LikeFood() {
  const [likeCount, setLikeCount] = useState(0);
  const { categories } = useSelector((state) => state.preference);
  const dispatch = useDispatch();

  useEffect(() => {
    setLikeCount(
      Object.values(categories).filter((status) => status === 1).length
    );
  }, [categories]);

  const setLikeHandle = (btnName) => {
    if (likeCount >= 2 && categories[btnName] === 0) {
      alert("최대 2가지만 선택 가능합니다 !");
      return;
    }
    dispatch(setLike(btnName));
  };
  return (
    <>
      <Section col>
        <TextArea>선호하는 음식을 선택해주세요. (0 ~ 2 가지)</TextArea>
        <BtnArea>
          {Object.entries(Btns.btns).map((btnInfo, idx) => {
            const [btnName, Btn] = btnInfo;
            return (
              <BtnWrapper key={idx}>
                <Btn
                  $isactivated={categories[btnName]}
                  like="true"
                  status={categories[btnName]}
                  onClick={() => setLikeHandle(btnName)}
                />
                <div style={{ fontSize: "20px", color: "black" }}>
                  {btnName}
                </div>
              </BtnWrapper>
            );
          })}
        </BtnArea>
        <Btn>다음</Btn>
      </Section>
    </>
  );
}

export default LikeFood;
