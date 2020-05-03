import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import TopBar from "../Components/UI/TopBar";
import Colors from "../constants/colors";
import colors from "../constants/colors";
import Option from "../Components/UI/Option";
import Button from "../Components/UI/Button";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import * as action from "../store/actions/transaction";
import * as noteBookActions from "../store/actions/Notebook";

const height = Dimensions.get("window").height;

const CreateTransactionScreen = (props) => {
  const [categoryStatus, setCategoryStatus] = useState([false, true]);
  const [inputStyles, setInputStyles] = useState(styles.inputMoney);
  const [money, setMoney] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([
    { id: 0, type: "Health", active: false },
    { id: 1, type: "Food", active: false },
    { id: 2, type: "Clothing", active: false },
    { id: 3, type: "Fuel", active: false },
    { id: 6, type: "Other", active: true },
    { id: 4, type: "Transport", active: false },
    { id: 5, type: "Restaurant", active: false },
    { id: 7, type: "Education", active: false },
    { id: 8, type: "Salary", active: false },
    { id: 9, type: "Loan", active: false },
  ]);
  const dispatch = useDispatch();
  const categoryClickHandler = (index) => {
    if (!categoryStatus[index]) {
      let category = index ? [false, true] : [true, false];
      setCategoryStatus(category);
      if (categoryStatus[0]) {
        setInputStyles(styles.inputMoney);
      } else {
        setInputStyles({ ...styles.inputMoney, color: Colors.red });
      }
    }
  };

  const categoryChangeHandler = (index) => {
    let category = categories.map((Element) =>
      Element.id === index
        ? { ...Element, active: true }
        : { ...Element, active: false }
    );
    setCategories(category);
  };

  const cofirmTransactionHandler = () => {
    const transactionType = categoryStatus[1] ? "income" : "expense";
    const category = categories.filter((Element) => Element.active)[0].type;
    // dispatch(action.newTransactionHandler(true));
    const date = new Date();
    const currentDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    dispatch(
      action.createTransactionsHandler(
        props.route.params.notebookName,
        title,
        +money,
        category,
        transactionType,
        currentDate
      )
    );
    dispatch(
      noteBookActions.fetchNotebookHandler(
        props.route.params.notebookName,
        +money,
        transactionType,
        "update"
      )
    );
    setTitle("");
    setMoney("");
    props.navigation.navigate("Notebook");
  };
  return (
    <View style={styles.wrapper}>
      <TopBar />
      <TextInput
        style={styles.input}
        placeholder="Enter the title"
        placeholderTextColor={Colors.text}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <View style={styles.moneyContainer}>
        <TextInput
          style={inputStyles}
          placeholderTextColor={colors.text}
          value={money}
          onChangeText={(text) => setMoney(text)}
          placeholder="Enter the Amount"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.transactionCategory}>
        <Option
          type="Expense"
          active={categoryStatus[0]}
          clicked={() => categoryClickHandler(0)}
        />
        <Option
          type="Income"
          active={categoryStatus[1]}
          clicked={() => categoryClickHandler(1)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.categoryWrapper}>
        <Text style={styles.categoryTitle}>Choose a category</Text>
        <ScrollView contentContainerStyle={styles.categories}>
          {categories.map((Element) => (
            <Option
              key={Element.id}
              type={Element.type}
              active={Element.active}
              clicked={() => categoryChangeHandler(Element.id)}
            />
          ))}
        </ScrollView>
      </ScrollView>
      <Button title="Confirm" clicked={cofirmTransactionHandler} />
    </View>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  input: {
    width: "85%",
    fontSize: 25,
    borderBottomWidth: 2,
    padding: 15,
    borderBottomColor: Colors.text,
    color: Colors.text,
    marginVertical: 20,
  },
  moneyContainer: {
    width: "100%",
    flex: 1,
    minHeight: 100,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.text,
    borderBottomColor: Colors.text,
    marginTop: 30,
  },
  green: {
    fontSize: 35,
    color: Colors.green,
  },
  inputMoney: {
    width: "70%",
    fontSize: 25,
    padding: 15,
    color: Colors.green,
    marginVertical: 20,
    textAlign: "center",
  },
  transactionCategory: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  categoryWrapper: {
    borderTopColor: Colors.text,
    borderTopWidth: 1,
    width: "100%",
    maxHeight: 300,
    justifyContent: "space-between",
  },
  categoryTitle: {
    fontSize: 24,
    color: Colors.text,
    paddingTop: 10,
    paddingLeft: 20,
  },
  categories: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: 400,
    // height: 250,
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
});

export default CreateTransactionScreen;
