import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MemoryListScreen() {
  return (
    <View style={styles.container}>
      <Text>Memory List Screen</Text>
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
