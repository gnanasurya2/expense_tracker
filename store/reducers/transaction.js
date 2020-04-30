import * as actions from "../actions/index";

const initialState = {
  transactions: [],
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_TRANSACTION:
      return {
        transactions: [...action.data],
      };
    default:
      return state;
  }
};

export default transactionsReducer;
