import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Text>Logout Screen</Text>
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
