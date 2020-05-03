import * as actions from "../actions/index";

const initialState = {
  userName: "",
  currencySymbol: "",
  loading: true,
  firstTime: true,
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
        firstTime: false,
      };
    case actions.FIRST_TIME_USER:
      return {
        ...state,
        firstTime: true,
      };
    default:
      return state;
  }
};

export default userReducers;
