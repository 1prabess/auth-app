import API from "@/lib/apiClient";
import type { Users } from "./admin.types";
import type { ApiSuccessResponse, User } from "@/features/auth/api/auth.types";

export const getUsers = async (): Promise<Users> => {
  const response = await API.get<ApiSuccessResponse<{ users: User[] }>>(
    "/user/users"
  );

  if (!response.data.data) {
    throw new Error("Users data missing from response");
  }

  return response.data.data.users;
};
