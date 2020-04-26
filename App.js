import React from "react";
import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";
import Colors from "./constants/colors";
import CurrencySelectionScreen from "./Screens/CurrencySelectionScreen";
import HomeScreen from "./Screens/HomeScreen";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import userReducer from "./store/reducers/user";
import MyTabs from "./Navigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
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
