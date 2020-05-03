import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/user";
import * as transactionsActions from "../store/actions/transaction";
import * as notebookActions from "../store/actions/Notebook";

import * as sharing from "expo-sharing";

import sheet from "../Database/Excel";

import Colors from "../constants/colors";

import TopBar from "../Components/UI/TopBar";
import Line from "../Components/UI/Line";
import TitleCard from "../Components/TitleCard";
import Transaction from "../Components/transaction";
import BottomIcon from "../Components/UI/BottomIcon";
import ShareIcon from "../Components/UI/ShareIcon";

const NoteBookScreen = (props) => {
  const currency = useSelector((state) => state.user.currencySymbol);
  const transactions = useSelector((state) => state.transaction.transactions);
  const newTransaction = useSelector(
    (state) => state.transaction.newTransaction
  );
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUserDetail());
    dispatch(
      transactionsActions.fetchTransactionsHandler(
        props.route.params.notebookName
      )
    );
  }, []);
  useEffect(() => {
    if (transactions) {
      let totalIncome = 0,
        totalExpense = 0;
      for (let transaction of transactions) {
        if (transaction.transactionType === "income") {
          totalIncome += transaction.amount;
        } else {
          totalExpense += transaction.amount;
        }
      }
      setIncomeAmount(totalIncome);
      setExpenseAmount(totalExpense);
    }
  }, [transactions]);

  const createTransactionHandler = () => {
    props.navigation.navigate("transaction", {
      notebookName: props.route.params.notebookName,
    });
  };
  let list = null;
  if (transactionHistory) {
    list = (
      <FlatList
        data={transactions.reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Transaction
            id={item.id}
            title={item.title}
            transactionType={item.transactionType}
            category={item.category}
            money={item.amount}
            currency={currency}
            notebookName={props.route.params.notebookName}
          />
        )}
      />
    );
  }

  const clickHandler = () => {
    sheet(props.route.params.notebookName).then((filename) => {
      sharing
        .isAvailableAsync()
        .then(() => {
          sharing.shareAsync(filename).catch((err) => console.log(err));
        })
        .catch(() => console.log("error"));
    });
  };

  return (
    <View style={styles.wrapper}>
      <TopBar notebookName={props.route.params.notebookName} />
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
      <ShareIcon clicked={clickHandler} />
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
