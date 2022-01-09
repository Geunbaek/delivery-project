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
              fontSize: 10,
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
              fontSize: 10,
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
const color = {
  ORANGE: "#d9480f",
  YELLOW: "#ffd43b",
  LIME: "#a9e34b",
  GREEN: "#69db7c",
  TEAL: "#63e6be",
  CYAN: "#3bc9db",
  BLUE: "#74c0fc",
  INDIGO: "#91a7ff",
  VIOLET: "#9775fa",
  GRAPE: "#da77f2",
  PINK: "#f783ac",
  RED: "#ffa8a8",
  GRAY: "#343a40",
  RED9: "#c92a2a",
};

export const barData = (label, data) => {
  return {
    data: {
      labels: label,
      datasets: [
        {
          data: data,
          backgroundColor: Object.values(color),
          hoverBackgroundColor: Object.values(color),
        },
      ],
    },
    option: {
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        // Y축
        yAxes: [
          {
            ticks: {
              // 간격 설정
              fontColor: "#ffffff",
              fontSize: 15,
            },
            gridLines: {
              // grid line 설정
              display: false,
              drawBorder: false,
              color: "#3c3d40",
            },
          },
        ],
        // X축
        xAxes: [
          {
            // bar 너비 조정
            ticks: {
              fontColor: "#ffffff",
              fontSize: 15,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  };
};
