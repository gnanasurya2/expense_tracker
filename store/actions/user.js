import { USER_DETAIL, FETCH_USER_DETAIL, FIRST_TIME_USER } from "./index";
import { getData, addUser } from "../../Database/database";

export const userDetialsHandler = (userName, currency) => {
  return async (dispatch) => {
    await addUser(userName, currency)
      .then(dispatch(fetchUserDetail()))
      .catch((err) => console.log(err));
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
        dispatch({
          type: FIRST_TIME_USER,
        });
      });
  };
};
