import axios from "axios";
import { API_URL } from "../config";
import { InputLoginUser, InputRegisterUser, User } from "../types/User";

const apiAxios = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserData = async () => {
  try {
    const res = await apiAxios.get("users/index");
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createUser = async (data: InputRegisterUser) => {
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
    const res = await apiAxios.get("users/get_current_user_info");
    const user: User = res.data;
    console.log("ユーザー情報:", user);
    return user;
  } catch (error) {
    console.error("ユーザー情報の取得に失敗しました:", error);
    return null;
  }
};

export const loginUser = async (data: InputLoginUser) => {
  try {
    const res = await apiAxios.post("users/login", { user: data });
    const token = res.data.token;
    localStorage.setItem("token", token);
    return res.data;
  } catch (error: any) {
    console.error("ログインに失敗しました:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("ログインに失敗しました");
  }
}

export default apiAxios;
