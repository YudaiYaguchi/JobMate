import axios from "axios";
import { API_URL } from "../config";

const apiAxios = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCompany = async () => {
  try {
    const res = await apiAxios.get("companies/index");
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createCompany = async (
  companyData: {
    name: string,
    selection_type: string,
    selection_status: string,
    selection_date: string,
    selection_result: string,
  }
) => {
  try {
    const res = await apiAxios.post("companies/create", companyData);
    return res.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export const updateCompany = async (
  companyData: {
    id: number;
    name: string;
    selection_type: string;
    selection_status: string;
    selection_date: string;
    selection_result: string;
  }
) => {
  try {
    const res = await apiAxios.put(`companies/${companyData.id}`, companyData);
    return res.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export const deleteCompany = async (companyId: number) => {
  try {
    const res = await apiAxios.delete(`companies/${companyId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};

export default apiAxios;
