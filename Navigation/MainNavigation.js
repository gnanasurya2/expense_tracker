import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/colors";
import HomeScreen from "../Screens/HomeScreen";
import Currency from "../Screens/CurrencySelectionScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else {
            iconName = "settings";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: Colors.card,
        inactiveBackgroundColor: Colors.card,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={Currency} />
    </Tab.Navigator>
  );
}
export default MyTabs;
