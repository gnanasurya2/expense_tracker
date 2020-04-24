import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
} from "react-native";

import currencySymbol from "../constants/currency-symbols.json";
import Colors from "../constants/colors";
import Currency from "../Components/Currency";

const CurrencySelectionScreen = (props) => {
  const [currencyName, setCurrencyName] = useState("");
  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter the currency name"
        value={currencyName}
        onChangeText={(text) => setCurrencyName(text)}
      />
      <View style={styles.buttonWrapper}>
        <Text style={styles.titleText}>&#82;&#112;</Text>
      </View>
      <FlatList
        data={currencySymbol}
        keyExtractor={(Item) => Item.abbreviation}
        renderItem={(Item) => (
          <Currency symbol={Item.item.abbreviation} name={Item.item.currency} />
        )}
      />
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
    backgroundColor: Colors.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  textInput: {
    width: "80%",
    backgroundColor: Colors.card,
    paddingVertical: 12,
    color: Colors.text,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 8,
  },
});

export default CurrencySelectionScreen;
