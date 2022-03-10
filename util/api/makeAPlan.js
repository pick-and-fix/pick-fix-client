import axios from "../../src/config/axiosConfig";

export const checkEmail = async (email) => {
  const response = await axios.post("/users/email", {
    email,
  });

  return response.data;
};
