import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MakeAPlanScreen from "../screens/MakeAPlanScreen/MakeAPlanScreen";
import LogoutScreen from "../screens/LogoutScreen";
import { MainStack, MyPickStack, VoteStack } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "PICK & FIX",
        headerTitleAlign: "center",
        headerTintColor: "#0a80ae",
        headerStyle: {
          backgroundColor: "#d3edf7",
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={MainStack}
        options={{ drawerLabel: "My Plan List" }}
      />
      <Drawer.Screen
        name="MyPick"
        component={MyPickStack}
        options={{ drawerLabel: "My Pick" }}
      />
      <Drawer.Screen
        name="MakeAPlan"
        component={MakeAPlanScreen}
        options={{ drawerLabel: "Make a Plan" }}
      />
      <Drawer.Screen
        name="PickVote"
        component={VoteStack}
        options={{ drawerLabel: "Vote List" }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ drawerLabel: "Logout" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
