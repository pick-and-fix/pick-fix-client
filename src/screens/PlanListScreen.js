import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StyleSheet, Text, View } from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";

import { getPlanList } from "../../util/api/planList";
import { userState } from "../states/userState";
import { planState } from "../states/planState";
import PlanList from "../components/List";

export default function PlanListScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const [plans, setPlans] = useRecoilState(planState);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const planList = await getPlanList(user.userId);

        setPlans(planList.data);
      } catch (err) {
        alert("error");
        asyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
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
      <PlanList
        plans={plans}
        onClickPlan={navigateDetailPage}
        dotColor="#90b189"
      />
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
    color: "#0a80ae",
    fontSize: 45,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

PlanListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func,
  }).isRequired,
};
