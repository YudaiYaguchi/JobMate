import axios from 'axios';
import { API_URL } from '../config';
import { User } from '../types/User';
import { saveAuthUser, removeAuthUser } from '../utils/auth';

// APIクライアントの設定
const authApi = axios.create({
  baseURL: `${API_URL}/api/v1/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

// ログインAPI
export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await authApi.post('/login', credentials);
    const user = response.data;
    // ログイン成功時にユーザー情報を保存
    saveAuthUser(user);
    return user;
  } catch (error) {
    console.error('ログインエラー:', error);
    throw error;
  }
};

// 新規登録API
export const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await authApi.post('/register', credentials);
    const user = response.data;
    // 登録成功時にユーザー情報を保存
    saveAuthUser(user);
    return user;
  } catch (error) {
    console.error('登録エラー:', error);
    throw error;
  }
};

// ログアウトAPI
export const logout = async () => {
  try {
    await authApi.post('/logout');
    // ローカルストレージからユーザー情報を削除
    removeAuthUser();
  } catch (error) {
    console.error('ログアウトエラー:', error);
    throw error;
  }
};

// 認証済みリクエスト用のインターセプター
authApi.interceptors.request.use((config) => {
  const user = localStorage.getItem('authUser');
  if (user) {
    const { token } = JSON.parse(user);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}); 