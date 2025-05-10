import axios from "axios";
import { API_URL } from "@/config";
import { InputTodo, Todo } from "@/types/Todo";

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

// Todo 一覧取得
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const res = await apiAxios.get("todos/index");
    return res.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// ID指定で Todo を取得
export const getTodoById = async (todoId: number): Promise<Todo> => {
  try {
    const res = await apiAxios.get(`todos/${todoId}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching todo with ID ${todoId}:`, error);
    throw error;
  }
};

// Todo 作成
export const createTodo = async (todo: InputTodo): Promise<Todo> => {
  try {
    const res = await apiAxios.post("todos/create", todo);
    return res.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Todo 更新
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const res = await apiAxios.put(`todos/${todo.id}`, todo);
    return res.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Todo 削除
export const deleteTodo = async (todoId: number): Promise<void> => {
  try {
    await apiAxios.delete(`todos/${todoId}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export default apiAxios;
