import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MakeAPlanScreen() {
  return (
    <View style={styles.container}>
      <Text>Make A Plan Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
