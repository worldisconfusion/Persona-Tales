import axios from "axios";
import { BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const apiConnector = async ({
  method,
  url,
  bodyData = null,
  headers = {},
  params = {},
}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    });
    return response;
  } catch (error) {
    const errResponse = error.response || { data: { message: error.message } };
    throw errResponse;
  }
};

export default axiosInstance;

