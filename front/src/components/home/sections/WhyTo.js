import axios from "axios";
import useAsync from "../../../Hooks/useAsync";
import { Line } from "react-chartjs-2";
import { chartData } from "../../../data/chartData";
import Loading from "../../loading/Loading";

async function getData(url1, url2) {
  const res = await axios.get(url1);
  const res2 = await axios.get(url2);
  return [res, res2];
}

const coronaUrl = "http://localhost:5500/corona_cnt/cov";
const deliverUrl = "http://localhost:5500/deliver_cnt/deliver";

function WhyTo() {
  const [state, fetch] = useAsync(() => getData(coronaUrl, deliverUrl), []);
  const { loading, data, error } = state;

  if (loading) return <Loading />;
  if (error) return <div>에러 ...</div>;
  if (!data) return null;

  const chartParams = chartData(
    data.label,
    Object.values(data.corona.map((el) => el[1])),
    Object.values(data.deliver.map((el) => el[1])),
    "#ffdeeb"
  );

  return (
    <>
      <Line data={chartParams.data} options={chartParams.options} />
    </>
  );
}

export default WhyTo;
