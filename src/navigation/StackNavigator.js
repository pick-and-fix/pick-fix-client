import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import asyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";
import PlanListScreen from "../screens/PlanListScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import MyPickScreen from "../screens/MyPickScreen";
import NewMyPickScreen from "../screens/NewMyPickScreen";
import VoteListScreen from "../screens/VoteListScreen";

const Main = createStackNavigator();

export const MainStack = () => {
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
    <Main.Navigator initialRouteName={user ? "PlanList" : "Login"}>
      <Main.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Main.Screen
        name="PlanList"
        component={PlanListScreen}
        options={{ headerShown: false }}
      />
      <Main.Screen name="PlanDetail" component={PlanDetailScreen} />
    </Main.Navigator>
  );
};

const MyPick = createStackNavigator();

export const MyPickStack = () => {
  return (
    <MyPick.Navigator initialRouteName="MyPicks">
      <MyPick.Screen
        name="MyPicks"
        component={MyPickScreen}
        options={{ title: "My Pick" }}
      />
      <MyPick.Screen
        name="NewMyPick"
        component={NewMyPickScreen}
        options={{ title: "New My Pick" }}
      />
    </MyPick.Navigator>
  );
};

const Vote = createStackNavigator();

export const VoteStack = () => {
  return (
    <Vote.Navigator initialRouteName="VoteList">
      <Vote.Screen
        name="VoteList"
        component={VoteListScreen}
        options={{ title: "Vote List" }}
      />
    </Vote.Navigator>
  );
};
