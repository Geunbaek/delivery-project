import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import styled, { css } from "styled-components";

import Location from "./sections/Location";
import LikeFood from "./sections/LikeFood";
import DislikeFood from "./sections/DisLikeFood";

import "swiper/css/pagination";

import { Wrapper } from "../../styles/style/GlobalStyle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import { useDispatch, useSelector } from "react-redux";
import { getCoords } from "../../modules/address";
import { storeReset } from "../../modules";
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

SwiperCore.use([Pagination, Mousewheel]);

function SurveyMain() {
  const history = useNavigate();
  const { data } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [swiper, setSwiper] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [location, setLocation] = useState("");
  const [isInSeoul, setIsInSeoul] = useState(false);

  useEffect(() => {
    dispatch(storeReset());
  }, []);

  const swiperHandle = () => {
    if (isEnd) {
      if (!data) {
        alert("주소를 입력해주세요");
        swiper.slideTo(0);
        return;
      } else if (!isInSeoul) {
        alert("서울 지역만 입력 가능합니다.!");
        swiper.slideTo(0);
        return;
      }
      history("/result", { replace: true });
    }
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
          <div style={{ textAlign: "center" }}>Scroll</div>
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
        touchRatio={0.5}
        lazy={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => {
          if (swiper.previousIndex === 0) {
            dispatch(getCoords(location));
          }
          setSwiper(swiper);
          setIsEnd(swiper.isEnd);
        }}
        className="mainSwiper"
      >
        <SwiperSlide>
          <Wrapper color="violet">
            <Location
              swiper={swiper}
              swiperHandle={swiperHandle}
              setLocation={setLocation}
              setIsInSeoul={setIsInSeoul}
              location={location}
            />
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide>
          <Wrapper color="violet">
            <LikeFood swiper={swiper} swiperHandle={swiperHandle} />
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide>
          <Wrapper color="violet">
            <DislikeFood swiper={swiper} swiperHandle={swiperHandle} />
          </Wrapper>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SurveyMain;
