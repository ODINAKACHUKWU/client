import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import ColumnChart from "../components/ColumnChart";
import WaterFallChart from "../components/WaterFallChart";
import {
  composeCurrentYearData,
  composeAnnualData,
  composeAnnualIncDecData,
  composeAveContribution,
} from "../helpers/composers";

import "../assets/stylesheets/containers/datasection-one.scss";

function DataSection() {
  const [Year, setYear] = useState("");
  const [Span, setSpan] = useState("");
  const [SpanRecords, setSpanRecords] = useState([]);
  const [CurrentYearRecords, setCurrentYearRecords] = useState([]);
  const { report, summary } = useSelector((state) => state.transaction);
  const keys = ["contribution"];
  const annualKeys = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    if (report.length > 0 && !isEmpty(summary)) {
      const currentYearRecords = report.filter(
        (record) => record.contribution_date.split("-")[0] === summary.year
      );
      setYear(summary.year);
      setSpan(summary.span);
      setCurrentYearRecords(currentYearRecords);
      setSpanRecords(report);
    }
  }, [report, summary]);

  const currentYeardata = composeCurrentYearData(CurrentYearRecords);
  const annualData = composeAnnualData(SpanRecords, Span);
  const annualIncDecData = composeAnnualIncDecData(SpanRecords, Span);
  const aveContribution = composeAveContribution(SpanRecords, Span);

  console.log(">>>>>>>>>>>>>>>>>>>>", annualIncDecData);

  return (
    <Fragment>
      <div className="row mb-3">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-5">
            <div className="row">
              <div className="col-12">
                <p className="text-muted">CONTRIBUTIONS BY MONTH</p>
                <p className="count-text">Year {Year}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 chart">
                <ColumnChart
                  keys={keys}
                  indexBy="month"
                  groupMode="grouped"
                  xLegend={null}
                  yLegend={null}
                  data={currentYeardata}
                  legendDirection="column"
                  translateY={0}
                  itemWidth={100}
                  enableLabel={true}
                  labelTextColor="#ffffff"
                  colorScheme="purpleRed_green"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-5">
            <div className="row">
              <div className="col-12">
                <p className="text-muted">CONTRIBUTIONS BY YEAR</p>
                <p className="count-text">
                  {Year && `Years ${Year - 4} - ${Year}`}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 chart">
                <ColumnChart
                  data={annualData}
                  keys={keys}
                  indexBy="year"
                  groupMode="grouped"
                  xLegend={null}
                  yLegend={null}
                  legendDirection="column"
                  translateY={0}
                  itemWidth={100}
                  enableLabel={true}
                  labelTextColor="#ffffff"
                  colorScheme="purpleRed_green"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-5">
            <div className="row">
              <div className="col-12">
                <p className="text-muted">DYNAMICS</p>
                <p className="count-text">
                  Contribution increase/decrease by year
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 chart">
                <WaterFallChart data={annualIncDecData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-5">
            <div className="row">
              <div className="col-12">
                <p className="text-muted">AVERAGE</p>
                <p className="count-text">Ave contribution by month and year</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 chart">
                <ColumnChart
                  data={aveContribution}
                  keys={annualKeys}
                  indexBy="year"
                  groupMode="stacked"
                  xLegend={null}
                  yLegend={null}
                  legendDirection="row"
                  translateY={52}
                  itemWidth={80}
                  enableLabel={true}
                  labelTextColor="#ffffff"
                  colorScheme="category10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DataSection;
