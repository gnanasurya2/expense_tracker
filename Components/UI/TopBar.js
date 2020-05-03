import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/colors";

const TopBar = (props) => <View style={styles.topBar}></View>;

const styles = new StyleSheet.create({
  topBar: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.card,
    alignItems: "flex-end",
  },
});
export default TopBar;
