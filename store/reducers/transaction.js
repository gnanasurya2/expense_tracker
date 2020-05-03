import * as actions from "../actions/index";

const initialState = {
  transactions: [],
  newTransaction: false,
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_TRANSACTION:
      return {
        ...state,
        transactions: [...action.data],
      };
    case actions.NEW_TRANSACTION:
      return {
        ...state,
        newTransaction: action.flag,
      };
    default:
      return state;
  }
};

export default transactionsReducer;
