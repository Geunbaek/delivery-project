/*global kakao*/
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ResultCard from "./ResultCard";
import centerMarker from "../../assets/centerMarker.png";
import Loading from "../loading/Loading";
import {
  MOBILE_LAYOUT,
  PC_LAYOUT,
  SMALL_MOBILE_LAYOUT,
} from "../../data/layout";

const TextArea = styled.div`
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  border: 5px solid white;
  overflow: scroll;
  @media screen and (max-width: ${PC_LAYOUT}px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: ${640}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ExtraArea = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const makeMaker = (pos, map, img = null) => {
  const markerPos = new kakao.maps.LatLng(pos.lat, pos.lng);

  const marker = new kakao.maps.Marker({
    position: markerPos,
    image: img,
    map: map,
  });
  return marker;
};

function ResultArea({ userInfo, type, func }) {
  const ref = useRef();
  const { loading, data, error } = useSelector((state) => state.stores[type]);
  const { categories: preference } = useSelector((state) => state.preference);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo || !data) return;
    const container = ref.current;
    const imageSrc = centerMarker;
    const imageSize = new kakao.maps.Size(45, 49);
    const imageOption = { offset: new kakao.maps.Point(22.5, 49) };

    const option = {
      center: new kakao.maps.LatLng(userInfo.coords.lat, userInfo.coords.lng),
      level: 6,
    };

    const map = new kakao.maps.Map(container, option);
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const main = makeMaker(
      {
        lat: userInfo.coords.lat,
        lng: userInfo.coords.lng,
      },
      map,
      markerImage
    );

    data.forEach((store, index) => {
      const marker = makeMaker({ lat: store.lat, lng: store.lng }, map);

      marker.setMap(map);
      const content =
        `<div class="customoverlay${index}" style="font-size:20px;background:black;">` +
        `  <a href="https://www.yogiyo.co.kr/mobile/#/${store.sid}/" target="_blank" style="display:inline-block;text-decoration:none;color:white;padding:5px;">` +
        `    <span class="title">${store.name}</span>` +
        "  </a>" +
        "</div>";
      const position = new kakao.maps.LatLng(store.lat, store.lng);
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: position,
        map: map,
        clickable: true,
        yAnchor: 2.3,
        zIndex: 1,
      });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        overlay.setZIndex(3);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        overlay.setZIndex(1);
      });
    });
  }, [data, userInfo]);

  useEffect(() => {
    if (!userInfo) return;
    if (type === "stores") {
      dispatch(func(userInfo.coords, preference));
    } else {
      dispatch(func(userInfo.coords));
    }
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>에러 ...</div>;

  return (
    <>
      <TextArea>
        {data &&
          data.map((storeInfo, index) => {
            return (
              <ResultCard
                rank={index + 1}
                name={storeInfo.name}
                categories={storeInfo.categories}
                address={storeInfo.address}
                logoUrl={storeInfo.logo_url}
                reviewAvg={storeInfo.review_avg}
                sid={storeInfo.sid}
                key={index}
              />
            );
          })}
      </TextArea>
      <ExtraArea>
        <div
          id="map"
          ref={ref}
          style={{
            width: "100%",
            height: "100%",
            border: "5px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </ExtraArea>
    </>
  );
}

export default ResultArea;
