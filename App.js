import React from "react";
import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";
import Colors from "./constants/colors";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { SplashScreen } from "expo";
import userReducer from "./store/reducers/user";
import ReduxThunk from "redux-thunk";
import {
  init,
  fetchNotebookAmount,
  fetchTransactions,
} from "./Database/database";
import notebookReducer from "./store/reducers/Notebook";
import transactionsReducer from "./store/reducers/transaction";
import RootNavigator from "./Navigation/RootNavigator";

const rootReducer = combineReducers({
  user: userReducer,
  notebook: notebookReducer,
  transaction: transactionsReducer,
});
init()
  .then(() => {
    console.log("initialzed");
  })
  .catch((err) => console.log(err));

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: Colors.card,
    elevation: 12,
    padding: 12,
  },
  titleText: {
    color: Colors.text,
  },
});
