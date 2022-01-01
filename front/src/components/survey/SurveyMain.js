import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import Location from "./sections/Location";
import "swiper/less/pagination";
import { Wrapper } from "../../styles/style/GlobalStyle";
import { useState } from "react";

SwiperCore.use([Pagination]);

function SurveyMain() {
  const [swiper, setSwiper] = useState();
  return (
    <>
      <Swiper
        direction={"horizontal"}
        slidesPerView={1}
        spaceBetween={0}
        // mousewheel={true}
        pagination={{ clickable: true }}
        speed={1000}
        // touchRatio={0}
        lazy={true}
        // onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => setSwiper(swiper)}
        className="mainSwiper"
      >
        <SwiperSlide key="section01">
          <Wrapper color="#ffdeeb">
            <Location swiper={swiper} />
          </Wrapper>
        </SwiperSlide>
        {/* <SwiperSlide key="section02">1111</SwiperSlide> */}
      </Swiper>
    </>
  );
}

export default SurveyMain;
