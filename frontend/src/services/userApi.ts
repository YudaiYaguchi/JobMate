import axios from "axios";
import { API_URL } from "../config";

const apiAxios = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserData = async () => {
  try {
    const res = await apiAxios.get("users/index");
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default apiAxios;
