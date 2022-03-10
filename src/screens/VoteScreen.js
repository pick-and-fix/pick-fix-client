import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function VoteScreen() {
  return (
    <View style={styles.container}>
      <Text>Vote Screen</Text>
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
