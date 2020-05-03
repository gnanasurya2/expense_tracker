import {
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
  NEW_TRANSACTION,
} from "./index";
import {
  createTransactions,
  fetchTransactions,
  deleteTransaction,
} from "../../Database/database";

import { fetchNotebookHandler } from "./Notebook";
export const createTransactionsHandler = (
  notebookName,
  title,
  amount,
  category,
  transactionType,
  date
) => {
  return async (dispatch) => {
    createTransactions(
      notebookName,
      title,
      amount,
      category,
      transactionType,
      date
    )
      .then(() => {
        dispatch(fetchTransactionsHandler(notebookName));
      })
      .catch((err) => console.log(err));
  };
};

export const fetchTransactionsHandler = (notebookName) => {
  return async (dispatch) => {
    fetchTransactions(notebookName)
      .then((data) => {
        data = data.rows._array;
        dispatch({
          type: FETCH_TRANSACTION,
          data: data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const newTransactionHandler = (state) => {
  return {
    type: NEW_TRANSACTION,
    flag: state,
  };
};

export const deleteTransactionHandler = (id, name, amount, type, operation) => {
  return async (dispatch) => {
    deleteTransaction(id)
      .then(() => {
        dispatch(fetchTransactionsHandler(name));
        dispatch(fetchNotebookHandler(name, amount, type, operation));
      })
      .catch((err) => console.log(err));
  };
};
