import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainStack, MyPickStack, VoteStack } from "./StackNavigator";
import MakeAPlanScreen from "../screens/MakeAPlanScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "PICK & FIX",
        headerTitleAlign: "center",
        headerTintColor: "#0A80AE",
        headerStyle: {
          backgroundColor: "#D3EDF7",
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
