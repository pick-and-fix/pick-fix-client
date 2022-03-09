import axios from "../../src/config/axiosConfig";

export const getMyPicks = async (userId) => {
  const response = await axios.get(`/users/${userId}/mypick`);

  return response.data;
};

export const saveNewPick = async ({ userId, newPick }) => {
  const response = await axios.post(`users/${userId}/mypick/new`, {
    newPick,
  });

  return response.data;
};
