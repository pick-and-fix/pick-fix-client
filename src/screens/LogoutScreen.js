import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useResetRecoilState } from "recoil";
import asyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/routers";
import axios from "../config/axiosConfig";
import PropTypes from "prop-types";

import StyledButton from "../components/Button";
import { pickState } from "../states/pickState";
import { planState } from "../states/planState";
import { userState } from "../states/userState";
import { voteState } from "../states/voteState";
import MESSAGE from "../constants/message";
import SCREEN from "../constants/screen";

function LogoutScreen({ navigation }) {
  const resetPickState = useResetRecoilState(pickState);
  const resetPlanState = useResetRecoilState(planState);
  const resetUserState = useResetRecoilState(userState);
  const restVoteState = useResetRecoilState(voteState);

  const handleLogoutButtonClick = () => {
    Alert.alert(MESSAGE.LOGOUT_ALERT_TITLE, MESSAGE.LOGOUT_ALERT, [
      {
        text: MESSAGE.ALERT_CHOICE_YES,
        onPress: async () => {
          await asyncStorage.removeItem("accessToken");
          await asyncStorage.removeItem("userId");

          axios.defaults.headers.Authorization = undefined;

          resetPickState();
          resetPlanState();
          resetUserState();
          restVoteState();

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: SCREEN.MAIN_STACK_SCREEN,
                },
              ],
            })
          );
        },
      },
      {
        text: MESSAGE.ALERT_CHOICE_NO,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoutTitle}>Logout</Text>
      <StyledButton
        width={40}
        height={5}
        title="Logout 👋🏻"
        size={20}
        onPress={handleLogoutButtonClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3edf7",
  },
  logoutTitle: {
    marginBottom: "45%",
    fontSize: 60,
    color: "#0a80ae",
  },
});

LogoutScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
};

export default LogoutScreen;
