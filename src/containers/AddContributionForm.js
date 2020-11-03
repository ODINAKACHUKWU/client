import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "is-empty";
import { transactionValidator } from "../helpers/validator";
import {
  recordTransaction,
  fetchTransactions,
} from "../actions/creators/transactionActions";

import "../assets/stylesheets/containers/add-contribution-form.scss";
import "../assets/stylesheets/pages/transaction-page.scss";

function AddContributionForm(props) {
  const [Payee, setPayee] = useState("");
  const [ContributionDate, setContributionDate] = useState("");
  const [Amount, setAmount] = useState("");
  const [Memo, setMemo] = useState("");
  const [Errors, setErrors] = useState({});
  const { error, transaction, transactions } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(transaction)) {
      dispatch(fetchTransactions(transactions.meta.current_page));
      props.handleClose();
    }
    return () => {
      setPayee("");
      setContributionDate("");
      setAmount("");
      setMemo("");
    };
  }, [transaction, props, dispatch, transactions.meta.current_page]);

  const isValid = (data) => {
    const { errors, isValid } = transactionValidator(data);

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
      dispatch(recordTransaction(data));
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPayee("");
    setContributionDate("");
    setAmount("");
    setMemo("");
  };

  const handleFocus = () => {
    setErrors({});
  };

  return (
    <div>
      <h4 className="text-center">Add Contribution</h4>
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
          />
          <small id="payeeNameHelp" className="form-text text-muted">
            Please enter the current date in the format - <i>mm/dd/yyyy</i>.
          </small>
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

        <button
          type="reset"
          className="btn btn-danger mr-2"
          onClick={handleReset}
        >
          Clear
        </button>
        <button type="submit" className="btn btn-brown">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddContributionForm;
