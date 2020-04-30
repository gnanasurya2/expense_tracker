import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NoteBookScreen from "../Screens/NoteBookScreen";
import TransactionScreen from "../Screens/CreateTranscationScreen";

const Stack = createStackNavigator();

const NoteBookNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Notebook" component={NoteBookScreen} />
      <Stack.Screen name="transaction" component={TransactionScreen} />
    </Stack.Navigator>
  );
};

export default NoteBookNavigator;
