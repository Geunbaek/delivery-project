import { useReducer, useEffect } from "react";

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
      const res = await cb();
      dispatch({
        type: "SUCCESS",
        data: {
          label: res.data.data.patients.map((patient) => patient.date),
          patient: res.data.data.patients.map(
            (patient) => patient.patient_count
          ),
          deliver: res.data.data.deliveries.map(
            (deliver) => deliver.deliver_count
          ),
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
