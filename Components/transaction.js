import React from "react";

import { View, Text, StyleSheet, Animated } from "react-native";
import Colors from "../constants/colors";
import Card from "./UI/Card";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/transaction";
import Swipeable from "react-native-gesture-handler/Swipeable";
const transaction = (props) => {
  const dispatch = useDispatch();
  let stylesClass = styles.green,
    prefix = "+ " + props.currency,
    sidebarColor = {};
  if (props.transactionType === "expense") {
    sidebarColor = styles.sidebarRed;
    stylesClass = styles.red;
    prefix = "- " + props.currency;
  }
  const finalStyles = { ...styles.sidebar, ...sidebarColor };
  const swipeLeft = (progess, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          delete
        </Animated.Text>
      </View>
    );
  };

  const deleteTransactionHandler = () => {
    dispatch(
      actions.deleteTransactionHandler(
        props.id,
        props.notebookName,
        props.money,
        props.transactionType,
        "delete"
      )
    );
  };
  return (
    <Swipeable
      renderLeftActions={swipeLeft}
      onSwipeableOpen={deleteTransactionHandler}
    >
      <View>
        <Card style={{ padding: 0 }}>
          <View style={styles.wrapper}>
            <View style={finalStyles}></View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{props.title}</Text>
              <Text style={styles.text}>Category: {props.category}</Text>
            </View>
            <View style={styles.moneyContainer}>
              <Text style={stylesClass}>
                {prefix} {props.money.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </Swipeable>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sidebar: {
    width: 12,
    height: "100%",
    borderTopLeftRadius: 12,
    backgroundColor: "green",
    borderBottomLeftRadius: 12,
  },
  sidebarRed: {
    backgroundColor: Colors.red,
  },
  text: {
    fontSize: 18,
    color: Colors.text,
  },
  textContainer: {
    padding: 15,
  },
  red: {
    fontSize: 22,
    color: Colors.red,
  },
  green: {
    fontSize: 22,
    color: Colors.green,
  },
  moneyContainer: {
    paddingRight: 30,
  },
  leftAction: {
    backgroundColor: "red",
    justifyContent: "center",
    flex: 1,
    marginVertical: 15,
    maxWidth: "90%",
    marginLeft: "5%",
    borderRadius: 12,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20,
  },
});

export default transaction;
