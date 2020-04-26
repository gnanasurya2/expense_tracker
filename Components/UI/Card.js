import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

const Card = (props) => {
  return <View style={styles.wrapper}>{props.children}</View>;
};

const styles = new StyleSheet.create({
  wrapper: {
    width: "90%",
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
    alignSelf: "center",
  },
});

export default Card;
