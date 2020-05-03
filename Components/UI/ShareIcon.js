import React from "react";

import { View, TouchableNativeFeedback, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ShareIcon = (props) => {
  return (
    <View style={styles.bottomBarWrapper}>
      <TouchableNativeFeedback onPress={props.clicked}>
        <View style={styles.bottomBar}>
          <MaterialCommunityIcons name="share-variant" size={25} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = new StyleSheet.create({
  bottomBarWrapper: {
    position: "absolute",
    bottom: 80,
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

export default ShareIcon;
