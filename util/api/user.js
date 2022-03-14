import axios from "../../src/config/axiosConfig";

export const getLoginApi = async (token) => {
  const response = await axios.post("/login", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const getUserInfoApi = async (userId) => {
  const response = await axios.get(`/user/${userId}`);

  return response.data.data;
};
