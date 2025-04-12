import axios from 'axios';
import { Question } from '../types/Question';
import { API_URL } from "../config";

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

// 全ての質問を取得
export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await apiAxios.get<Question[]>('questions/index');
    return response.data;
  } catch (error) {
    console.error('質問の取得に失敗しました:', error);
    throw error;
  }
};

// IDによる質問の取得
export const getQuestionById = async (id: number | string): Promise<Question> => {
  try {
    const response = await apiAxios.get<Question>(`questions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${id} の質問の取得に失敗しました:`, error);
    throw error;
  }
};

// 新しい質問の作成
export const createQuestion = async (questionData: Omit<Question, 'id' | 'created_at' | 'updated_at'>): Promise<Question> => {
  try {
    console.log(questionData);
    const response = await apiAxios.post('questions/create', questionData);
    return response.data;
  } catch (error) {
    console.error('質問の作成に失敗しました:', error);
    throw error;
  }
};

// 質問の更新
export const updateQuestion = async (id: number, questionData: Partial<Omit<Question, 'id' | 'created_at' | 'updated_at'>>): Promise<Question> => {
  try {
    const response = await apiAxios.put<Question>(`questions/${id}`, questionData);
    return response.data;
  } catch (error) {
    console.error(`ID ${id} の質問の更新に失敗しました:`, error);
    throw error;
  }
};

// 質問の削除
export const deleteQuestion = async (id: number): Promise<void> => {
  try {
    await apiAxios.delete(`questions/${id}`);
  } catch (error) {
    console.error(`ID ${id} の質問の削除に失敗しました:`, error);
    throw error;
  }
};
