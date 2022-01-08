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

    data.forEach((store) => {
      const marker = makeMaker({ lat: store.lat, lng: store.lng }, map);

      const iwContent = `<div style="padding:5px;font-size:15px;color:black">${store.name}</div>`;
      const iwPosition = new kakao.maps.LatLng(store.lat, store.lng);
      const infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
      });
      infowindow.open(map, marker);
      // kakao.maps.event.addListener(marker, "mouseover", function () {
      //   infowindow.open(map, marker);
      // });

      // kakao.maps.event.addListener(marker, "mouseout", function () {
      //   infowindow.close();
      // });
      marker.setMap(map);

      // const overlay = new kakao.maps.CustomOverlay();

      // const closeOverlay = () => {
      //   overlay.setMap(null);
      // };

      // const closeBtn = document.createElement("div");
      // const content = document.createElement("div");

      // closeBtn.innerHTML = `<div class="close" onClick="${() =>
      //   closeOverlay()}"title="닫기" id="close"/>`;
      // content.innerHTML =
      //   '<div class="wrap" style="color:black;font-size:20px;background:white;">' +
      //   '    <div class="info">' +
      //   '        <div class="title">' +
      //   `            ${store.name}` +
      //   closeBtn.innerText +
      //   "        </div>" +
      //   '        <div class="body">' +
      //   '            <div class="img">' +
      //   '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
      //   "           </div>" +
      //   '            <div class="desc">' +
      //   `                <div class="ellipsis">${store.address}</div>` +
      //   '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
      //   "            </div>" +
      //   "        </div>" +
      //   "    </div>" +
      //   "</div>";
      // overlay.setContent(content);
      // overlay.setPosition(new kakao.maps.LatLng(store.lat, store.lng));

      // content.addEventListener("click", (e) => {
      //   e.preventDefault();
      //   closeOverlay();
      // });

      // kakao.maps.event.addListener(marker, "click", function () {
      //   overlay.setMap(map);
      // });
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
