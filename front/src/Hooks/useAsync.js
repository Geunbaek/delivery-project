import { useReducer, useEffect } from "react";
const monthInfo = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Wrong type : ${action.type}`);
  }
}

function useAsync(cb, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const [res, res2] = await cb();
      const coronaCnt = res.data.data.reduce((acc, cur) => {
        let { date, patient_count } = cur;
        date = date.split(" ");
        const ym = [date[3], monthInfo[date[2]]].join();
        return {
          ...acc,
          [ym]: acc[ym]
            ? acc[ym] + parseInt(patient_count)
            : parseInt(patient_count),
        };
      }, {});

      const deliverCnt = res2.data.data.reduce((acc, cur) => {
        let { date, deliver_count } = cur;
        date = date.split(" ");
        const ym = [date[3], monthInfo[date[2]]].join();
        return {
          ...acc,
          [ym]: acc[ym]
            ? acc[ym] + parseInt(deliver_count)
            : parseInt(deliver_count),
        };
      }, {});

      const labels = Object.keys(deliverCnt).filter((el) => el in coronaCnt);
      const coronaData = Object.entries(coronaCnt).filter((el) =>
        labels.includes(el[0])
      );
      const deliverData = Object.entries(deliverCnt).filter((el) =>
        labels.includes(el[0])
      );

      dispatch({
        type: "SUCCESS",
        data: {
          label: labels,
          corona: coronaData,
          deliver: deliverData,
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
