import { Line } from "react-chartjs-2";
import { chartData } from "../../../data/chartData";
import Loading from "../../loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGraphData } from "../../../modules/graphData";
import styled from "styled-components";

// const Section = styled.div`
//   width: 43%;
//   height: 50%;
//   display: flex;
//   flex-direction: ${(props) => props.col && "column"};
//   justify-content: center;
//   align-items: center;
// `;

// const TextArea = styled.div`
//   width: 50%;
//   height: 100%;
//   display: flex;
//   font-size: 50px;
//   flex-direction: column;
//   text-align: left;
// `;

// const ExtraArea = styled.div`
//   width: 50%;
//   height: 100%;
//   display: flex;
//   flex-direction: column-reverse;
//   align-items: center;
// `;

const Section = styled.div`
  width: 43%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
`;

const TextArea = styled.div`
  width: 100%;
  /* height: 100%; */
  font-size: 100px;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  text-align: left;
  margin-bottom: 50px;
`;

const ExtraArea = styled.div`
  width: 120%;
  height: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: row-reverse;
  justify-content: flex-start;
  /* align-items: center; */
  background-size: contain;
  & .graph {
    width: 800px;
    height: 400px;
  }
`;

function WhyTo({ idx }) {
  const { loading, data, error } = useSelector((state) => state.graphData);
  const dispatch = useDispatch();
  const [chartParams, setChartParams] = useState(chartData([], [], []));

  useEffect(() => {
    dispatch(getGraphData("month", "2020-01-01", "2020-12-30"));
  }, [dispatch]);

  useEffect(() => {
    if (!data) return;
    setChartParams(
      chartData(data.label, data.patient, data.deliver, "#b197fc")
    );
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <div>에러 ...</div>;
  if (!data) return null;

  // const chartParams = chartData(
  //   data.label,
  //   data.patient,
  //   data.deliver,
  //   "#ffdeeb"
  // );

  return (
    <Section>
      <TextArea>왜?</TextArea>
      <ExtraArea>
        <div className="graph">
          <Line
            data={chartParams.data}
            options={chartParams.options}
            height={400}
            width={800}
          />
        </div>
      </ExtraArea>
    </Section>
  );
}

export default WhyTo;
