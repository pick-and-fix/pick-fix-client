import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

export default function PlanDetailScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>Plan Detail Screen</Text>
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

PlanDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      planId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
