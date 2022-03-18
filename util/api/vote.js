import axios from "../../src/config/axiosConfig";

export const getVoteListApi = async (userId) => {
  const response = await axios.get(`/users/${userId}/plan/votelist`);

  return response.data;
};

export const getPicksApi = async ({ userId, planId }) => {
  const response = await axios.get(`/users/${userId}/plan/${planId}/vote`);

  return response.data;
};

export const postVotePickApi = async ({ userId, planId, vote }) => {
  const response = await axios.post(
    `/users/${userId}/plan/${planId}/vote/new`,
    {
      vote,
    }
  );

  return response.data;
};

export const getVoteResultApi = async ({ userId, planId }) => {
  const response = await axios.get(
    `/users/${userId}/plan/${planId}/vote/result`
  );

  return response.data;
};

export const saveFinalPickApi = async ({ userId, planId, finalPicks }) => {
  const response = await axios.post(
    `/users/${userId}/plan/${planId}/vote/fix`,
    {
      finalPicks,
    }
  );

  return response.data;
};
