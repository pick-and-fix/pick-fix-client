import axios from "../../src/config/axiosConfig";

export const getVoteListApi = async (userId) => {
  const response = await axios.get(`/users/${userId}/plan/votelist`);

  return response.data;
};
