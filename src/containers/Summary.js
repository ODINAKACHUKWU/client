import React, { useEffect, useState, Fragment } from "react";
import isEmpty from "is-empty";
import { useSelector } from "react-redux";
import { formatAmount } from "../helpers/format";

import "../assets/stylesheets/containers/summary.scss";

import arrowUp from "../assets/images/upward-icon.svg";
import arrowDown from "../assets/images/downward-icon.svg";
import chartIcon from "../assets/images/chart-icon.svg";

function Summary() {
  const [CurrentMonthTotal, setCurrentMonthTotal] = useState("");
  const [CurrentYearTotal, setCurrentYearTotal] = useState("");
  const [TotalContribution, setTotalContribution] = useState("");
  const [TotalTransactions, setTotalTransactions] = useState("");
  const [PrevMonthTotal, setPrevMonthTotal] = useState("");
  const [PrevYearTotal, setPrevYearTotal] = useState("");
  const { summary } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (!isEmpty(summary)) {
      const {
        current_month_total,
        current_year_total,
        total,
        total_transactions,
        prev_year_total,
        prev_month_total,
      } = summary;
      setCurrentMonthTotal(current_month_total);
      setCurrentYearTotal(current_year_total);
      setTotalContribution(total);
      setTotalTransactions(total_transactions);
      setPrevMonthTotal(prev_month_total);
      setPrevYearTotal(prev_year_total);
    }
  }, [summary]);

  const setIcon = (prev, current) => {
    const icon = prev > current ? arrowDown : arrowUp;
    return icon;
  };

  const setIncDecPercentage = (previous, current_total, text) => {
    const prev = parseInt(previous);
    const current = parseInt(current_total);
    if (prev > current) {
      if (current === 0) {
        return <span>No contribution yet</span>;
      }
      const value =
        current === 0 ? 100 : (((prev - current) * 100) / current).toFixed(1);
      return (
        <Fragment>
          <span className="mr-2 text-red">{`-${value}%`}</span> {text}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span className="mr-2 text-green">{`+${(
            ((current - prev) * 100) /
            current
          ).toFixed(1)}%`}</span>{" "}
          {text}
        </Fragment>
      );
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4 mb-3">
          <div className="row mb-4">
            <div className="col-8">
              <p className="text-muted">CURRENT MONTH</p>
              <p className="count-text">
                <span>&#8358;</span>
                {CurrentMonthTotal && formatAmount(CurrentMonthTotal)}
              </p>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <img
                src={setIcon(PrevMonthTotal, CurrentMonthTotal)}
                width="50"
                alt="Traffic icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>
                {CurrentMonthTotal &&
                  PrevMonthTotal &&
                  setIncDecPercentage(
                    PrevMonthTotal,
                    CurrentMonthTotal,
                    "Since last month"
                  )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4 mb-3">
          <div className="row mb-4">
            <div className="col-8">
              <p className="text-muted">CURRENT YEAR</p>
              <p className="count-text">
                <span>&#8358;</span>
                {CurrentYearTotal && formatAmount(CurrentYearTotal)}
              </p>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <img
                src={setIcon(PrevYearTotal, CurrentYearTotal)}
                width="50"
                alt="Traffic icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>
                {PrevYearTotal &&
                  CurrentYearTotal &&
                  setIncDecPercentage(
                    PrevYearTotal,
                    CurrentYearTotal,
                    "Since last year"
                  )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4 mb-3">
          <div className="row mb-4">
            <div className="col-8">
              <p className="text-muted">TOTAL</p>
              <p className="count-text">
                <span>&#8358;</span>
                {TotalContribution && formatAmount(TotalContribution)}
              </p>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <img src={chartIcon} width="50" alt="Traffic icon" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>
                {TotalTransactions &&
                  `${TotalTransactions} Contribution${
                    TotalTransactions > 1 ? "s" : ""
                  }`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
