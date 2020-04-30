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
  const data = useSelector((state) => state.notebook.notebooks);
  const [showModal, setShowModal] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // deleteNotebooks();
    dispatch(actions.fetchUserDetail());
    dispatch(notebookActions.fetchNotebooks());
  }, []);
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

  const deleteNotebookHandler = (id) => {
    setNotebookData(
      notebooksData.filter((Element) => {
        if (Element.id === id) {
          return false;
        }
        return true;
      })
    );
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
      <TitleCard currency={currency} incomeAmount={2500} expenseAmount={1500} />
      <View style={styles.midBar}>
        <Text style={styles.midBarText}>Your Notebooks</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <NoteBook
            symbol={currency}
            id={item.ID}
            title={item.NAME}
            income={item.INCOME}
            expense={item.EXPENSE}
            delete={deleteNotebookHandler}
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
