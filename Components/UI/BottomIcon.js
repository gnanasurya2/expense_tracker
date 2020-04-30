import React from "react";

import { View, TouchableNativeFeedback, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const BottomIcon = (props) => {
  return (
    <View style={styles.bottomBarWrapper}>
      <TouchableNativeFeedback onPress={props.clicked}>
        <View style={styles.bottomBar}>
          <Text style={styles.plus}>+</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = new StyleSheet.create({
  bottomBarWrapper: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },
  bottomBar: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 30,
  },
});

export default BottomIcon;
