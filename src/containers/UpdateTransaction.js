import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTransaction,
  fetchTransactions,
} from "../actions/creators/transactionActions";
import { updateTransactionValidator } from "../helpers/validator";

import "../assets/stylesheets/containers/update-transaction.scss";

function UpdateTransaction(props) {
  const dispatch = useDispatch();
  const [Payee, setPayee] = useState("");
  const [ContributionDate, setContributionDate] = useState("");
  const [Amount, setAmount] = useState("");
  const [Memo, setMemo] = useState("");
  const { error, transactions } = useSelector((state) => state.transaction);
  const [Errors, setErrors] = useState({});

  useEffect(() => {
    setPayee(props.data.payee_name);
    setContributionDate(props.data.contribution_date);
    setAmount(props.data.amount);
    setMemo(props.data.memo);
  }, [props]);

  const isValid = (data) => {
    const { errors, isValid } = updateTransactionValidator(data);

    if (!isValid) {
      setErrors(errors);
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      payee_name: Payee,
      contribution_date: ContributionDate,
      amount: Amount,
      memo: Memo,
    };

    if (isValid(data)) {
      dispatch(updateTransaction(props.data.id, data)).then(() => {
        dispatch(fetchTransactions(transactions.meta.current_page));
        props.handleClose();
      });
    }
  };

  const handleFocus = () => {
    setErrors({});
  };

  return (
    <div>
      <h4 className="text-center">Update Transaction</h4>
      <form onSubmit={handleSubmit} id="addContributionForm">
        <div className="form-group">
          <label>
            Payee name <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="payeeName"
            value={Payee}
            onChange={(e) => setPayee(e.target.value)}
            onFocus={handleFocus}
            required
          />
          <small id="payeeNameHelp" className="form-text text-muted">
            Please enter only the first name and last name.
          </small>
        </div>
        {Errors.payee_name && (
          <div className="alert alert-danger">{Errors.payee_name}</div>
        )}
        <div className="form-group">
          <label>
            Contribution Date <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={ContributionDate}
            onChange={(e) => setContributionDate(e.target.value)}
            onFocus={handleFocus}
            required
            disabled
          />
        </div>
        {Errors.contribution_date && (
          <div className="alert alert-danger">{Errors.contribution_date}</div>
        )}
        <div className="form-group">
          <label>
            Amount <span>(&#8358;)</span> <span className="required">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            min="50"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
            onFocus={handleFocus}
            step=".01"
            required
          />
          <small id="payeeNameHelp" className="form-text text-muted">
            Minimum amount of <span>&#8358;</span>50 is required.
          </small>
        </div>
        {Errors.amount && (
          <div className="alert alert-danger">{Errors.amount}</div>
        )}
        <div className="form-group">
          <label>Memo</label>
          <textarea
            className="form-control"
            id="memo"
            rows="4"
            placeholder="Describe the contribution..."
            value={Memo}
            onChange={(e) => setMemo(e.target.value)}
          ></textarea>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-brown">
          Modify
        </button>
      </form>
    </div>
  );
}

export default UpdateTransaction;
