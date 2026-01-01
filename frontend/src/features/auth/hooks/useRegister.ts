import { useMutation } from "@tanstack/react-query";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  User,
} from "../api/auth.types";
import type { RegisterFormData } from "@/schemas/register.schema";
import { register } from "../api/auth.api";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<
    ApiSuccessResponse<{ user: User }>,
    AxiosError<ApiErrorResponse>,
    RegisterFormData
  >({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};
