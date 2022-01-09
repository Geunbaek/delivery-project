import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BarChart from "./BarChart";

const BtnArea = styled.div`
  width: 30%;
  height: 39vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 20px;
`;

const Btn = styled.button`
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0);
  color: black;
  font-size: 25px;
  &:hover {
    transform: scale(1.1);
  }
`;

function AnalysisResult({ type, func }) {
  const { loading, data, error } = useSelector(
    (state) => state.graphData[type]
  );
  const dispatch = useDispatch();
  const [activeBtn, setActiveBtn] = useState(0);

  useEffect(() => {
    dispatch(func());
  }, []);

  useEffect(() => {}, [activeBtn]);

  if (loading) return <Loading />;
  if (error) return <div>에러...</div>;
  if (!data) return null;

  return (
    <>
      <BtnArea>
        {Object.keys(data[0]).map((el, idx) => {
          return <Btn onClick={() => setActiveBtn(idx)}>{el}</Btn>;
        })}
      </BtnArea>
      <div style={{ width: "100%", height: "50%" }}>
        <BarChart
          type={data[0][Object.keys(data[0])[activeBtn]]}
          key={activeBtn}
        />
      </div>
    </>
  );
}

export default AnalysisResult;
