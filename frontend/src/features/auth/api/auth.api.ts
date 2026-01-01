import type { LoginFormData } from "@/schemas/login.schema";
import API from "@/lib/apiClient";
import type { ApiSuccessResponse, User } from "./auth.types";
import type { RegisterFormData } from "@/schemas/register.schema";

export const login = async (
  data: LoginFormData
): Promise<ApiSuccessResponse<{ user: User }>> => {
  const response = await API.post<ApiSuccessResponse<{ user: User }>>(
    "/auth/login",
    data
  );

  return response.data;
};

export const register = async (
  data: RegisterFormData
): Promise<ApiSuccessResponse<{ user: User }>> => {
  const response = await API.post<ApiSuccessResponse<{ user: User }>>(
    "/auth/register",
    data
  );

  return response.data;
};

export const getUser = async (): Promise<User> => {
  const response = await API.get<ApiSuccessResponse<{ user: User }>>("/user");

  if (!response.data.data) {
    throw new Error("User data missing from response");
  }

  return response.data.data.user;
};
