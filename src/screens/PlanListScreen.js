import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import asyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";

import { getUserInfoApi } from "../../util/api/user";
import { getPlanList } from "../../util/api/planList";
import { userState } from "../states/userState";
import { planState } from "../states/planState";
import PlanList from "../components/List";
import axios from "../config/axiosConfig";
import Loading from "../components/Loading";
import MESSAGE from "../constants/message";
import SCREEN from "../constants/screen";

export default function PlanListScreen({ navigation }) {
  const setUser = useSetRecoilState(userState);
  const [plans, setPlans] = useRecoilState(planState);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const accessToken = await asyncStorage.getItem("accessToken");
        const userId = await asyncStorage.getItem("userId");

        if (!userId) return;

        if (userId) {
          const userInfo = await getUserInfoApi(userId);

          axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

          setUser({
            email: userInfo.email,
            name: userInfo.name,
            userId: userId,
          });
        }

        const planList = await getPlanList(userId);

        setPlans(planList.data);
      } catch (err) {
        alert(MESSAGE.ERROR);
      }
    };

    getPlans();
  }, []);

  const navigateDetailPage = (planId) => {
    navigation.navigate(SCREEN.PLAN_DETAIL_SCREEN, { planId: planId });
  };

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <View style={styles.container}>
          <Text style={styles.title}>My Plan List</Text>
        </View>
        <PlanList
          plans={plans}
          onClickPlan={navigateDetailPage}
          dotColor="#90b189"
        />
        <View style={styles.emptyContainer} />
      </React.Suspense>
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
