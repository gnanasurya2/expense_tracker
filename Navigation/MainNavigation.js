import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/colors";
import HomeScreen from "../Screens/HomeScreen";
import Currency from "../Screens/CurrencySelectionScreen";
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: Colors.card,
        inactiveBackgroundColor: Colors.card,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={Currency} />
    </Tab.Navigator>
  );
}
export default MyTabs;
