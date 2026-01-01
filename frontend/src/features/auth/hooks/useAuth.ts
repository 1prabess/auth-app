import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/auth.api";
import type { ApiErrorResponse, User } from "../api/auth.types";
import type { AxiosError } from "axios";

export const useAuth = () => {
  return useQuery<User, AxiosError<ApiErrorResponse>>({
    queryKey: ["auth"],
    queryFn: getUser,
  });
};
