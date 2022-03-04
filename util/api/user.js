import axios from "../../src/config/axiosConfig";

export const getLogin = async (token) => {
  const response = await axios.post("/login", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const getUserInfo = async (userId) => {
  const response = await axios.get(`/user/${userId}`);

  return response.data.data;
};
