import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SQLite from "expo-sqlite";

import Colors from "../constants/colors";
import TitleCard from "../Components/TitleCard";
import NoteBook from "../Components/NoteBook";
import Modal from "../Components/UI/Modal";
import TopBar from "../Components/UI/TopBar";
import BottomIcon from "../Components/UI/BottomIcon";
import * as actions from "../store/actions/user";
import * as notebookActions from "../store/actions/Notebook";
import { deleteNotebooks } from "../Database/database";
const HomeScreen = (props) => {
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user);
  const firstTime = useSelector((state) => state.user.firstTime);
  const noteBooksData = useSelector((state) => state.notebook.notebooks);
  const [showModal, setShowModal] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(firstTime);
    if (firstTime) {
      props.navigation.navigate("Settings");
    }
    dispatch(actions.fetchUserDetail());
    dispatch(notebookActions.fetchNotebooks());
  }, []);
  useEffect(() => {
    if (noteBooksData) {
      let totalIncome = 0,
        totalExpense = 0;
      for (let notebook of noteBooksData) {
        totalIncome += notebook.INCOME;
        totalExpense += notebook.EXPENSE;
      }
      setIncomeAmount(totalIncome);
      setExpenseAmount(totalExpense);
    }
  }, [noteBooksData]);
  let welcomeString = "Good Morning";
  let currency = "$";
  if (!loading) {
    currency = user.currencySymbol;
    welcomeString = "Good Morning " + user.userName + " ,";
    const time = new Date().getHours();
    if (time >= 12 && time <= 16) {
      welcomeString = "Good Afternoon " + user.userName + " ,";
    } else {
      welcomeString = "Good Evening " + user.userName + " ,";
    }
  }
  const createNotebooksHandler = () => {
    if (notebookName !== "") {
      dispatch(notebookActions.createNotebooks(notebookName, 0, 0));
      setShowModal(false);
      setNotebookName("");
    }
  };

  const deleteNotebook = (title) => {
    console.log("delete");
    dispatch(notebookActions.deleteNotebookHandler(title));
  };

  const notebookClickHandler = (title) => {
    props.navigation.navigate("notebook", {
      screen: "Notebook",
      params: {
        notebookName: title,
      },
    });
  };
  return (
    <View style={styles.wrapper}>
      <TopBar />
      <Text style={styles.text}> {welcomeString} </Text>
      <TitleCard
        currency={currency}
        incomeAmount={incomeAmount}
        expenseAmount={expenseAmount}
      />
      <View style={styles.midBar}>
        <Text style={styles.midBarText}>Your Notebooks</Text>
      </View>
      <FlatList
        data={noteBooksData}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <NoteBook
            symbol={currency}
            id={item.ID}
            title={item.NAME}
            income={item.INCOME}
            expense={item.EXPENSE}
            delete={deleteNotebook}
            clicked={notebookClickHandler}
          />
        )}
      />
      <BottomIcon clicked={() => setShowModal(true)} />
      <Modal
        visible={showModal}
        value={notebookName}
        changeText={(text) => setNotebookName(text)}
        clicked={createNotebooksHandler}
      />
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
});

export default HomeScreen;
