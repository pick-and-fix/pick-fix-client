import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import asyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";
import PlanListScreen from "../screens/PlanListScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [user, setUser] = useState("");

  const checkUser = async () => {
    const userId = await asyncStorage.getItem("userId");

    if (userId) {
      setUser(userId);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={user ? "PlanList" : "Login"}
      screenOptions={{
        headerTitle: "PICK & FIX",
        headerTitleAlign: "center",
        headerTintColor: "#0A80AE",
        headerStyle: {
          backgroundColor: "#D3EDF7",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PlanList" component={PlanListScreen} />
      <Stack.Screen name="PlanDetail" component={PlanDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
