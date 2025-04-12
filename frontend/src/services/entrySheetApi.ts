import axios from "axios";
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

export const getEntrySheets = async () => {
  try {
    const res = await apiAxios.get("entry_sheets/index");
    return res.data;
  } catch (error) {
    console.error("Error fetching entry sheets data:", error);
    throw error;
  }
};

export const getEntrySheetById = async (id: string | number) => {
  try {
    const res = await apiAxios.get(`entry_sheets/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching entry sheet data for ID ${id}:`, error);
    throw error;
  }
};

export const createEntrySheet = async (
  entrySheetData: {
    question: string,
    answer: string,
    max_length: number,
    company_id: number,
  }
) => {
  try {
    const res = await apiAxios.post("entry_sheets/create", entrySheetData);
    return res.data;
  } catch (error) {
    console.error("Error creating entry sheet:", error);
    throw error;
  }
};

export const updateEntrySheet = async (
  entrySheetData: {
    id: number;
    question: string;
    answer: string;
    max_length: number;
    company_id: number;
  }
) => {
  try {
    const res = await apiAxios.put(`entry_sheets/${entrySheetData.id}`, entrySheetData);
    return res.data;
  } catch (error) {
    console.error("Error updating entry sheet:", error);
    throw error;
  }
};

export const deleteEntrySheet = async (entrySheetId: number) => {
  try {
    const res = await apiAxios.delete(`entry_sheets/${entrySheetId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting entry sheet:", error);
    throw error;
  }
};

export default apiAxios; 