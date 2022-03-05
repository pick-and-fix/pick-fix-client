import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import { getPlanList } from "../../util/api/planList";
import { userState } from "../states/userState";
import { planState } from "../states/planState";

export default function PlanListScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const [plans, setPlans] = useRecoilState(planState);

  useEffect(() => {
    const getPlans = async () => {
      const planList = await getPlanList(user.userId);

      setPlans(planList);
    };
    getPlans();
  }, []);

  const navigateDetailPage = (planId) => {
    navigation.navigate("PlanDetail", { planId: planId });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>My Plan List</Text>
      </View>
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
              onPress={() => navigateDetailPage(id)}
            >
              <View style={styles.circle} />
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
      <View style={styles.emptyContainer} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
  },
  title: {
    color: "#0A80AE",
    fontSize: 45,
  },
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
  circle: {
    width: 10,
    height: 10,
    marginTop: 30,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#90B189",
  },
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
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

PlanListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
