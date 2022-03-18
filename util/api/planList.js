import axios from "../../src/config/axiosConfig";

export const getPlanList = async (userId) => {
  const response = await axios.get(`/users/${userId}/planlist`);

  return response.data;
};
