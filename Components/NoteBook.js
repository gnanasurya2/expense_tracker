import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Card from "./UI/Card";
import Line from "./UI/Line";
import Colors from "../constants/colors";
import { PanGestureHandler } from "react-native-gesture-handler";

const NoteBook = (props) => {
  return (
    <TouchableOpacity
      onLongPress={() => props.delete(props.title)}
      onPress={() => props.clicked(props.title)}
    >
      <Card>
        <Text style={styles.title}>{props.title} Notebook</Text>
        <Line />
        <View style={{ marginTop: 20 }}></View>
        <View style={styles.incomeContainer}>
          <Text style={styles.text}>Income: </Text>
          <Text style={styles.green}>
            {props.symbol} {props.income.toLocaleString("en-IN")}
          </Text>
        </View>
        <View style={styles.incomeContainer}>
          <Text style={styles.text}>Expense: </Text>
          <Text style={styles.red}>
            {props.symbol} {props.expense.toLocaleString("en-IN")}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = new StyleSheet.create({
  title: {
    fontSize: 22,
    color: Colors.text,
    marginBottom: 15,
    marginLeft: 20,
  },
  incomeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  text: {
    fontSize: 20,
    color: Colors.text,
  },
  green: {
    fontSize: 20,
    color: Colors.green,
  },
  red: {
    fontSize: 20,
    color: Colors.red,
  },
});

export default NoteBook;
