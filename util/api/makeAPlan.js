import axios from "../../src/config/axiosConfig";

export const checkEmailApi = async (email) => {
  const response = await axios.post("/users/email", {
    email,
  });

  return response.data;
};

export const makeAPlanApi = async ({ userId, newPlan }) => {
  const response = await axios.post(`/users/${userId}/plan`, {
    newPlan,
  });

  return response.data;
};
