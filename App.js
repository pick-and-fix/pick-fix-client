import React from "react";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./src/navigation/DrawerNavigator";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}
