import axios from "axios";
import constants from "../../utils/constants";
import TYPES from "../constants";

const { BASE_URL } = constants;
const {
  SUBMITTING_TRANSACTION,
  SUBMIT_TRANSACTION_SUCCESS,
  SUBMIT_TRANSACTION_FAILURE,
  FETCHING_TRANSACTIONS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_SUCCESS,
  DELETING_TRANSACTION,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
  UPDATING_TRANSACTION,
  FETCHING_TRANSACTION,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
  FETCHING_REPORT,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE,
  SET_TRANSACTION_SUCCESS_MESSAGE,
  SET_REPORT_SUMMARY,
  RESET_MESSAGE,
} = TYPES;

const resetMessage = (message) => ({ type: RESET_MESSAGE, message });

const setReportSummary = (summary) => ({
  type: SET_REPORT_SUMMARY,
  summary,
});

const submittingTransaction = (bool) => ({
  type: SUBMITTING_TRANSACTION,
  bool,
});

const submitTransactionFailure = (error) => ({
  type: SUBMIT_TRANSACTION_FAILURE,
  error,
});

const submitTransactionSuccess = (transaction) => ({
  type: SUBMIT_TRANSACTION_SUCCESS,
  transaction,
});

const fetchingTransactions = (bool) => ({
  type: FETCHING_TRANSACTIONS,
  bool,
});

const fetchTransactionsSuccess = (transactions) => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  transactions,
});

const fetchTransactionsFailure = (error) => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  error,
});

const deletingTransaction = (bool) => ({
  type: DELETING_TRANSACTION,
  bool,
});

const deleteTransactionSuccess = (message) => ({
  type: DELETE_TRANSACTION_SUCCESS,
  message,
});

const deleteTransactionFailure = (error) => ({
  type: DELETE_TRANSACTION_FAILURE,
  error,
});

const updatingTransaction = (bool) => ({
  type: UPDATING_TRANSACTION,
  bool,
});

const updateTransactionSuccess = (message) => ({
  type: UPDATE_TRANSACTION_SUCCESS,
  message,
});

const updateTransactionFailure = (error) => ({
  type: UPDATE_TRANSACTION_FAILURE,
  error,
});

const fetchingTransaction = (bool) => ({
  type: FETCHING_TRANSACTION,
  bool,
});

const fetchTransactionSuccess = (transaction) => ({
  type: FETCH_TRANSACTION_SUCCESS,
  transaction,
});

const fetchTransactionFailure = (error) => ({
  type: FETCH_TRANSACTION_FAILURE,
  error,
});

const fecthingReport = (bool) => ({
  type: FETCHING_REPORT,
  bool,
});

const fetchReportSuccess = (report) => ({
  type: FETCH_REPORT_SUCCESS,
  report,
});

const fetchReportFailure = (error) => ({
  type: FETCH_REPORT_FAILURE,
  error,
});

const setTransactionSuccessMessage = (message) => ({
  type: SET_TRANSACTION_SUCCESS_MESSAGE,
  message,
});

const recordTransaction = (data) => async (dispatch) => {
  dispatch(submittingTransaction(true));
  try {
    const url = `${BASE_URL}/transactions`;
    const response = await axios.post(url, data);
    dispatch(submitTransactionSuccess(response.data.data));
    dispatch(setTransactionSuccessMessage(response.data.message));
  } catch (error) {
    dispatch(submitTransactionFailure(error.message));
  } finally {
    dispatch(submittingTransaction(false));
  }
};

const fetchTransactions = (page) => async (dispatch) => {
  dispatch(fetchingTransactions(true));
  try {
    const url = `${BASE_URL}/transactions?page=${page}`;
    const response = await axios.get(url);
    const transactions = response.data;
    dispatch(fetchTransactionsSuccess(transactions));
  } catch (error) {
    dispatch(fetchTransactionsFailure(error.message));
  } finally {
    dispatch(fetchingTransactions(false));
  }
};

const deleteTransaction = (id) => async (dispatch) => {
  dispatch(deletingTransaction(true));
  try {
    const url = `${BASE_URL}/transactions/${id}`;
    const response = await axios.delete(url);
    const message = response.data.message;
    dispatch(deleteTransactionSuccess(message));
  } catch (error) {
    dispatch(deleteTransactionFailure(error.message));
  } finally {
    dispatch(deletingTransaction(false));
  }
};

const updateTransaction = (id, data) => async (dispatch) => {
  dispatch(updatingTransaction(true));
  try {
    const url = `${BASE_URL}/transactions/${id}`;
    const response = await axios.patch(url, data);
    const message = response.data.message;
    dispatch(updateTransactionSuccess(message));
  } catch (error) {
    dispatch(updateTransactionFailure(error.message));
  } finally {
    dispatch(updatingTransaction(false));
  }
};

const fetchTransaction = (id) => async (dispatch) => {
  dispatch(fetchingTransaction(true));
  try {
    const url = `${BASE_URL}/transactions/${id}`;
    const response = await axios.get(url);
    const transaction = response.data;
    dispatch(fetchTransactionSuccess(transaction));
  } catch (error) {
    dispatch(fetchTransactionFailure(error.message));
  } finally {
    dispatch(fetchingTransaction(false));
  }
};

const fetchReport = (year, span) => async (dispatch) => {
  dispatch(fecthingReport(true));
  try {
    const url = `${BASE_URL}/report?year=${year}&span=${span}`;
    const response = await axios.get(url);
    const report = response.data;
    const meta = composeMetaData(response.headers);
    dispatch(fetchReportSuccess(report));
    dispatch(setReportSummary(meta));
  } catch (error) {
    dispatch(fetchReportFailure(error.message));
  } finally {
    dispatch(fecthingReport(false));
  }
};

const composeMetaData = (object) => {
  const meta = {};
  meta.year = object.year;
  meta.span = object.span;
  meta.total = object.total;
  meta.prev_year_total = object.previous_year_total;
  meta.current_year_total = object.current_year_total;
  meta.current_month_total = object.current_month_total;
  meta.total_transactions = object.total_transactions;
  meta.prev_month_total = object.previous_month_total;
  return meta;
};

export {
  fetchTransaction,
  recordTransaction,
  fetchTransactions,
  deleteTransaction,
  updateTransaction,
  fetchReport,
  resetMessage,
};
