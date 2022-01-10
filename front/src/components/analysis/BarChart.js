import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { barData } from "../../data/chartData";

function BarChart({ type }) {
  const [barParams, setBarParams] = useState(barData([], []));

  useEffect(() => {
    setBarParams(
      barData(
        type.map((el) => el[0]),
        type.map((el) => el[1])
      )
    );
  }, []);

  return <Bar data={barParams.data} options={barParams.option} />;
}

export default BarChart;
