import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../../../modules/address";
import { Btn } from "../../etc/button";

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
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: ${(props) => props.size}px;
  & p {
    font-size: ${(props) => props.size - 10}px;
  }
`;

const NowPosBtn = styled.button`
  width: 5rem;
  background-color: #b197fc;
  border-radius: 1rem;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  border: 2px solid white;
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
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const inSeoulCheck = ({ lat, lng }) => {
  [lat, lng] = [parseFloat(lat), parseFloat(lng)];
  console.log(lat, lng);
  return (
    lat >= 37.413294 &&
    lat <= 37.715133 &&
    lng >= 126.734086 &&
    lng <= 127.269311
  );
};

function Location({ swiper, setLocation, setIsInSeoul, location }) {
  const { data } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      setLocation("");
      return;
    }
    setLocation(data.addressName);
    if (!inSeoulCheck(data.coords)) {
      setIsInSeoul(false);
      return;
    }
    setIsInSeoul(true);
  }, [data, setLocation, setIsInSeoul]);

  const swiperHandle = () => {
    swiper.slideTo();
  };

  const setLocationHandle = (e) => {
    setLocation(e.target.value);
  };
  const getNowPos = () => {
    if (!navigator.geolocation) {
      alert(`Can't find your position`);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        dispatch(
          getAddress({
            lat,
            lng,
          })
        );
      },
      () => {},
      { enableHighAccuracy: true }
    );
  };

  return (
    <Section>
      <TextArea size={50}>
        위치를 입력해주세요.
        <br />
        <p>(서울시 지역만 입력 가능합니다.)</p>
      </TextArea>

      <div style={{ display: "flex", height: "4rem", marginBottom: "2px" }}>
        <LocationArea
          value={location}
          onChange={setLocationHandle}
          placeholder="ex) 강남구 강남대로"
        />
        <NowPosBtn onClick={getNowPos}>현위치</NowPosBtn>
      </div>
      <Btn>다음</Btn>
    </Section>
  );
}

export default Location;
