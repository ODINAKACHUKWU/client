import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Modal from "../containers/Modal";
import DeleteTransaction from "../containers/DeleteTransaction";
import UpdateTransaction from "../containers/UpdateTransaction";
import ViewTransaction from "../containers/ViewTransaction";
import { fetchTransactions } from "../actions/creators/transactionActions";
import { formatAmount, formatDate } from "../helpers/format";

import "../assets/stylesheets/containers/transactions.scss";
import "../assets/stylesheets/pages/transaction-page.scss";

function Transactions() {
  const [TotalCount, setTotalCount] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);
  const [NextPage, setNextPage] = useState(null);
  const [PreviousPage, setPreviousPage] = useState(null);
  const { transactions } = useSelector((state) => state.transaction);
  const [ShowModal, setShowModal] = useState(false);
  const [Action, setAction] = useState("");
  const [Transaction, setTransaction] = useState({});
  const [Transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const showModal = (action, transaction) => {
    setAction(action);
    setTransaction(transaction);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (transactions.meta) {
      const {
        current_page,
        total_count,
        next_page,
        prev_page,
        total_pages,
      } = transactions.meta;
      setCurrentPage(current_page);
      setTotalCount(total_count);
      setNextPage(next_page);
      setPreviousPage(prev_page);
      setTotalPages(total_pages);
      setTransactions(transactions.data);

      window.history.pushState(
        { page: current_page },
        `Page ${current_page}`,
        `?page=${current_page}`
      );
      if (transactions.data.length < 15) {
        document.getElementById("footer").style.position = "fixed";
      }
    }
  }, [transactions]);

  const handleNext = () => {
    dispatch(fetchTransactions(NextPage));
  };

  const handlePrev = () => {
    dispatch(fetchTransactions(PreviousPage));
  };

  const element = () => {
    switch (Action) {
      case "modify":
        return <UpdateTransaction handleClose={hideModal} data={Transaction} />;
      case "delete":
        return <DeleteTransaction handleClose={hideModal} data={Transaction} />;
      case "view":
        return <ViewTransaction handleClose={hideModal} data={Transaction} />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <div className="row">
        <Modal show={ShowModal} handleClose={hideModal} component={element()} />
      </div>
      <div className="row mt-3 d-flex justify-content-between mb-2">
        <small>{`${formatAmount(TotalCount)} Transaction${
          TotalCount > 1 ? "s" : ""
        }`}</small>
        <small>
          {`${formatAmount(CurrentPage)} of ${formatAmount(TotalPages)} page${
            TotalPages > 1 ? "s" : ""
          }`}
        </small>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Payee </th>
            <th scope="col">
              Amount <span>(&#8358;)</span>
            </th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Transactions.length > 0 &&
            Transactions.map((transaction) => (
              <tr key={transaction.id} className="table-row">
                <th
                  scope="row"
                  role="button"
                  onClick={() => showModal("view", transaction)}
                >
                  {transaction.payee_name}
                </th>
                <td
                  role="button"
                  onClick={() => showModal("view", transaction)}
                >
                  {formatAmount(transaction.amount)}
                </td>
                <td
                  role="button"
                  onClick={() => showModal("view", transaction)}
                >
                  {formatDate(transaction.contribution_date)}
                </td>
                <td role="button">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => showModal("modify", transaction)}
                    className="mr-3"
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => showModal("delete", transaction)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="row d-flex justify-content-end">
        <button
          className="btn btn-brown mr-3"
          disabled={PreviousPage ? false : true}
          onClick={handlePrev}
        >
          {"<"}
        </button>
        <button
          className="btn btn-brown"
          disabled={NextPage ? false : true}
          onClick={handleNext}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Transactions;
