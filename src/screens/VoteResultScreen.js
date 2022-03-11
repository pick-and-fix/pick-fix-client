import React from "react";
import { StyleSheet, View, Text } from "react-native";

function VoteResultScreen() {
  return (
    <View style={styles.container}>
      <Text>Vote result screen</Text>
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

export default VoteResultScreen;
