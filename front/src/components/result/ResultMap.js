/*global kakao*/
import { useEffect, useRef } from "react";
import { Wrapper } from "../../styles/style/GlobalStyle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { getStores } from "../../modules/stores";
import centerMarker from "../../assets/centerMarker.png";
import ResultCard from "./ResultCard";

const Section = styled.div`
  width: 43%;
  height: 50%;
  display: flex;
  flex-direction: ${(props) => props.col && "column"};
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.div`
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  /* flex-direction: column;
  text-align: left; */
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

const makeMaker = (pos, img = null) => {
  const markerPos = new kakao.maps.LatLng(pos.lat, pos.lng);

  const marker = new kakao.maps.Marker({
    position: markerPos,
    image: img,
  });
  return marker;
};

function ResultMap({ positions, center }) {
  const ref = useRef();
  const { data: userInfo } = useSelector((state) => state.address);
  const { loading, data, error } = useSelector((state) => state.stores);
  const { payload: preference } = useSelector((state) => state.preference);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || !data) return;
    const container = ref.current;
    // console.log(userInfo);
    const imageSrc = centerMarker,
      imageSize = new kakao.maps.Size(45, 49), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(45, 49) };
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
      markerImage
    );
    main.setMap(map);

    data.forEach((store) => {
      const marker = makeMaker({ lat: store.lat, lng: store.lng });
      marker.setMap(map);
    });
  }, [data, userInfo]);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getStores(userInfo.coords, preference));
  }, []);

  // if (loading) return <Loading />;
  // if (error) return null;
  if (!userInfo)
    return (
      <>
        <Wrapper color="#b197fc">
          <div>잘못된 접근 입니다.</div>
        </Wrapper>
      </>
    );
  return (
    <>
      <Wrapper color="#b197fc">
        <Section>
          <TextArea>
            {data &&
              data.map((storeInfo) => {
                return (
                  <ResultCard
                    name={storeInfo.name}
                    categories={storeInfo.categories}
                    address={storeInfo.address}
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
            >
              {loading ? <Loading /> : error && <div>에러...</div>}
            </div>
          </ExtraArea>
        </Section>
      </Wrapper>
    </>
  );
}

export default ResultMap;
