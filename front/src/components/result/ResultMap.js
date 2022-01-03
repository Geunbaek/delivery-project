/*global kakao*/
import { useEffect, useRef } from "react";
import { Wrapper } from "../../styles/style/GlobalStyle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { getStores } from "../../modules/stores";

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
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ExtraArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const makeMaker = (pos) => {
  const markerPos = new kakao.maps.LatLng(pos.lat, pos.lng);
  const marker = new kakao.maps.Marker({
    position: markerPos,
  });
  return marker;
};

function ResultMap({ positions, center }) {
  const ref = useRef();
  const { data: userInfo } = useSelector((state) => state.address);
  const { loading, data, error } = useSelector((state) => state.stores);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || !data) return;
    const container = ref.current;
    // console.log(userInfo);
    const option = {
      center: new kakao.maps.LatLng(userInfo.coords.lat, userInfo.coords.lng),
      level: 6,
    };

    const map = new kakao.maps.Map(container, option);

    const main = makeMaker({
      lat: userInfo.coords.lat,
      lng: userInfo.coords.lng,
    });
    main.setMap(map);

    data.forEach((store) => {
      const marker = makeMaker({ lat: store.lat, lng: store.lng });
      marker.setMap(map);
    });
  }, [data]);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getStores(userInfo.coords));
  }, []);

  // if (loading) return <Loading />;
  // if (error) return null;

  return (
    <>
      <Wrapper color="#ffdeeb">
        {!userInfo && <div>잘못된 접근 입니다.</div>}
        <Section>
          <TextArea />
          <ExtraArea>
            <div id="map" ref={ref} style={{ width: "100%", height: "100%" }}>
              {loading ? <Loading /> : error && <div>에러...</div>}
            </div>
          </ExtraArea>
        </Section>
      </Wrapper>
    </>
  );
}

ResultMap.defaultProps = {
  center: {
    lat: "37.365264512305174",
    lng: "127.10676860117488",
  },
  positions: [
    {
      lat: "37.365264512305174",
      lng: "127.10576860117488",
    },
    {
      lat: "37.364264512305174",
      lng: "127.10676860117488",
    },
    {
      lat: "37.365164512305174",
      lng: "127.10676860117488",
    },
  ],
};

export default ResultMap;
