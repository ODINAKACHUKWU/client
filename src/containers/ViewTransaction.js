import React from "react";
import { formatAmount, formatDate } from "../helpers/format";

function ViewTransaction(props) {
  return (
    <div>
      <h4 className="text-center mb-3">Transaction details</h4>
      <div className="mb-2">
        <span className="font-weight-bold mr-3">Payee:</span>
        {props.data.payee_name}
      </div>
      <div className="mb-2">
        <span className="font-weight-bold mr-3"> Contribution Date:</span>
        {formatDate(props.data.contribution_date)}
      </div>
      <div className="mb-2">
        <span className="font-weight-bold mr-3"> Amount:</span>
        <span>&#8358;</span>
        {formatAmount(props.data.amount)}
      </div>
      {props.data.memo && (
        <div className="mb-2">
          <span className="font-weight-bold mr-3"> Memo:</span>
          {props.data.memo}
        </div>
      )}
      <div>
        <button
          type="button"
          className="btn btn-brown mr-2"
          onClick={props.handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewTransaction;
