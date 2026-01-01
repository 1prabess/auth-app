import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "../api/auth.api";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../api/auth.types";

export const useVerifyEmail = (code?: string) => {
  return useQuery<string, AxiosError<ApiErrorResponse>>({
    queryKey: ["verify-email", code],
    queryFn: () => verifyEmail(code!),
    enabled: !!code,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
