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

function LogoutScreen({ navigation }) {
  const resetPickState = useResetRecoilState(pickState);
  const resetPlanState = useResetRecoilState(planState);
  const resetUserState = useResetRecoilState(userState);
  const restVoteState = useResetRecoilState(voteState);

  const handleLogoutButtonClick = () => {
    Alert.alert("LOGOUT", "로그아웃하시겠습니까?", [
      {
        text: "YES",
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
                  name: "Main",
                },
              ],
            })
          );
        },
      },
      {
        text: "NO",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: "45%", fontSize: 60, color: "#0a80ae" }}>
        Logout
      </Text>
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
});

LogoutScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
};

export default LogoutScreen;
