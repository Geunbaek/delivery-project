import styled from "styled-components";

const CardWapper = styled.div`
  width: 15rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;
  margin: 10px;
`;

const ImgArea = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 3.7rem;
  background-color: white;
  margin: 10px;
`;
const TextArea = styled.div`
  width: 100%;
  font-size: 22px;
  text-align: center;
`;

function ResultCard({ name, categories, address }) {
  return (
    <CardWapper>
      <ImgArea />
      <TextArea>
        <p>{name}</p>
        <p>{categories.split(" ").join(",")}</p>
        <p>{address}</p>
      </TextArea>
    </CardWapper>
  );
}

export default ResultCard;
