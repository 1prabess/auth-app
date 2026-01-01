import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiErrorResponse } from "../api/auth.types";
import type { AxiosError } from "axios";
import { logout } from "../api/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError<ApiErrorResponse>>({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/login");
    },
    onError: (error) => {
      console.log(error.response?.data.message);
      toast.error("Logout failed");
    },
  });
};
