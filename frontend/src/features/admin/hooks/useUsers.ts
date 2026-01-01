import { useQuery } from "@tanstack/react-query";
import type { Users } from "../api/admin.types";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/features/auth/api/auth.types";
import { getUsers } from "../api/admin.api";

export const useUsers = () => {
  return useQuery<Users, AxiosError<ApiErrorResponse>>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
