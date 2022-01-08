import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Controller } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import styled, { css } from "styled-components";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import arrowUp from "react-useanimations/lib/arrowUp";
import Header from "./Header";

import Intro from "./sections/Intro";
import WhyPage from "./sections/WhyPage";

import { Wrapper } from "../../styles/style/GlobalStyle";
import bgImg from "../../assets/spaghetti.jpg";
import { MOBILE_LAYOUT } from "../../data/layout";

const ScrollDisplay = styled.div`
  width: 56px;
  height: 5rem;
  z-index: 2;
  border-radius: 5rem;
  position: absolute;
  bottom: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  right: 50%;
  font-size: 16px;
  ${(props) =>
    props.up &&
    css`
      cursor: pointer;
    `}
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    justify-content: center;
    align-items: stretch;
    left: 0;
  }
`;

SwiperCore.use([Mousewheel, Controller]);

function Main() {
  const [swiper, setSwiper] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <>
      <Header />
      {isEnd ? (
        <ScrollDisplay up>
          <UseAnimations
            animation={arrowUp}
            size={56}
            style={{ padding: 100 }}
            strokeColor="white"
            key="arrowUp"
            onClick={() => swiper.slideTo(0)}
          />
          <div style={{ textAlign: "center" }}>맨위로</div>
        </ScrollDisplay>
      ) : (
        <ScrollDisplay>
          <UseAnimations
            animation={arrowDown}
            size={56}
            style={{ padding: 100 }}
            strokeColor="white"
            key="arrowDown"
          />
          <div style={{ textAlign: "center" }}>Scroll</div>
        </ScrollDisplay>
      )}
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={1000}
        touchRatio={0}
        lazy={true}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        onSlideChange={(swiper) => {
          setSwiper(swiper);
          setIsEnd(swiper.isEnd);
        }}
        className="mainSwiper"
      >
        <SwiperSlide>
          <Wrapper back={bgImg}>
            <Intro />
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide>
          <WhyPage swiper={swiper} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Main;
