import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";

import Colors from "../constants/colors";
import TitleCard from "../Components/TitleCard";
import NoteBook from "../Components/NoteBook";
const data = [
  { id: 1, title: "Home", income: 500, expense: 250 },
  { id: 2, title: "Office", income: 500, expense: 250 },
  { id: 3, title: "Home", income: 500, expense: 250 },
];
const HomeScreen = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const db = SQLite.openDatabase("user.db");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM DATATABLE",
        [],
        (_, { rows: _array }) => {
          setUserDetails(_array._array[0]);
          setLoading(false);
        },
        (_, err) => console.log(err)
      );
    });
  }, []);
  let welcomeString = "Good Morning";
  let currency = "$";
  if (!loading) {
    currency = userDetails.CURRENCY;
    welcomeString = "Good Morning " + userDetails.USERNAME + " ,";
    const time = new Date().getHours();
    if (time >= 12 && time <= 16) {
      welcomeString = "Good Afternoon " + userDetails.USERNAME + " ,";
    } else {
      welcomeString = "Good Evening " + userDetails.USERNAME + " ,";
    }
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.topBar}></View>
      <Text style={styles.text}> {welcomeString} </Text>
      <TitleCard currency={currency} incomeAmount={2500} expenseAmount={1500} />
      <View style={styles.midBar}>
        <Text style={styles.midBarText}>Your Notebooks</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteBook
            symbol={currency}
            title={item.title}
            income={item.income}
            expense={item.expense}
          />
        )}
      />
      <View style={styles.bottomBarWrapper}>
        <View style={styles.bottomBar}>
          <Text style={styles.plus}>+</Text>
        </View>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "flex-start",
  },
  text: {
    color: Colors.text,
    fontSize: 23,
    marginVertical: 15,
    paddingLeft: 25,
  },
  topBar: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.card,
  },
  midBar: {
    width: "100%",
    backgroundColor: Colors.card,
    paddingVertical: 15,
    marginVertical: 20,
  },
  midBarText: {
    fontSize: 20,
    color: Colors.text,
    textAlign: "center",
  },
  bottomBarWrapper: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
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

export default HomeScreen;
