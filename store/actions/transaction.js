import { CREATE_TRANSACTION, FETCH_TRANSACTION } from "./index";
import { createTransactions, fetchTransactions } from "../../Database/database";

export const createTransactionsHandler = (
  notebookName,
  title,
  amount,
  category,
  transactionType
) => {
  console.log(transactionType);
  return async (dispatch) => {
    createTransactions(notebookName, title, amount, category, transactionType)
      .then(() => {
        console.log("transaction Created");
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
