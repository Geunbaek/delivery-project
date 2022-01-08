import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination, EffectFade } from "swiper";
import { Wrapper } from "../../../styles/style/GlobalStyle";
import WhyTo from "../sections/whySections/WhyTo";
import WhyImg from "./whySections/WhyImg";
import WhyText from "./whySections/WhyText";

import "swiper/css/effect-fade";

SwiperCore.use([Mousewheel, Pagination, EffectFade]);

function WhyPage({ swiper: outerSwiper }) {
  const wheelHandle = (e, num) => {
    if (e.nativeEvent.wheelDelta > 0 || e.nativeEvent.detail < 0) {
      if (num === 0) {
        outerSwiper.enable();
      }
    } else {
      if (num === 1) {
        outerSwiper.enable();
      }
    }
  };
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={0}
      mousewheel={true}
      speed={1000}
      touchRatio={0}
      lazy={true}
      effect="fade"
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + "</span>";
        },
      }}
      onSlideChange={(swiper) => {
        if (!swiper.isBeginning && !swiper.isEnd) {
          outerSwiper.disable();
        }
      }}
      className="mainSwiper"
    >
      <SwiperSlide>
        <Wrapper color="violet" onWheel={(e) => wheelHandle(e, 0)}>
          <WhyTo />
        </Wrapper>
      </SwiperSlide>
      <SwiperSlide>
        <Wrapper color="violet">
          <WhyImg />
        </Wrapper>
      </SwiperSlide>
      <SwiperSlide>
        <Wrapper color="violet" onWheel={(e) => wheelHandle(e, 1)}>
          <WhyText />
        </Wrapper>
      </SwiperSlide>
    </Swiper>
  );
}

export default WhyPage;
