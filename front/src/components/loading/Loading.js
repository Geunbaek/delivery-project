import styled from "styled-components";
import loadingImg from "../../assets/loadingImg.gif";

const LoadingWrapper = styled.div`
  width: 128px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingPage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${loadingImg});
  & + div {
    font-size: 20px;
  }
`;

function Loading() {
  return (
    <LoadingWrapper>
      <LoadingPage />
      <div>Loading...</div>
    </LoadingWrapper>
  );
}

export default Loading;
