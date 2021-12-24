import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 40px;
  padding: 0 300px 0 0;
`;
const ExtraArea = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: ${(props) => props.isCenter && "center"};
`;

const UserArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Btn = styled.button`
  width: 10rem;
  height: 3rem;
  outline: none;
  background-color: pink;
  border: 2px solid black;
  border-radius: 7px;
  font-size: 1.5rem;
`;

SwiperCore.use([Mousewheel]);

const data = {
  labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
  datasets: [
    {
      label: "확진자수?",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      yAxisID: "My First Dataset",
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "배달건수?",
      data: [100000, 110000, 120000, 160000, 110000, 120000, 100000],
      fill: false,
      yAxisID: "My Third Dataset",
      borderColor: "rgb(230, 126, 34)",
      tension: 0.1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        id: "My First Dataset",
        type: "linear",
        position: "left",
        scalePositionLeft: true,
      },
      {
        id: "My Third Dataset",
        type: "linear",
        position: "right",
        scalePositionLeft: false,
        min: 0,
        max: 1,
      },
    ],
  },
};

function Main() {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={700}
        // onSlideChange={() => console.log("slide change")}
        className="mainSwiper"
      >
        <SwiperSlide>
          <Wrapper color="pink">
            <TextArea>
              지금
              <br />
              뭐먹을지 모를때!
            </TextArea>
            <ExtraArea>
              <Btn>조사하기</Btn>
            </ExtraArea>
          </Wrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SubWrapper color="pink">
            <TextArea>누가 사용해야하나?</TextArea>
            <UserArea></UserArea>
          </SubWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <Wrapper color="pink">
            <div style={{ width: "80%" }}>
              <Line data={data} options={options} />
            </div>
          </Wrapper>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Main;
