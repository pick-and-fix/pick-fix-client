import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { StyleSheet, Button, View } from "react-native";
import PropTypes from "prop-types";

import getEnvVars from "../../environment";
import { getLogin, getUserInfo } from "../../util/api/user";
import { firebaseConfig } from "../config/firebaseConfig";
import { userState } from "../states/userState";

const { REACT_NATIVE_ANDROID_CLIENT_ID } = getEnvVars();

initializeApp(firebaseConfig);

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [firebaseToken, setFirebaseToken] = useState("");
  const setUserState = useSetRecoilState(userState);

  const checkAccessToken = async () => {
    try {
      const userId = await asyncStorage.getItem("userId");

      if (!userId) return;

      if (userId) {
        const userInfo = await getUserInfo(userId);

        setUserState({
          email: userInfo.email,
          name: userInfo.name,
          userId: userId,
        });
        navigation.navigate("PlanList");
      }
    } catch (err) {
      alert("error");
      asyncStorage.clear();
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: REACT_NATIVE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      setFirebaseToken(id_token);
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const getLoginApi = async () => {
      const userInfo = await getLogin(firebaseToken);

      await asyncStorage.setItem("accessToken", userInfo.accessToken);
      await asyncStorage.setItem("userId", userInfo.userId);

      axios.defaults.headers.Authorization = `Bearer ${userInfo.accessToken}`;

      setUserState({
        email: userInfo.email,
        name: userInfo.name,
        userId: userInfo.userId,
      });

      navigation.navigate("PlanList");
    };

    getLoginApi();
  }, [firebaseToken]);

  return (
    <View style={styles.container}>
      <Button
        style={styles.loginButton}
        disabled={!request}
        title="Google Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    width: 120,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
