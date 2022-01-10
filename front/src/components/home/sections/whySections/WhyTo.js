import { Line } from "react-chartjs-2";
import { chartData } from "../../../../data/chartData";
import Loading from "../../../loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGraphData } from "../../../../modules/graphData";
import styled from "styled-components";
import { MOBILE_LAYOUT, PC_LAYOUT } from "../../../../data/layout";

const Section = styled.div`
  width: 43%;
  height: 60%;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${PC_LAYOUT}px) {
    height: auto;
    display: block;
    width: 63%;
  }

  @media screen and (max-width: ${MOBILE_LAYOUT}px) {
    width: 90%;
  }
`;

const TextArea = styled.div`
  width: 50%;
  height: 100%;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  @media screen and (max-width: ${PC_LAYOUT}px) {
    display: block;
  }

  @media screen and (max-width: 980px) {
    font-size: 40px;
  }
`;

const ExtraArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  @media screen and (max-width: ${PC_LAYOUT}px) {
    display: block;
  }

  @media screen and (max-width: 980px) {
    width: 100%;
  }

  & .graph {
    width: 600px;
    background-color: white;
    border-radius: 10px;

    @media screen and (max-width: 980px) {
      width: 100%;
    }
  }
`;

const SpanArea1 = styled.span`
  color: #70f8ff;
`;

function WhyTo() {
  const { loading, data, error } = useSelector(
    (state) => state.graphData.deliveryGraphData
  );
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
        <SpanArea1>배달 이용</SpanArea1>
        늘어나는데 ...
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
