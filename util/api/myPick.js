import axios from "../../src/config/axiosConfig";

export const getMyPicks = async (userId) => {
  const response = await axios.get(`/users/${userId}/mypick`);

  return response.data;
};
