import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import "../assets/stylesheets/components/column-chart.scss";

function ColumnChart(props) {
  return (
    <ResponsiveBar
      data={props.data}
      keys={props.keys}
      indexBy={props.indexBy}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      maxValue="auto"
      groupMode={props.groupMode}
      colors={{ scheme: "purpleRed_green" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.xLegend,
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.yLegend,
        legendPosition: "middle",
        legendOffset: -50,
      }}
      enableLabel={props.enableLabel}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={props.labelTextColor}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: props.legendDirection,
          justify: false,
          translateX: 120,
          translateY: props.translateY,
          itemsSpacing: 2,
          itemWidth: props.itemWidth,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
}

export default ColumnChart;
