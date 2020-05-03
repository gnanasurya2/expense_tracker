import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import mainNavigator from "./MainNavigation";
import NotebookNavigator from "./NotebookNavigation";

const Stack = createStackNavigator();

const RootNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="main" component={mainNavigator} />
        <Stack.Screen name="notebook" component={NotebookNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
