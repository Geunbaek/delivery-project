import { Line } from "react-chartjs-2";
import { chartData } from "../../../data/chartData";
import Loading from "../../loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGraphData } from "../../../modules/graphData";

function WhyTo({ idx }) {
  const { loading, data, error } = useSelector((state) => state.graphData);
  const dispatch = useDispatch();
  const [chartParams, setChartParams] = useState(chartData([], [], []));

  useEffect(() => {
    dispatch(getGraphData("month", "2020-01-01", "2021-08-30"));
  }, [dispatch]);

  useEffect(() => {
    if (!data) return;
    setChartParams(
      chartData(data.label, data.patient, data.deliver, "#ffdeeb")
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
    <>
      <Line
        data={chartParams.data}
        options={chartParams.options}
        height={500}
        width={1000}
      />
    </>
  );
}

export default WhyTo;
