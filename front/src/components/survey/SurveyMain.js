import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";

import Location from "./sections/Location";
import "swiper/less/pagination";
import { Wrapper } from "../../styles/style/GlobalStyle";

SwiperCore.use([Mousewheel, Pagination]);

function SurveyMain() {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{ clickable: true }}
        speed={1000}
        touchRatio={0}
        lazy={true}
        // onSwiper={(swiper) => setSwiper(swiper)}
        // onSlideChange={() => console.log(Swiper)}
        className="mainSwiper"
      >
        <SwiperSlide key="section01">
          <Wrapper color="#ffdeeb">
            <Location />
          </Wrapper>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SurveyMain;
