import axios from "axios";
import { API_URL } from "../config";

// axiosインスタンスを作成
const apiAxios = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ユーザー情報を取得する関数
export const getUserData = async () => {
  try {
    const response = await apiAxios.get("user/index");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default apiAxios;
