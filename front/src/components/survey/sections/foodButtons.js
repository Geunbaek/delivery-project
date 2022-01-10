import styled, { css } from "styled-components";
import { ReactComponent as FastFood } from "../../../assets/buttonImg/fastFood.svg";
import { ReactComponent as Skewer } from "../../../assets/buttonImg/skewer.svg";
import { ReactComponent as Pizza } from "../../../assets/buttonImg/pizza.svg";
import { ReactComponent as Cafe } from "../../../assets/buttonImg/cafe.svg";
import { ReactComponent as Onigiri } from "../../../assets/buttonImg/onigiri.svg";
import { ReactComponent as FriedChicken } from "../../../assets/buttonImg/friedChicken.svg";
import { ReactComponent as Rice } from "../../../assets/buttonImg/rice.svg";
import { ReactComponent as Steak } from "../../../assets/buttonImg/steak.svg";
import { ReactComponent as Soup } from "../../../assets/buttonImg/soup.svg";
import { ReactComponent as Pig } from "../../../assets/buttonImg/pigImg.svg";
import { ReactComponent as Food } from "../../../assets/buttonImg/plate.svg";
import { ReactComponent as LunchBox } from "../../../assets/buttonImg/picnic.svg";
import { ReactComponent as Noodle } from "../../../assets/buttonImg/noodle.svg";
import { ReactComponent as Fish } from "../../../assets/buttonImg/fish.svg";

const makeFoodBtn = (foodSvg) => {
  return styled(foodSvg)`
    margin-bottom: 1rem;
    cursor: pointer;
    & {
      fill: #173156;
    }
    &:hover path {
      fill: white;
    }
    &:hover rect {
      fill: white;
    }
    ${(props) =>
      props.$isactivated &&
      css`
        & path {
          fill: white;
        }
        & rect {
          fill: white;
        }
      `}
    ${(props) =>
      props.like &&
      props.status === 2 &&
      css`
        & path {
          fill: rgba(0, 0, 0, 0.1);
        }
        & rect {
          fill: rgba(0, 0, 0, 0.1);
        }
        &:hover path {
          fill: rgba(0, 0, 0, 0.1);
        }
        &:hover rect {
          fill: rgba(0, 0, 0, 0.1);
        }
      `}
    ${(props) =>
      props.dislike &&
      props.status === 1 &&
      css`
        & path {
          fill: rgba(0, 0, 0, 0.1);
        }
        & rect {
          fill: rgba(0, 0, 0, 0.1);
        }
        &:hover path {
          fill: rgba(0, 0, 0, 0.1);
        }
        &:hover rect {
          fill: rgba(0, 0, 0, 0.1);
        }
      `}
  `;
};

const FastFoodBtn = makeFoodBtn(FastFood);
const SchoolFoodBtn = makeFoodBtn(Skewer);
const JapaneseFood = makeFoodBtn(Onigiri);
const PizzaBtn = makeFoodBtn(Pizza);
const CafeBtn = makeFoodBtn(Cafe);
const ChickenBtn = makeFoodBtn(FriedChicken);
const KoreanFoodBtn = makeFoodBtn(Rice);
const WesternFoodBtn = makeFoodBtn(Steak);
const SoupBtn = makeFoodBtn(Soup);
const PigBtn = makeFoodBtn(Pig);
const NightFoodBtn = makeFoodBtn(Food);
const LunchBoxBtn = makeFoodBtn(LunchBox);
const ChineseFoodBtn = makeFoodBtn(Noodle);
const RawFoodBtn = makeFoodBtn(Fish);

export const btns = {
  분식: SchoolFoodBtn,
  야식: NightFoodBtn,
  "족발/보쌈": PigBtn,
  찜탕: SoupBtn,
  치킨: ChickenBtn,
  "카페/디저트": CafeBtn,
  피자: PizzaBtn,
  한식: KoreanFoodBtn,
  회: RawFoodBtn,
  일식: JapaneseFood,
  패스트푸드: FastFoodBtn,
  "아시안/양식": WesternFoodBtn,
  도시락: LunchBoxBtn,
  중식: ChineseFoodBtn,
};
