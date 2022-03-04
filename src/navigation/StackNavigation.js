import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import PlanListScreen from "../screens/PlanListScreen";
import asyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react/cjs/react.development";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const [user, setUser] = useState("");

  const checkUser = async () => {
    const userId = await asyncStorage.getItem("userId");
    setUser(userId);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="PlanList" component={PlanListScreen} />
      )}
    </Stack.Navigator>
  );
};
