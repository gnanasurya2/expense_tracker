import { FETCH_NOTEBOOKS } from "./index";
import {
  createNotebook,
  fetchNotebook,
  deleteNotebooks,
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

export const deleteNotebook = () => {
  return async (dispatch) => {
    await deleteNotebooks()
      .then((mess) => {
        console.log(mess);
        dispatch(fetchNotebooks());
      })
      .catch((err) => console.log(err));
  };
};
