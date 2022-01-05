import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import styled, { css } from "styled-components";

import Location from "./sections/Location";
import LikeFood from "./sections/LikeFood";
import DislikeFood from "./sections/DisLikeFood";
import { categories } from "../../data/categories";

import "swiper/css/pagination";
import { Wrapper } from "../../styles/style/GlobalStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";

const ScrollDisplay = styled.div`
  width: 100%;
  height: 5rem;
  z-index: 2;
  border-radius: 5rem;
  position: absolute;
  bottom: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  ${(props) =>
    props.up &&
    css`
      cursor: pointer;
    `}
`;

SwiperCore.use([Pagination, Mousewheel]);

function SurveyMain() {
  const history = useNavigate();
  const [preferenceFood, setPreferenceFood] = useState(categories);
  const [swiper, setSwiper] = useState();
  const [isEnd, setIsEnd] = useState(false);

  const swiperHandle = () => {
    if (isEnd) history("/result", { replace: true });
  };

  const preferenceFoodHandle = (category, status) => {
    setPreferenceFood((food) => {
      return {
        ...food,
        [category]:
          food[category] === status
            ? 0
            : food[category] === 0
            ? status
            : food[category],
      };
    });
  };

  return (
    <>
      {!isEnd && (
        <ScrollDisplay>
          <UseAnimations
            animation={arrowDown}
            size={56}
            style={{ padding: 100 }}
            strokeColor="white"
            key="1"
          />
          <div>Scroll</div>
        </ScrollDisplay>
      )}
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        }}
        speed={1000}
        touchRatio={0}
        lazy={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => {
          setSwiper(swiper);
          setIsEnd(swiper.isEnd);
        }}
        className="mainSwiper"
      >
        <SwiperSlide key="section01">
          <Wrapper color="#b197fc">
            <Location swiper={swiper} swiperHandle={swiperHandle} />
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide key="section02">
          <Wrapper color="#b197fc">
            <LikeFood
              swiper={swiper}
              swiperHandle={swiperHandle}
              preferenceFood={preferenceFood}
              preferenceFoodHandle={preferenceFoodHandle}
            />
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide key="section03">
          <Wrapper color="#b197fc">
            <DislikeFood
              swiper={swiper}
              swiperHandle={swiperHandle}
              preferenceFood={preferenceFood}
              preferenceFoodHandle={preferenceFoodHandle}
            />
          </Wrapper>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SurveyMain;
