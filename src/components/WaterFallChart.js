import React from "react";
import { Chart } from "react-google-charts";

function WaterFallChart(props) {
  return (
    <Chart
      width={"100%"}
      height={320}
      chartType="CandlestickChart"
      data={props.data}
      options={{
        legend: "none",
        bar: { groupWidth: "100%" }, // Remove space between bars.
        candlestick: {
          fallingColor: {
            strokeWidth: 0,
            fill: "#a52714",
          }, // red
          risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
        },
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
}

export default WaterFallChart;
