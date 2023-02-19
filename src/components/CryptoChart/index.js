import Box from "../Box";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function CryptoChart(props) {
  const labels = props.data.map((element) => {
    const d = new Date(element[0]);
    return d.getMonth() + 1 + "-" + d.getDate();
    //return d.toDateString();
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },

      x: {
        display: props.showLabels,
      },
    },
  };

  function getColor() {
    if (props.data[0][1] > props.data[props.data.length - 1][1]) {
      return "red";
    } else {
      return "green";
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: props.data.map((element) => element[1]),
        borderColor: getColor(),
        borderWidth: 1,
        pointStyle: false,
        tension: 0.5,
        fill: props.type === "area",
      },
    ],
  };

  return (
    <Box width="100%">
      {props.type === "bar" ? (
        <Bar data={data} options={options} />
      ) : (
        <Line data={data} options={options} />
      )}
    </Box>
  );
}

// bg="#191B1F"
// <Line data={data} options={options} />
// <Bar data={data} options={options} />
