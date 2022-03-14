import React, { useEffect, useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import { useSetRecoilState } from "recoil";
import asyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import PropTypes from "prop-types";

import getEnvVars from "../../environment";
import { getLoginApi } from "../../util/api/user";
import { firebaseConfig } from "../config/firebaseConfig";
import { userState } from "../states/userState";
import axios from "../config/axiosConfig";

const { REACT_NATIVE_ANDROID_CLIENT_ID } = getEnvVars();

initializeApp(firebaseConfig);

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [firebaseToken, setFirebaseToken] = useState("");
  const setUser = useSetRecoilState(userState);

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
    const getLogin = async () => {
      const userInfo = await getLoginApi(firebaseToken);

      await asyncStorage.setItem("accessToken", userInfo.accessToken);
      await asyncStorage.setItem("userId", userInfo.userId);

      axios.defaults.headers.Authorization = `Bearer ${userInfo.accessToken}`;

      setUser({
        email: userInfo.email,
        name: userInfo.name,
        userId: userInfo.userId,
      });

      navigation.navigate("PlanList");
    };

    getLogin();
  }, [firebaseToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
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
    backgroundColor: "#d3edf7",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 60,
    color: "#0a80ae",
    marginBottom: "40%",
  },
  loginButton: {
    width: 80,
    padding: 5,
    justifyContent: "center",
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
