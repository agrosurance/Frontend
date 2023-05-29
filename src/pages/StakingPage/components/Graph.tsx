import { ChartData } from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Line } from "react-chartjs-2";

export default function Graph(props: {
  chartData: ChartData<"line", (number | Point | null)[], unknown>;
}) {
  return (
    <>
      <Line
        data={props.chartData}
        options={{
          elements: {
            line: {
              cubicInterpolationMode: "monotone",
              borderColor: "green",
            },
          },
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Staking History",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </>
  );
}
