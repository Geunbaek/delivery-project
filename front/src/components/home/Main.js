import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
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

const GraphSection = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ScrollDisplay = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  position: absolute;
  bottom: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const [swiper, setSwiper] = useState();
  return (
    <>
      <Header />
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
        onSlideChange={(swiper) => setSwiper(swiper)}
        className="mainSwiper"
      >
        <SwiperSlide key="section01">
          <Wrapper color="#ffdeeb">
            <Intro />
            <ScrollDisplay>
              <UseAnimations
                animation={arrowDown}
                size={56}
                style={{ padding: 100 }}
              />
              <div>Scroll</div>
            </ScrollDisplay>
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide key="section02">
          <Wrapper color="#ffdeeb">
            <GraphSection>
              <WhyTo />
            </GraphSection>
            <ScrollDisplay>
              <UseAnimations
                animation={arrowDown}
                size={56}
                style={{ padding: 100 }}
              />
              <div>Scroll</div>
            </ScrollDisplay>
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide key="section03">
          <Wrapper color="#ffdeeb">
            <WhoTo />
            <ScrollDisplay up onClick={() => swiper.slideTo(0)}>
              <UseAnimations
                animation={arrowUp}
                size={56}
                style={{ padding: 100 }}
              />
              <div>맨위로</div>
            </ScrollDisplay>
          </Wrapper>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Main;
