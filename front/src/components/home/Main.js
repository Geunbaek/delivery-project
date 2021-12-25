import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import "swiper/css";
import styled from "styled-components";

import Intro from "./sections/Intro";
import WhoTo from "./sections/WhoTo";
import WhyTo from "./sections/WhyTo";
import { Line } from "react-chartjs-2";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.color};
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GraphSection = styled.div`
  width: 80%;
  /* height: 80%; */
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
`;

const ScrollDisplay = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  position: absolute;
  bottom: 5rem;
  background-color: rgba(0, 0, 0, 0.1);
`;

SwiperCore.use([Mousewheel]);

function Main() {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={1000}
        touchRatio={0}
        // onSlideChange={() => console.log("slide change")}
        className="mainSwiper"
      >
        <SwiperSlide>
          <Wrapper color="#ffdeeb">
            <Intro />
            <ScrollDisplay></ScrollDisplay>
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide>
          <Wrapper color="#ffdeeb">
            <GraphSection>
              <WhyTo />
            </GraphSection>
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide>
          <Wrapper color="#ffdeeb">
            <WhoTo />
          </Wrapper>
        </SwiperSlide>
      </Swiper>
      <ScrollDisplay></ScrollDisplay>
    </>
  );
}

export default Main;
