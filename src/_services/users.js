import api from "../api"; 

export const createUser = async (data) => {
  try {
    const response = await api.post("/users", data);
    return response.data;
  } catch (error) {
    // Optional: log atau kembalikan error detail
    throw error.response?.data || error;
  }
};
