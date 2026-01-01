import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  ApiErrorResponse,
  ResetPasswordFormData,
} from "../api/auth.types";
import { resetPassword } from "../api/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation<
    string,
    AxiosError<ApiErrorResponse>,
    ResetPasswordFormData
  >({
    mutationFn: (data: ResetPasswordFormData) => resetPassword(data),
    onSuccess: (data) => {
      toast.success(data);
      navigate("/login");
    },
    onError: (error) => {
      console.log(error.response?.data.message);
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again later.."
      );
    },
  });
};
