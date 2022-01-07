import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress, getCoords } from "../../../modules/address";
import Loading from "../../loading/Loading";
import { gu } from "../../../data/districtsData";
import { useNavigate } from "react-router-dom";

const LocationArea = styled.input`
  height: 4rem;
  width: 40rem;
  border: none;
  border-bottom: 2px solid black;
  background-color: inherit;
  text-align: center;
  color: white;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 10rem;
`;

const Btn = styled.button`
  width: 5rem;
  /* height: 4rem; */
  background-color: #b197fc;
  border-radius: 1rem;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  border: 2px solid black;
  text-align: center;
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
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

export const inSeoulCheck = (lat, lng) => {
  [lat, lng] = [parseFloat(lat), parseFloat(lng)];
  return (
    lat < 37.413294 || lat > 37.715133 || lng < 126.734086 || lng > 127.269311
  );
};

function Location({ swiper }) {
  const { loading, data, error } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const history = useNavigate();

  const [location, setLocation] = useState("");
  const [isInSeoul, setIsInSeoul] = useState(true);

  useEffect(() => {
    if (!data) return;
    setLocation(data.addressName);
    // console.log(swiper);
    // if (swiper && !swiper.isEnd) {
    //   swiper.slideTo(swiper.activeIndex + 1);
    // } else {
    //   history("/result");
    // }
  }, [data]);

  const onClickNowPos = () => {
    if (!navigator.geolocation) {
      alert(`Can't find your position`);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        if (inSeoulCheck(lat, lng)) {
          setIsInSeoul(false);
          return;
        }
        dispatch(
          getAddress(
            {
              lat,
              lng,
            },
            swiper
          )
        );
        setIsInSeoul(true);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  };

  const onClickSubmit = () => {
    dispatch(getCoords(location, setIsInSeoul, swiper));
  };

  // if (loading) return <Loading />;
  // if (error) return <div>에러 ...</div>;
  // if (!data) return null;

  return (
    <Section col>
      <TextArea>위치를 입력해주세요.</TextArea>
      <div style={{ display: "flex", height: "4rem", marginBottom: "2px" }}>
        <LocationArea
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Btn onClick={onClickNowPos}>현위치</Btn>
        {/* <Btn onClick={onClickCheck}>확인</Btn> */}
      </div>

      <div
        className="error-message"
        style={{
          height: "16px",
          fontSize: "25px",
          marginBottom: "10rem",
          color: "red",
        }}
      >
        {(error && "주소를 확인해 주세요.") ||
          (!isInSeoul && "서울지역만 가능합니다.")}
      </div>

      <Btn onClick={onClickSubmit}>다음</Btn>
    </Section>
  );
}

export default Location;
