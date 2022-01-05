import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import styled, { css } from "styled-components";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import arrowUp from "react-useanimations/lib/arrowUp";
import Header from "../Header";

import Intro from "./sections/Intro";
import WhoTo from "./sections/WhoTo";
import WhyTo from "./sections/WhyTo";

import { Wrapper } from "../../styles/style/GlobalStyle";
import bgImg from "../../assets/spaghetti.jpg";

// const GraphSection = styled.div`
//   width: 80%;
//   height: 80%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

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

SwiperCore.use([Mousewheel]);

function Main() {
  const [swiper, setSwiper] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <>
      <Header />
      {isEnd ? (
        <>
          <ScrollDisplay up>
            <UseAnimations
              animation={arrowUp}
              size={56}
              style={{ padding: 100 }}
              strokeColor="white"
              key="0"
              onClick={() => swiper.slideTo(0)}
            />
            <div>맨위로</div>
          </ScrollDisplay>
        </>
      ) : (
        <>
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
        </>
      )}
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={1000}
        touchRatio={0}
        lazy={true}
        // onSwiper={(swiper) => {
        //   setSwiper(swiper);
        // }}
        onSlideChange={(swiper) => {
          setSwiper(swiper);
          setIsEnd(swiper.isEnd);
          console.log(swiper.isEnd);
        }}
        className="mainSwiper"
      >
        <SwiperSlide key="section01">
          <Wrapper back={bgImg}>
            <Intro />
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide key="section02">
          <Wrapper color="#b197fc">
            <WhyTo />
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide key="section03">
          <Wrapper color="#b197fc">
            <WhoTo />
          </Wrapper>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Main;
