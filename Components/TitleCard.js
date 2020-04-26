import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import Card from "./UI/Card";
import Line from "./UI/Line";
import Colors from "../constants/colors";

const TitleCard = (props) => {
  const [style, setStyle] = useState(styles.green);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    setBalance(props.incomeAmount - props.expenseAmount);
    if (balance < 0) {
      balance *= -1;
      setStyle(styles.red);
    } else {
      setStyle(styles.green);
    }
  }, [balance, props.incomeAmount, props.expenseAmount]);

  return (
    <Card>
      <View style={styles.incomeContainer}>
        <Text style={styles.incomeText}>Your total Income:</Text>
        <Text style={styles.green}>
          {props.currency} {props.incomeAmount}
        </Text>
      </View>
      <View style={styles.incomeContainer}>
        <Text style={styles.incomeText}>Your total Expense:</Text>
        <Text style={styles.red}>
          {props.currency} {props.expenseAmount}
        </Text>
      </View>
      <Line />
      <View style={styles.incomeContainer}>
        <Text style={styles.incomeText}>Your total Balance:</Text>
        <Text style={style}>
          {props.currency} {balance}
        </Text>
      </View>
    </Card>
  );
};

const styles = new StyleSheet.create({
  incomeText: {
    fontSize: 20,
    color: Colors.text,
    alignSelf: "center",
    paddingRight: 20,
  },
  green: {
    fontSize: 20,
    color: Colors.green,
  },
  red: {
    fontSize: 20,
    color: Colors.red,
  },
  incomeContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 7,
    paddingRight: "5%",
  },
});

export default TitleCard;
