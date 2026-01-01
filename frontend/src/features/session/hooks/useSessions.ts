import type { ApiErrorResponse } from "@/features/auth/api/auth.types";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getSessions } from "../api/session.api";
import type { Session } from "../api/session.types";

export const useSessions = () => {
  return useQuery<Session[], AxiosError<ApiErrorResponse>>({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });
};
