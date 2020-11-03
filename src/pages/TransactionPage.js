import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "is-empty";
import Layout from "../containers/Layout";
import Modal from "../containers/Modal";
import AddContributionForm from "../containers/AddContributionForm";
import {
  fetchTransactions,
  resetMessage,
} from "../actions/creators/transactionActions";
import Transactions from "../containers/Transactions";

import "../assets/stylesheets/pages/transaction-page.scss";

function TransactionPage() {
  const [ShowModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState("");
  const { message, transactions } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(message);
    setTimeout(() => {
      if (message) {
        dispatch(resetMessage(""));
      }
    }, 5000);
    return () => {
      setMessage("");
    };
  }, [message, dispatch]);

  useEffect(() => {
    if (isEmpty(transactions)) dispatch(fetchTransactions(1));
  });

  const showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const addContribution = <AddContributionForm handleClose={hideModal} />;

  const transactionsComponent = (
    <Fragment>
      <div className="row d-flex justify-content-between mb-3">
        <h3>Transactions</h3>
        <div>
          <button type="button" className="btn btn-brown mr-2" disabled>
            Download PDF
          </button>
          <button
            type="button"
            className="btn btn-brown text-dark"
            onClick={showModal}
          >
            Add Contribution
          </button>
        </div>
      </div>
      <div className="row">
        <Modal
          show={ShowModal}
          handleClose={hideModal}
          component={addContribution}
        />
      </div>

      <div className="row">
        <div className="col-12">
          {Message.length > 0 && (
            <div className="alert alert-success alert-message">{Message}</div>
          )}
        </div>
      </div>

      <Transactions />
    </Fragment>
  );

  return <Layout component={transactionsComponent} />;
}

export default TransactionPage;
