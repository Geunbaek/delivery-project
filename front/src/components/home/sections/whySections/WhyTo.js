import { Line } from "react-chartjs-2";
import { chartData } from "../../../../data/chartData";
import Loading from "../../../loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGraphData } from "../../../../modules/graphData";
import styled from "styled-components";

const Section = styled.div`
  width: 43%;
  height: 60%;
  display: flex;
  align-items: center;
`;

const TextArea = styled.div`
  width: 50%;
  height: 100%;
  font-size: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
`;

const ExtraArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  & .graph {
    width: 800px;

    background-color: white;
    border-radius: 10px;
  }
`;

function WhyTo() {
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

  return (
    <Section>
      <TextArea>
        코로나로
        <br />
        배달수도
        <br /> 증가하는데 ...
      </TextArea>
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
