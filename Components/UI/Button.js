import React from "react";
import { View, TouchableNativeFeedback, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const Button = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.clicked}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    marginVertical: 25,
    paddingHorizontal: 28,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    elevation: 12,
  },
  text: {
    fontSize: 18,
  },
});

export default Button;
