import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/user";
import * as transactionsActions from "../store/actions/transaction";
import { deleteTable } from "../Database/database";
import Colors from "../constants/colors";

import TopBar from "../Components/UI/TopBar";
import Line from "../Components/UI/Line";
import TitleCard from "../Components/TitleCard";
import Transaction from "../Components/transaction";
import BottomIcon from "../Components/UI/BottomIcon";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";

const NoteBookScreen = (props) => {
  const currency = useSelector((state) => state.user.currencySymbol);
  const transactions = useSelector((state) => state.transaction.transactions);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUserDetail());
    dispatch(transactionsActions.fetchTransactionsHandler());
  }, []);

  useEffect(() => {
    if (props.route.params) {
      dispatch(
        transactionsActions.createTransactionsHandler(
          "Home",
          props.route.params.title,
          props.route.params.amount,
          props.route.params.category,
          props.route.params.transactionType
        )
      );
      setTransactionHistory([...transactionHistory, props.route.params]);
      changeBalanceHandler(
        props.route.params.transactionType,
        props.route.params.amount
      );
    }
  }, [props.route.params]);
  const changeBalanceHandler = (transactionType, amount) => {
    console.log(amount);
    if (amount != undefined) {
      if (transactionType === "income") {
        setIncomeAmount(incomeAmount + amount);
      } else {
        setExpenseAmount(expenseAmount + amount);
      }
    }
  };
  const createTransactionHandler = () => {
    props.navigation.navigate("transaction");
  };
  let list = null;
  if (transactionHistory) {
    list = (
      <FlatList
        data={transactions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Transaction
            title={item.title}
            transactionType={item.transactionType}
            category={item.category}
            money={item.amount}
            currency={currency}
          />
        )}
      />
    );
  }
  return (
    <View style={styles.wrapper}>
      <TopBar />
      <Text style={styles.title}>
        {props.route.params.notebookName} Notebook
      </Text>
      <View style={styles.line}>
        <Line />
      </View>
      <TitleCard
        incomeAmount={incomeAmount}
        currency={currency}
        expenseAmount={expenseAmount}
      />
      {list}
      <BottomIcon clicked={createTransactionHandler} />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "700",
    color: Colors.text,
    marginVertical: 20,
  },
  line: {
    width: "90%",
    marginLeft: "5%",
  },
});

export default NoteBookScreen;
