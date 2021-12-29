/*global kakao*/
import { useEffect, useRef } from "react";
import { Wrapper } from "../../styles/style/GlobalStyle";
import styled from "styled-components";

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

  useEffect(() => {
    const container = ref.current;
    const option = {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 3,
    };

    const map = new kakao.maps.Map(container, option);

    positions.forEach((pos) => {
      const marker = makeMaker(pos);
      marker.setMap(map);
    });
  }, []);

  return (
    <>
      <Wrapper color="#ffdeeb">
        <Section>
          <TextArea />
          <ExtraArea>
            <div
              id="map"
              ref={ref}
              style={{ width: "100%", height: "100%" }}
            ></div>
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
