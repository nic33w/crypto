// @ts-ignore
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
import React from "react";
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

export default function CryptoChart(props: any) {
  const labels = props.data.map((element: any) => {
    const d = new Date(element[0]);

    return d.getDate();
  });
  const padding =
    props.type === "line" ? {} : { left: 50, right: 50, bottom: 20 };

  const options = {
    layout: {
      padding: padding,
    },
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
        ticks: {
          maxTicksLimit: 15,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  function getColor() {
    if (props.type === "bar") {
      return "dodgerblue";
    }
    if (props.data[0]) {
      if (props.data[0][1] > props.data[props.data.length - 1][1]) {
        return "red";
      } else {
        return "lime";
      }
    }
    return "dodgerblue";
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: props.data.map((element: any) => element[1]),
        borderColor: getColor(),
        borderWidth: 1,
        pointStyle: false as const,
        tension: 0.5,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 150);
          gradient.addColorStop(0, "rgba(150,255,150,0.5)");
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          return gradient;
        },
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
