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
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "배달건수",
          data: deliverCnt,
          fill: false,
          yAxisID: "Delivery Count",
          borderColor: "rgb(230, 126, 34)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: color,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: color,
            },
            id: "Infected Count",
            type: "linear",
            position: "left",
            scalePositionLeft: true,
          },
          {
            gridLines: {
              color: color,
            },
            id: "Delivery Count",
            type: "linear",
            position: "right",
            scalePositionLeft: false,
            min: 0,
            max: 1,
          },
        ],
      },
    },
  };
};
