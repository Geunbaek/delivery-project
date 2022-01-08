/*global kakao*/
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ResultCard from "./ResultCard";
import centerMarker from "../../assets/centerMarker.png";
import Loading from "../loading/Loading";

const TextArea = styled.div`
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  border: 5px solid white;
  overflow: scroll;
`;

const ExtraArea = styled.div`
  width: 50%;
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
    // main.setMap(map);

    data.forEach((store, index) => {
      const marker = makeMaker({ lat: store.lat, lng: store.lng }, map);

      // const iwContent = `<div style="font-size:15px;color:black;width:inherit;text-align:center;background:red">${store.name}</div>`;
      // const iwPosition = new kakao.maps.LatLng(store.lat, store.lng);
      // const infowindow = new kakao.maps.InfoWindow({
      //   position: iwPosition,
      //   content: iwContent,
      // });

      // infowindow.open(map, marker);

      // kakao.maps.event.addListener(marker, "mouseover", function () {
      //   infowindow.open(map, marker);
      // });

      // kakao.maps.event.addListener(marker, "mouseout", function () {
      //   infowindow.close();
      // });

      marker.setMap(map);

      // const closeOverlay = () => {
      //   overlay.setMap(null);
      // };

      // const closeBtn = document.createElement("div");
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
      // overlay.setContent(content);
      // overlay.setPosition(new kakao.maps.LatLng(store.lat, store.lng));

      // content.addEventListener("click", (e) => {
      //   e.preventDefault();
      //   closeOverlay();
      // });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        overlay.setZIndex(3);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        overlay.setZIndex(1);
      });
      // document
      //   .querySelector(`.customoverlay${index}`)
      //   .addEventListener("mouseover", (e) => {
      //     console.log(e.target);
      //     console.log(e.target.parentNode);
      //     e.target.parentNode.style.zIndex = "9999999";
      //   });
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
