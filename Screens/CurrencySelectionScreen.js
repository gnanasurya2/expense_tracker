import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import currencySymbols from "../constants/currency-symbols.json";
import Colors from "../constants/colors";
import Currency from "../Components/Currency";
import Button from "../Components/UI/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as actions from "../store/actions/user";

const CurrencySelectionScreen = (props) => {
  const dispatch = useDispatch();
  const [currencyName, setCurrencyName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [userName, setUserName] = useState("");
  const [currencyData, setCurrencyData] = useState(currencySymbols);
  const filterCurrencyHandler = (text) => {
    setCurrencyName(text);
    let data = currencySymbols.filter((ele) => {
      return ele.currency.includes(text);
    });
    setCurrencyData(data);
  };

  const signUpHandler = () => {
    dispatch(actions.userDetialsHandler(userName, currencySymbol));
    setCurrencyName("");
    setUserName("");
    props.navigation.navigate("Home");
  };

  const currencySymbolHandler = (symbol, name) => {
    setCurrencyName(name);
    setCurrencySymbol(symbol);
  };
  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      <Image source={require("../assets/icon.png")} style={styles.logo} />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <View style={styles.listView}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={35}
            style={styles.magnify}
            color="white"
          />
          <TextInput
            style={styles.inputCurrency}
            placeholder="Enter the currency name"
            value={currencyName}
            onChangeText={(text) => filterCurrencyHandler(text)}
          />
        </View>
        <FlatList
          data={currencyData}
          keyExtractor={(Item) => Item.abbreviation}
          style={styles.list}
          renderItem={(Item) => (
            <Currency
              symbol={Item.item.abbreviation}
              name={Item.item.currency}
              clicked={currencySymbolHandler}
            />
          )}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Continue" clicked={signUpHandler} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  titleText: {
    color: Colors.text,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
  },
  textInput: {
    width: "80%",
    backgroundColor: Colors.card,
    paddingVertical: 12,
    color: Colors.text,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 8,
    marginBottom: 40,
    textAlign: "center",
  },
  listView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    height: Dimensions.get("window").height / 5,
    flexGrow: 0,
    alignSelf: "center",
  },
  inputCurrency: {
    width: "80%",
    backgroundColor: Colors.card,
    paddingVertical: 12,
    color: Colors.text,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  magnify: {
    backgroundColor: Colors.card,
    height: "100%",
    paddingTop: 7,
    borderBottomWidth: 1,
    borderColor: "white",
    paddingHorizontal: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
});

export default CurrencySelectionScreen;
