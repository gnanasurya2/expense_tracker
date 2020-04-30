import * as actions from "../actions/index";

const initialState = {
  userName: "",
  currencySymbol: "",
  loading: true,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_DETAIL:
      return {
        ...state,
        userName: action.userName,
        currencySymbol: action.currency,
      };
    case actions.FETCH_USER_DETAIL:
      return {
        ...state,
        userName: action.userName,
        currencySymbol: action.currency,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducers;
