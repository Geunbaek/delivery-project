import axios from "axios";
import useAsync from "../../../Hooks/useAsync";
import { Line } from "react-chartjs-2";
import { chartData } from "../../../data/chartData";
import Loading from "../../loading/Loading";

async function getData() {
  const url = "http://localhost:5000/cov/patient-delivery";
  const params = {
    unit: "month",
    startdate: "2020-01-01",
    enddate: "2021-08-30",
  };
  const res = await axios.get(url, { params });

  return res;
}

const coronaUrl = "http://localhost:5000/corona_cnt/cov";

function WhyTo() {
  const [state, fetch] = useAsync(() => getData(), []);
  const { loading, data, error } = state;

  if (loading) return <Loading />;
  if (error) return <div>에러 ...</div>;
  if (!data) return null;

  const chartParams = chartData(
    data.label,
    data.patient,
    data.deliver,
    "#ffdeeb"
  );

  return (
    <>
      <Line data={chartParams.data} options={chartParams.options} />
    </>
  );
}

export default WhyTo;
