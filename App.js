import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "./constants/colors";
import CurrencySelectionScreen from "./Screens/CurrencySelectionScreen";

const currency = require("./constants/currency.json");

export default function App() {
  return <CurrencySelectionScreen />;
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
