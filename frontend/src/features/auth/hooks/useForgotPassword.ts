import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../api/auth.types";
import { forgotPassword } from "../api/auth.api";
import { toast } from "sonner";

export const useForgotPassword = () => {
  return useMutation<string, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      console.log(error.response?.data.message);
      toast.error("Something went wrong. Please try again later..");
    },
  });
};
