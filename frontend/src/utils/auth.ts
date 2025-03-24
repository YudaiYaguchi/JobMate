import { User } from '../types/User';

// ローカルストレージのキー
const AUTH_USER_KEY = 'authUser';

// ユーザー情報の保存
export const saveAuthUser = (user: User) => {
  user.name = "YudaiYaguchi";
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

// ユーザー情報の取得
export const getAuthUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// ユーザー情報の削除（ログアウト時）
export const removeAuthUser = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

// 認証状態の確認
export const isAuthenticated = (): boolean => {
  return getAuthUser() !== null;
}; 