import axios from "axios";
import { API_URL } from "../config";
import { InputUser, User } from "../types/User";

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

export const createUser = async (data: InputUser) => {
  try {
    const res = await apiAxios.post("users/create", { user: data });
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("ユーザー登録に失敗しました");
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await apiAxios.get("users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user: User = res.data
    console.log("ユーザー情報:", user);
    return user;
  } catch (error) {
    console.error("ユーザー情報の取得に失敗しました:", error);
    return null;
  }
};

export default apiAxios;
