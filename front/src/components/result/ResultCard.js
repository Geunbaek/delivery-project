import styled, { css } from "styled-components";
import StarRatings from "react-star-ratings";

const CardWapper = styled.div`
  width: 18rem;
  height: 21rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid white;
  margin: 10px;
  &::before {
    content: "${(props) => props.rank}";
    position: absolute;
    font-size: 25px;
    top: 0;
    left: 0;
  }
`;

const ImgArea = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 3.7rem;
  background-color: white;
  margin: 10px;
  ${(props) =>
    props.bg &&
    css`
      background: url(${props.bg}) no-repeat;
      background-size: cover;
    `}
`;
const TextArea = styled.div`
  width: 100%;
  font-size: 22px;
  text-align: center;
`;

const StarArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function ResultCard({ rank, name, categories, address, logoUrl, reviewAvg }) {
  const url = logoUrl ? `https://www.yogiyo.co.kr/${logoUrl}` : "";
  return (
    <CardWapper rank={rank}>
      <ImgArea bg={url} />
      <StarArea>
        <StarRatings
          rating={parseFloat(reviewAvg)}
          starDimension="40px"
          starSpacing="0"
          starRatedColor="#ffe066"
          starEmptyColor="white"
        />
      </StarArea>
      <TextArea>
        <p>{name}</p>
        <p>{categories.split(" ").join(",")}</p>
        <p>{address}</p>
      </TextArea>
    </CardWapper>
  );
}

export default ResultCard;
