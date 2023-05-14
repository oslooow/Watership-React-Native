import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./Homepage";
import Details from "./Details";
import Error from "./Error";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <SimpleLineIcons name="home" size={24} />,
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarLabel: "Details",
          tabBarIcon: () => <SimpleLineIcons name="list" size={24} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={Error}
        options={{
          tabBarLabel: "User",
          tabBarIcon: () => <SimpleLineIcons name="user" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
