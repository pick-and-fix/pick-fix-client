import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";

const List = ({ plans, onClickPlan, dotColor }) => {
  return (
    <View style={styles.planContainer}>
      {Object.entries(plans).map(([id, plan]) => {
        const date = new Date(plan.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const time = date.toLocaleTimeString().substring(0, 5);

        return (
          <TouchableOpacity
            key={id}
            style={styles.inlineContainer}
            onPress={() => onClickPlan(id)}
          >
            <View style={styles.dot(dotColor)} />
            <View style={styles.textContainer}>
              <Text>{plan.place}</Text>
              <Text>{`${year}년 ${month}월 ${day}일 ${time} `}</Text>
              <View style={styles.friendContainer}>
                <Text>with. </Text>
                {plan.friends.map((friend) => (
                  <Text key={friend._id} style={styles.friend}>
                    {friend.name}
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  planContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inlineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomColor: "#898989",
    borderBottomWidth: 1,
  },
  dot: (dotColor) => ({
    width: 10,
    height: 10,
    marginTop: 30,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: dotColor,
  }),
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  friendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  friend: {
    marginRight: 3,
  },
});

List.propTypes = {
  plans: PropTypes.object.isRequired,
  onClickPlan: PropTypes.func.isRequired,
  dotColor: PropTypes.string,
};

export default List;
