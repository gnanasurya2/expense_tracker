import { FETCH_NOTEBOOKS } from "./index";
import {
  createNotebook,
  fetchNotebook,
  deleteNotebook,
  updateNotebook,
  fetchNotebookAmount,
} from "../../Database/database";
export const fetchNotebooks = () => {
  return async (dispatch) => {
    fetchNotebook()
      .then((data) => {
        data = data.rows._array;
        dispatch({
          type: FETCH_NOTEBOOKS,
          data: data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const createNotebooks = (name, income, expense) => {
  return async (dispatch) => {
    await createNotebook(name, income, expense)
      .then(dispatch(fetchNotebooks()))
      .catch((err) => console.log(err));
  };
};

export const deleteNotebookHandler = (name) => {
  return async (dispatch) => {
    await deleteNotebook(name)
      .then((mess) => {
        dispatch(fetchNotebooks());
      })
      .catch((err) => console.log(err));
  };
};

export const updateNotebookHandler = (name, amount, type) => {
  return async (dispatch) => {
    await updateNotebook(name, amount, type)
      .then((data) => {
        dispatch(fetchNotebooks());
      })
      .catch((err) => console.log(err));
  };
};

export const fetchNotebookHandler = (name, amount, type, operation) => {
  return async (dispatch) => {
    await fetchNotebookAmount(type, name).then((data) => {
      if (operation === "delete") {
        amount = data - amount;
      } else {
        amount += data;
      }
      dispatch(updateNotebookHandler(name, amount, type));
    });
  };
};
