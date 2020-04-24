import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import intl from "intl";
import Colors from "../constants/colors";
import en from "intl/locale-data/jsonp/en-IN";
const width = Dimensions.get("window").width;
const Currency = (props) => {
  const symbol = props.symbol;
  const Sym = intl
    .NumberFormat(en, { style: "currency", currency: symbol })
    .format(0)
    .toString()
    .split("0")[0];
  return (
    <TouchableNativeFeedback onPress={() => props.clicked(Sym, props.name)}>
      <View style={styles.wrapper}>
        <Text style={styles.symbol}>{Sym}</Text>
        <Text style={styles.name}>{props.name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.card,
    flexDirection: "row",
    width: width * 0.9,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: Colors.text,
    alignSelf: "center",
    borderBottomWidth: 1,
  },
  symbol: {
    color: Colors.text,
    fontSize: 16,
    width: 40,
  },
  name: {
    color: Colors.text,
    paddingLeft: 30,
    fontSize: 16,
  },
});

export default Currency;
