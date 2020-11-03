import TYPES from "../actions/constants";

const {
  SUBMITTING_TRANSACTION,
  SUBMIT_TRANSACTION_SUCCESS,
  SUBMIT_TRANSACTION_FAILURE,
  FETCHING_TRANSACTIONS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETING_TRANSACTION,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
  UPDATING_TRANSACTION,
  FETCHING_TRANSACTION,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
  SET_TRANSACTION_SUCCESS_MESSAGE,
  FETCHING_REPORT,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE,
  SET_REPORT_SUMMARY,
  RESET_MESSAGE,
} = TYPES;

const initialState = {
  submittingTransaction: false,
  fetchingTransactions: false,
  fetchingTransaction: false,
  fetchingReport: false,
  deletingTransaction: false,
  transaction: {},
  transactions: {},
  report: [],
  summary: {},
  message: "",
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMITTING_TRANSACTION:
      return {
        ...state,
        submittingTransaction: action.bool,
      };
    case SUBMIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.transaction,
      };
    case SUBMIT_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case FETCHING_TRANSACTIONS:
      return {
        ...state,
        fetchingTransactions: action.bool,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.transactions,
      };
    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case DELETE_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case DELETING_TRANSACTION:
      return {
        ...state,
        deletingTransaction: action.bool,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case UPDATE_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case UPDATING_TRANSACTION:
      return {
        ...state,
        updatingTransaction: action.bool,
      };
    case FETCHING_TRANSACTION:
      return {
        ...state,
        fetchingTransaction: action.bool,
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.transaction,
      };
    case FETCH_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case FETCHING_REPORT:
      return {
        ...state,
        fetchingReport: action.bool,
      };
    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        report: action.report,
      };
    case FETCH_REPORT_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SET_TRANSACTION_SUCCESS_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case SET_REPORT_SUMMARY:
      return {
        ...state,
        summary: action.summary,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
