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
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export default apiAxios;
