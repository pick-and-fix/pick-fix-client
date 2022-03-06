import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function VoteListScreen() {
  return (
    <View style={styles.container}>
      <Text>Vote List Screen</Text>
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
