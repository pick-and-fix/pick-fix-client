import React from "react";
// import { useRecoilValue } from "recoil";
import { StyleSheet, Text, View } from "react-native";

// import { userState } from "../states/userState";

export default function PlanListScreen() {
  // const user = useRecoilValue(userState);

  return (
    <>
      <View style={styles.container}>
        <Text>Main Screen</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
