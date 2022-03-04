import axios from "axios";

import getEnvVars from "../../environment";

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

const instance = axios.create({
  baseURL: REACT_NATIVE_ANDROID_SERVER_URL,
  withCredentials: true,
});

export default instance;
