import React from "react";
import { View, StyleSheet } from "react-native";

const Line = (props) => {
  return <View style={styles.wrapper}></View>;
};

const styles = new StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "96%",
    alignSelf: "center",
  },
});
export default Line;
