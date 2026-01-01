import type { ApiErrorResponse } from "@/features/auth/api/auth.types";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import queryClient from "./queryClient";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const API: AxiosInstance = axios.create(options);
const TokenRefreshClient: AxiosInstance = axios.create(options);

let isRefreshing: boolean = false;

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig;

    if (
      error.response?.status === 401 &&
      error.response.data.errorCode === "InvalidAccessToken" &&
      originalRequest._retry !== true
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return API(originalRequest);
      }

      try {
        await TokenRefreshClient.get("/auth/refresh");
        isRefreshing = false;

        return API(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        queryClient.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
