import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  fetchTransactions,
} from "../actions/creators/transactionActions";
import { formatAmount, formatDate } from "../helpers/format";

import "../assets/stylesheets/containers/delete-transaction.scss";

function DeleteTransaction(props) {
  const { error, transactions } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(deleteTransaction(id)).then(() => {
      dispatch(fetchTransactions(transactions.meta.current_page));
      props.handleClose();
    });
  };

  return (
    <div>
      <h4 className="text-center mb-3">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="exclamation mr-3"
        />
        Delete
      </h4>
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
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mt-2">
        <button
          type="button"
          className="btn btn-brown mr-2"
          onClick={props.handleClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleClick(props.data.id)}
        >
          Okay
        </button>
      </div>
    </div>
  );
}

export default DeleteTransaction;
