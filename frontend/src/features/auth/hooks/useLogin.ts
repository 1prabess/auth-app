import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import type { AxiosError } from "axios";
import type { LoginFormData } from "@/schemas/login.schema";
import { toast } from "sonner";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  User,
} from "../api/auth.types";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<
    ApiSuccessResponse<{ user: User }>,
    AxiosError<ApiErrorResponse>,
    LoginFormData
  >({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};
