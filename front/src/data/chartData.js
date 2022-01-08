export const chartData = (label, coronaCnt, deliverCnt, color) => {
  return {
    data: {
      labels: label,
      datasets: [
        {
          label: "확진자수",
          data: coronaCnt,
          fill: false,
          yAxisID: "Infected Count",
          borderColor: "red",
          tension: 0.1,
        },
        {
          label: "배달건수",
          data: deliverCnt,
          fill: false,
          yAxisID: "Delivery Count",
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      legend: {
        position: "bottom",
        labels: {
          fontColor: "black",
          fontSize: 18,
        },
      },

      scales: {
        xAxes: [
          {
            gridLines: {
              color: "white",
            },
            ticks: {
              fontColor: "black",
              fontSize: 13,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "white",
            },
            ticks: {
              // 간격 설정
              fontColor: "white",
              fontSize: 13,
            },
            id: "Infected Count",
            type: "linear",
            position: "left",
            scalePositionLeft: true,
          },
          {
            gridLines: {
              color: "white",
            },
            ticks: {
              // 간격 설정
              fontColor: "white",
              fontSize: 13,
            },
            id: "Delivery Count",
            type: "linear",
            position: "right",
            scalePositionLeft: false,
            // min: 0,
            // max: 1,
          },
        ],
      },
    },
  };
};
