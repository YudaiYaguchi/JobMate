import { User } from '../types/User';

// ローカルストレージのキー
const AUTH_USER_KEY = 'authUser';
const AUTH_TOKEN_KEY = 'token';

// トークンの保存
export const saveToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

// トークンの取得
export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// トークンの削除
export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// ユーザー情報の保存
export const saveAuthUser = (user: User, token: string) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  saveToken(token);
};

// ユーザー情報の取得
export const getAuthUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// ユーザー情報の削除（ログアウト時）
export const removeAuthUser = () => {
  localStorage.removeItem(AUTH_USER_KEY);
  removeToken();
};

// 認証状態の確認
export const isAuthenticated = (): boolean => {
  return getToken() !== null && getAuthUser() !== null;
};