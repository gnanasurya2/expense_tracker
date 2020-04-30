import { USER_DETAIL, FETCH_USER_DETAIL } from "./index";
import { getData } from "../../Database/database";

export const userDetialsHandler = (userName, currency) => {
  return {
    type: USER_DETAIL,
    userName: userName,
    currency: currency,
  };
};

export const fetchUserDetail = () => {
  return async (dispatch) => {
    await getData()
      .then((data) => {
        data = data.rows._array;
        dispatch({
          type: FETCH_USER_DETAIL,
          userName: data[0].USERNAME,
          currency: data[0].CURRENCY,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
