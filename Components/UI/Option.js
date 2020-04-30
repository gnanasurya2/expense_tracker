import React, { useState } from "react";

import { Text, View, TouchableNativeFeedback, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Option = (props) => {
  const [active, setActive] = useState(false);
  return (
    <TouchableNativeFeedback onPress={props.clicked}>
      <View style={props.active ? styles.activeWrapper : styles.wrapper}>
        <Text style={props.active ? styles.activeText : styles.text}>
          {props.type}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 40,
  },
  activeWrapper: {
    backgroundColor: Colors.active,
    marginVertical: 10,
    marginHorizontal: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
  },
  text: {
    color: Colors.text,
    fontSize: 20,
  },
  activeText: {
    color: "black",
    fontSize: 20,
  },
});

export default Option;
