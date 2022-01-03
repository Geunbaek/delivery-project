import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress, getCoords } from "../../../modules/address";
import Loading from "../../loading/Loading";
import { gu } from "../../../data/districtsData";
import { useNavigate } from "react-router-dom";

const LocationArea = styled.input`
  height: 4rem;
  width: 35rem;
  border: none;
  border-bottom: 2px solid black;
  background-color: inherit;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.div`
  width: 50%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const fadeInDown = keyframes`
  0%{
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const SelectionArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  overflow: auto;
  /* background-color: #fcc2d7; */
  margin-top: 2rem;
  /* border: 5px solid black; */
  border-radius: 10px;
  justify-content: center;
  animation: ${fadeInDown} 1s;
`;

const Btn = styled.button`
  width: 15rem;
  height: 4rem;
  background-color: #f8f9fa;
  border-radius: 4rem;
  margin: 2rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: #dee2e6;
  }
`;

const GetPosBtn = styled.button`
  width: 5rem;
  height: 4rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  border: 2px solid black;
  text-align: center;
  &:hover {
    background-color: #dee2e6;
  }
`;

const Section = styled.div`
  width: 43%;
  height: 50%;
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
`;

function Location({ swiper }) {
  const { loading, data, error } = useSelector((state) => state.address);
  const ref = useRef();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (!data) return;
    setLocation(data.addressName);
    // console.log(swiper);
    // if (swiper && !swiper.isEnd) {
    //   swiper.slideTo(swiper.activeIndex + 1);
    // } else {
    //   history("/result");
    // }
  }, [data, swiper, history]);

  const onClickNowPos = () => {
    if (!navigator.geolocation) {
      alert(`Can't find your position`);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          getAddress(
            {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            swiper
          )
        );
      },
      () => {},
      { enableHighAccuracy: true }
    );
  };

  const onClickCheck = () => {
    dispatch(getCoords(location));
  };

  const onClickSubmit = () => {
    history("/result");
  };

  // if (loading) return <Loading />;
  // if (error) return <div>에러 ...</div>;
  // if (!data) return null;

  return (
    <>
      <Section col>
        <TextArea>현재 위치</TextArea>
        <div style={{ display: "flex", height: "4rem" }}>
          <LocationArea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <GetPosBtn onClick={onClickNowPos}>현위치</GetPosBtn>
          <GetPosBtn onClick={onClickCheck}>확인</GetPosBtn>
        </div>
        {error && (
          <div className="error-message" ref={ref}>
            주소를 확인해 주세요
          </div>
        )}
        <button
          onClick={onClickSubmit}
          style={{ marginTop: "20px", borderRadius: "10px" }}
        >
          임시제출
        </button>
      </Section>
    </>
  );
}

export default Location;
