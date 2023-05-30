import { ChartData } from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Line } from "react-chartjs-2";

export default function Graph(props: {
  chartData: ChartData<"line", (number | Point | null)[], unknown>;
}) {
  var style = getComputedStyle(document.body);
  var primaryColor = style.getPropertyValue("--primary");
  var secondaryColor = style.getPropertyValue("--secondary");

  return (
    <>
      <Line
        data={props.chartData}
        options={{
          interaction: {
            intersect: false,
          },
          elements: {
            line: {
              cubicInterpolationMode: "monotone",
              borderColor: primaryColor,
              fill: "start",
              backgroundColor: (context: any) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, primaryColor);
                gradient.addColorStop(1, "rgba(255,255,255,0)");
                return gradient;
              },
            },
            point: {
              radius: 0,
              hoverRadius: 8,
              backgroundColor: primaryColor,
              borderColor: secondaryColor,
              borderWidth: 2,
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
            tooltip: { yAlign: "bottom", xAlign: "center" },
          },
          scales: {
            y: {
              display: false,
              min: 0,
            },
          },
        }}
      />
    </>
  );
}
