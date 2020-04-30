import * as actions from "../actions/index";

const initialState = {
  notebooks: [],
};

const notebookReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_NOTEBOOKS:
      return {
        ...state,
        notebooks: [...action.data],
      };
    default:
      return state;
  }
};

export default notebookReducers;
